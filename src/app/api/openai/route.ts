import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import * as dotenv from "dotenv";

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
  if (Array.isArray(content)) {
    return content.map((c: any) => c?.text?.value || "").join("");
  }
  
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { message, assistantId, chatId } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    let currentChatId = chatId;
    let isNewThread = false;

    if (!currentChatId) {
      currentChatId = await createThread();
      isNewThread = true;
    }

    const stream = openai.beta.threads.runs.stream(currentChatId, {
      assistant_id: assistantId,
      additional_messages: [{ role: "user", content: message }],
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          if (isNewThread) {
            const threadInfo = { threadId: currentChatId };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(threadInfo)}\n\n`));
          }

          for await (const event of stream) {
            console.log("Event data structure:", event.data);
            const messageContent = extractMessageContent(event);
            if (messageContent) {
              controller.enqueue(encoder.encode(messageContent));
            }
          }

          controller.close();
        } catch (err) {
          console.error("Error in stream:", err);
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
