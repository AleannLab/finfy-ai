import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import * as dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "path";
import fsSync from "fs";
import { supabase } from "@/lib/supabase/client";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function createThread(): Promise<string> {
  const thread = await openai.beta.threads.create();
  return thread.id;
}

function extractMessageContent(event: any): string | null {
  const content = event.data?.delta?.content;
  if (content) {
    return content.map((c: any) => c?.text?.value).join("");
  }
  return "";
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const uploadedFiles = formData.getAll("file") as File[]; // Handling array of files
    const message = formData.get("message") as string;
    const assistantId = formData.get("assistantId") as string;
    const chatId = formData.get("chatId") as string;

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    let openAiFileIds: string[] = []; // Array to hold OpenAI file IDs

    for (const uploadedFile of uploadedFiles) {
      console.log("Processing file:", uploadedFile?.name);

      // Check if the file is an image
      if (!allowedImageTypes.includes(uploadedFile.type)) {
        console.warn(`Unsupported file type: ${uploadedFile.name}, Type: ${uploadedFile.type}`);
        continue; // Skip unsupported files
      }

      // Convert uploaded file to a buffer
      const arrayBuffer = await uploadedFile.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);

      // Upload buffer to OpenAI
      const openaiFile = await openai.files.create({
        file: uploadedFile, // Directly use the buffer here
        purpose: "assistants",
      });

      console.log("Uploaded file to OpenAI:", openaiFile);
      if (openaiFile?.id) {
        openAiFileIds.push(openaiFile.id); // Save the file ID for further use
        // Upload file to Supabase storage
        const { data, error } = await supabase.storage.from('avatars').upload(`uploads/${uploadedFile.name}`, buffer, {
          contentType: uploadedFile.type,
        });

        if (error) {
          console.error("Error uploading file to Supabase:", error);
          continue; // Handle error (e.g., skip this file)
        }

        console.log("Uploaded file to Supabase:", data);
      }
    }

    // Ensure message is provided
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    // Handle chat ID and new thread creation
    let currentChatId = chatId;
    let isNewThread = false;

    if (!currentChatId) {
      currentChatId = await createThread();
      isNewThread = true;
    }

    // Construct additional messages with file_ids if available
    interface ImageFileContentBlock {
      image_file: {
        file_id: string;
        detail: string;
      };
      type: 'image_file';
    }

    interface AdditionalMessage {
      role: "user" | "assistant";
      content: string | ImageFileContentBlock[];
    }

    const additionalMessages: AdditionalMessage[] = [
      { role: "user", content: message }
    ];

    if (openAiFileIds.length > 0) {
      const imageBlocks: ImageFileContentBlock[] = openAiFileIds.map(fileId => ({
        image_file: { file_id: `${fileId}`, detail: 'low' },
        type: 'image_file'
      }));

      additionalMessages.push({
        role: "user",
        content: imageBlocks
      });
    }

    const stream = openai.beta.threads.runs.stream(currentChatId, {
      assistant_id: assistantId,
      additional_messages: additionalMessages as any,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          if (isNewThread) {
            const threadInfo = { threadId: currentChatId };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(threadInfo)}\n\n`));
          }

          const pingInterval = setInterval(() => {
            controller.enqueue(encoder.encode(""));
          }, 10);

          for await (const event of stream) {
            const messageContent = extractMessageContent(event);
            if (messageContent) {
              controller.enqueue(encoder.encode(messageContent));
            }
          }

          clearInterval(pingInterval);
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error streaming response:", error);
    return NextResponse.json({ error: "Internal Server Error." }, { status: 500 });
  }
}

