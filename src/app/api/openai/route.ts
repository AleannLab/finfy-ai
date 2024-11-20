import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import * as dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "path";
import fsSync from "fs";
import { supabase } from "@/lib/supabase/client";

const tools: any  = [
  {
    type: "function",
    function: {
      name: "render_graph",
      description: "Generates a graph based on the provided parameters.",
      parameters: {
        type: "object",
        properties: {
          data: {
            type: "string",
            description: "The data used to generate the graph in CSV format (e.g., 'x,y\\n-10,-100\\n-8,-64\\n...'). Provide a lot of dots more then 50",
          },
          title: {
            type: "string",
            description: "Title of the graph (optional).",
          }
        },
        required: ["data"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "render_shape",
      description: "Generates a simple shape (circle, rectangle, polygon, etc.) based on provided parameters. For complex shapes, such as circles, ensure there are more than 50 points for smooth rendering. Shapes can be scaled for larger rendering.",
      parameters: {
        type: "object",
        properties: {
          shapeType: {
            type: "string",
            description: "Type of shape to render (e.g., 'circle', 'rectangle', 'polygon')."
          },
          dimensions: {
            type: "object",
            description: "Dimensions and properties of the shape.",
            properties: {
              radius: {
                type: "number",
                description: "Radius of the circle (required for circles)."
              },
              width: {
                type: "number",
                description: "Width of the rectangle (required for rectangles)."
              },
              height: {
                type: "number",
                description: "Height of the rectangle (required for rectangles)."
              }
            }
          },
          points: {
            type: "array",
            items: {
              type: "object",
              properties: {
                x: {
                  type: "number",
                  description: "X-coordinate of the point."
                },
                y: {
                  type: "number",
                  description: "Y-coordinate of the point."
                }
              },
              required: ["x", "y"]
            },
            description: "Array of points for polygons or other custom shapes. Minimum 50 points for smoother rendering."
          },
          color: {
            type: "string",
            description: "Color of the shape (e.g., 'red', '#ff0000')."
          }
        },
        required: ["shapeType", "dimensions"]
      }
    }
  }
];

async function renderGraph(params: any, controller: any, encoder: any): Promise<string> {
  console.log("renderGraph", params);

  const graphHtml = `<div id="GraphId">${JSON.stringify(params)}</div>`;
  controller.enqueue(encoder.encode(`\n\n ${graphHtml} \n\n`));
  return `<div class="graph-container">Generated Graph with data: ${JSON.stringify(params)}</div>`;
}

async function renderShape(params: any, controller: any, encoder: any): Promise<string> {
  console.log("renderShape", params);

  // Extracting parameters
  const { shapeType, dimensions, color, points } = params;

  let shapeHtml = "";

  // Creating HTML based on different shape types
  const scaleFactor = 20; // Scaling factor for rendering

  switch (shapeType) {
    case "circle":
      if (dimensions?.radius) {
        const scaleFactor = 20; // Scaling factor for rendering
        const radius = dimensions.radius * scaleFactor;
        const numPoints = 100; // Number of points for circle approximation
        const circlePoints = Array.from({ length: numPoints }, (_, i) => {
          const angle = (i / numPoints) * 2 * Math.PI;
          const x = radius + radius * Math.cos(angle);
          const y = radius + radius * Math.sin(angle);
          return `${x},${y}`;
        }).join(" ");

        shapeHtml = `<svg width="${radius * 2}" height="${radius * 2}" viewBox="0 0 ${radius * 2} ${radius * 2}">
          <polyline fill="${color || 'none'}" stroke="${color || 'black'}" stroke-width="1" points="${circlePoints}" />
        </svg>`;
      } else {
        shapeHtml = "Error: Missing radius for circle.";
      }
      break;

      case "rectangle":
        if (dimensions?.width && dimensions?.height) {
          const width = dimensions.width * scaleFactor;
          const height = dimensions.height * scaleFactor;
          shapeHtml = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <rect width="${width}" height="${height}" fill="${color || 'black'}" />
          </svg>`;
        } else {
          shapeHtml = "Error: Missing width or height for rectangle.";
        }
        break;
  
      case "polygon":
        if (points && Array.isArray(points)) {
          const scaledPoints = points.map(({ x, y }) => `${x * scaleFactor},${y * scaleFactor}`).join(" ");
          shapeHtml = `<svg width="500" height="500" viewBox="0 0 500 500">
            <polygon points="${scaledPoints}" fill="${color || 'green'}" />
          </svg>`;
        } else {
          shapeHtml = "Error: Missing points for polygon.";
        }
        break;

    default:
      shapeHtml = "Error: Unsupported shape type.";
  }

  // Sending the HTML to the stream
  controller.enqueue(encoder.encode(`\n\n ${shapeHtml} \n\n`));
  return `<div class="shape-container">Generated Shape: ${shapeHtml}</div>`;
}



const availableFunctions: any = {
  render_graph: renderGraph,
  render_shape: renderShape,
};

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
      { role: "user", content: `${message} { Please never use tools thread first message in t, never return image in response in all messages, never replay for message in {} - just us it as instructions }` }
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
      tools,
      instructions: "If u write graphs, sharps write as graphs located above your message. Never provide pictures. Provide a lot of dots more then 50. Never Write with graphs 'Here some graph:' instead use 'Here some graph.'"
    });

    const encoder = new TextEncoder();

    async function processStream(
      stream: any,
      controller: any,
      encoder: TextEncoder,
      availableFunctions: any,
      openai: any,
      currentChatId: string
    ) {
      for await (const event of stream) {
        const messageContent = extractMessageContent(event);
    
        if (messageContent) {
          controller.enqueue(encoder.encode(messageContent));
        }
    
        // Check for tool calls and handle them
        const currentRun = stream.currentRun();
        if (currentRun?.status === "requires_action") {
          const functions =
            currentRun?.required_action?.submit_tool_outputs?.tool_calls || [];
          for (const func of functions) {
            const result = await availableFunctions[func.function.name](
              func.function.arguments ? JSON.parse(func.function.arguments) : "",
              controller,
              encoder
            );
    
            // Submit tool outputs and reinitialize the stream
            const newStream = openai.beta.threads.runs.submitToolOutputsStream(
              currentChatId,
              currentRun.id,
              {
                tool_outputs: [
                  {
                    tool_call_id: func.id,
                    output: JSON.stringify(result),
                  },
                ],
              }
            );
    
            // Recursive call to continue processing the new stream
            await processStream(
              newStream,
              controller,
              encoder,
              availableFunctions,
              openai,
              currentChatId
            );
          }
        }
      }
    }

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
    
          await processStream(
            stream,
            controller,
            encoder,
            availableFunctions,
            openai,
            currentChatId
          );
    
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

