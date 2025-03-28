import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import * as dotenv from "dotenv";
import fs from "node:fs/promises";
import path from "path";
import fsSync from "fs";
import { supabase } from "@/lib/supabase/client";

const tools: any = [
  {
    type: "function",
    function: {
      name: "render_graph",
      description: "Generates a graph based on the provided parameters. Use this to solve equation like x = 1 ",
      parameters: {
        type: "object",
        properties: {
          data: {
            type: "string",
            description: "The data used to generate the graph in CSV format (e.g., 'x,y\\n-10,-100\\n-8,-64\\n...'). Provide a lot of dots more then 40. If x = q it is line. Always provide correct ranges and, if possible, keep the graph in the range not less X = -3...3, Y = -3...3",
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
    "type": "function",
    "function": {
      "name": "render_shape",
      "description": "Generates a simple shape (circle, rectangle, polygon, etc.) based on provided parameters. This function should only be used when explicitly requested to render a shape. The function will directly return the shape in markdown format as an SVG wrapped in <p></p>. There is no need to return the shape again as a response after execution. The shape will automatically render upon the tool's execution. Therefore, the tool should only be executed when the shape needs to be displayed. Shapes will be rendered with fixed dimensions to ensure they are clearly visible on both mobile and desktop devices, regardless of the input points' size or aspect ratio.",
      "parameters": {
        "type": "object",
        "properties": {
          "shapeType": {
            "type": "string",
            "description": "Type of shape to render (e.g., 'circle', 'rectangle', 'polygon')."
          },
          "dimensions": {
            "type": "object",
            "description": "Fixed dimensions and properties of the shape. These dimensions ensure consistent rendering across different devices.",
            "properties": {
              "radius": {
                "type": "number",
                "description": "Radius of the circle (required for circles). If not specified, a default value ensuring visibility on mobile and desktop will be applied."
              },
              "width": {
                "type": "number",
                "description": "Width of the rectangle (required for rectangles). A default fixed width will be applied for consistency."
              },
              "height": {
                "type": "number",
                "description": "Height of the rectangle (required for rectangles). A default fixed height will be applied for consistency."
              }
            }
          },
          "points": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "x": {
                  "type": "number",
                  "description": "X-coordinate of the point."
                },
                "y": {
                  "type": "number",
                  "description": "Y-coordinate of the point."
                }
              },
              "required": ["x", "y"]
            },
            "description": "Array of points for polygons or other custom shapes. A minimum of 50 points is required for smoother rendering. The tool will not automatically scale the points. Generate the shape fits within the fixed dimensions for clear visibility on both mobile and desktop - use standard small size."
          },
          "color": {
            "type": "string",
            "description": "Color of the shape (e.g., 'red', '#ff0000')."
          }
        },
        "required": ["shapeType", "dimensions"]
      }
    }
  },
  { "type": "file_search" }

];

async function renderGraph(params: any, controller: any, encoder: any): Promise<string> {
  const graphHtml = `<div id="GraphId">${JSON.stringify(params)}</div>`;
  controller.enqueue(encoder.encode(`\n\n ${graphHtml} \n\n`));
  return `<div class="graph-container">Generated Graph with data: ${JSON.stringify(params)}</div>`;
}

async function renderShape(params: any, controller: any, encoder: any): Promise<string> {
  const { shapeType, dimensions, color, points, name } = params;

  let shapeHtml = "";
  const scaleFactor = 10; // Scaling factor for rendering

  switch (shapeType) {
    case "circle":
      if (dimensions?.radius) {
        const radius = dimensions.radius * scaleFactor;
        const numPoints = 100;
        const circlePoints = Array.from({ length: numPoints }, (_, i) => {
          const angle = (i / numPoints) * 2 * Math.PI;
          const x = radius + radius * Math.cos(angle);
          const y = radius + radius * Math.sin(angle);
          return `${x},${y}`;
        }).join(" ");

        shapeHtml = `<svg width="100%" height="100%" viewBox="0 0 ${radius * 2} ${radius * 2}" preserveAspectRatio="xMidYMid meet">
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
        shapeHtml = `<svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
            <rect width="${width}" height="${height}" fill="${color || 'black'}" />
          </svg>`;
      } else {
        shapeHtml = "Error: Missing width or height for rectangle.";
      }
      break;

    case "polygon":
      if (points && Array.isArray(points)) {
        const scaledPoints = points.map(({ x, y }) => ({
          x: x * scaleFactor,
          y: y * scaleFactor,
        }));

        const minX = Math.min(...scaledPoints.map((p) => p.x));
        const minY = Math.min(...scaledPoints.map((p) => p.y));
        const maxX = Math.max(...scaledPoints.map((p) => p.x));
        const maxY = Math.max(...scaledPoints.map((p) => p.y));

        const normalizedPoints = scaledPoints
          .map(({ x, y }) => `${x - minX},${y - minY}`)
          .join(" ");

        shapeHtml = `<svg width="100%" height="100%" viewBox="0 0 ${maxX - minX} ${maxY - minY}" preserveAspectRatio="xMidYMid meet">
            <polygon points="${normalizedPoints}" fill="${color || 'green'}" />
          </svg>`;
      } else {
        shapeHtml = "Error: Missing points for polygon.";
      }
      break;

    default:
      shapeHtml = "Error: Unsupported shape type.";
  }

  controller.enqueue(encoder.encode(`<p className="bolt"> Generated ${shapeType}: \n\n <p className="shape-container">\n\n ${shapeHtml} \n\n </p> \n\n </p>`));
  return "";
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
    const additionalPrompt = "" as string;
    // const additionalPrompt = formData.get("additionalPrompt") as string;

    const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    let openAiFileIds: string[] = []; // Array to hold OpenAI file IDs

    for (const uploadedFile of uploadedFiles) {

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
      { role: "user", content: `${message}` }
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

    // async function getAllVectorStoreIds(): Promise<string[]> {
    //   const vectorStores = await openai.beta.vectorStores.list();
    //   console.log("vector stores found", vectorStores);

    //   return vectorStores.data.map((vs: { id: any; }) => vs.id);
    // }

    // const vectorStoreMap: Record<string, string> = {
    //   "asst_wQYJcKbahjyXKsqfEBj09lXz": "vs_W3WYfN3aSaosEBpkbMf2yk6t", // Business Studies
    //   "asst_DQhvAipfIA6bPsXFi8Az1sYw": "vs_37ssYcJuMUHoZsMKRCRzC7j0", // Espen Teacher Maths 
    //   "asst_lgVcOWp45uuUf2BtodHO7gKS": "vs_ENtFMjPHa0PLUtN2SJ2JrTNX", // Maths Literacy
    //   "asst_vaBKqqnSfyus1suFdb8BGqvK": "vs_MX5w91YMFpqJjWkVbbhfVGTg", // English
    //   "asst_GqA9eIAqD6X4OEYfZRyNx6y0": "vs_yAhxo3ebp10fMKvIGJNzU22f", // Physical Sciences
    //   "asst_QwfjmzMvjalp9v5x6y1SAd68": "vs_OTSyuB9kwQpQCorFpQ5HTlP1", // Economics Tutor
    //   "asst_tmcVNihaQQXIJsgBBsmStbVh": "vs_67b72532c52c81918cc2b57aeadfbe89", // Life Sciences (No match in vector stores)
    //   "asst_8ccbmmtDJWTZ7ABAdUSzbax8": "vs_67b73ef6bc7881919ab82f3b98c92bfc", // Computer Applications Technology (No match)
    //   "asst_ub7PKtIFXKBAPOlqqcFoYy7B": "vs_67b74044b6b4819195dbcede53ae7312", // Information Technology / Natural Science (No match)
    //   "asst_P5dJ8UFGPSa9A2BtYgDr84FD": "vs_W3WYfN3aSaosEBpkbMf2yk6t", // Business Studies (Teacher Assistants)
    //   "asst_xYdJNkDJQoKTS6S5sNAnhGY6": "vs_67b87fad16e481918c4db0089b935d5f", // Kenya Income tax 
    //   "asst_7pMzMLlE5LixiysB2hFXJWKH": "vs_67b72656d1348191b23568eeff972c88", // Geography 
    //   "asst_PZLeW6lOto3Aq1Dbm4MId5Ji": "vs_67b728ed741481918058550d0e2694c0", // Physical Sciences  
    //   "asst_GNr95kfHSeLTztEukBB1v3We": "vs_37ssYcJuMUHoZsMKRCRzC7j0", // Mathematics Literacy new
    //   "asst_quosLWwOUiWyRxoUF3sn9RBE": "vs_37ssYcJuMUHoZsMKRCRzC7j0", // Mathematics new
    //   "asst_mdg1VEgSqxVOKlHk6JlRXzTN": "vs_yAhxo3ebp10fMKvIGJNzU22f", // Physical Sciences 
    //   "asst_wu5H6HvbW3o0qLw443ojVx6V": "vs_ENtFMjPHa0PLUtN2SJ2JrTNX", // Mathematics Literacy old
    //   "asst_tuNCDC6ugI9hi1d2Bd7vllvH": "vs_vnbDfE1SOPGRtKaHd23baOrj", // Discovery Agent. 
    //   "asst_stEGiVDTlMIeDM7XGiezPI28": "vs_OTSyuB9kwQpQCorFpQ5HTlP1", // Economics Tutor
    //   "asst_8A4XomYXUr72FiCpGFpeka9w": "vs_V1eoQfy9239a6iy2Qa4aoGtc", // CFP Assistant 
    //   "asst_F0t5kwftVyUBthhNWnrkGFZL": "vs_1brM1INAoNazPKp5BEj226T0", // Kenyan Product Recomendations 
    // };

    // function getVectorStoreId(assistantId: string): string[] {
    //   return [vectorStoreMap[assistantId]];
    // }


    // const vectorStoreIds = await getAllVectorStoreIds();

    // if (!getVectorStoreId(assistantId)?.[0]) {
    //   console.log("No vector stores found!", getVectorStoreId(assistantId)?.[0]);
    // } else {
    //   console.log("Vector stores found!", getVectorStoreId(assistantId)?.[0]);
    //   const updateResponse = await openai.beta.assistants.update(assistantId, (getVectorStoreId(assistantId)?.length ? {
    //     tool_resources: { file_search: { vector_store_ids: getVectorStoreId(assistantId) } },
    //     // instructions: "Please search for answers in the vector store first before responding.",
    //     tools: [{ type: "file_search" }]
    //   } : {

    //   }));
    //   console.log("Updated assistant:", updateResponse);
    //   await new Promise(resolve => setTimeout(resolve, 2000)); // Ensure update is applied

    // }

    // const vectorStoreFiles = await openai.beta.vectorStores.files.list('vs_37ssYcJuMUHoZsMKRCRzC7j0');

    // vectorStoreFiles.data.forEach(file => {
    //   console.log(`File ID: ${file.id}, Status: ${file.status}`);
    // });


    const stream = openai.beta.threads.runs.stream(currentChatId, {
      assistant_id: assistantId,
      additional_messages: additionalMessages as any,
      tools: [{ type: "file_search" }, ...tools],
      // instructions: "Ensure consistent formatting: structured, clear, uniform style. Use render_graph if you need to render or generate graph " + JSON.stringify(additionalPrompt)
    });

    const encoder = new TextEncoder();

    async function waitForRunCompletion(openai: any, runId: string) {
      let status = "in_progress";

      while (status === "in_progress") {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const run = await openai.beta.threads.runs.retrieve(runId, {
          include: ["step_details.tool_calls[*].file_search.results[*].content"]
        });

        status = run.status;
        console.log("Run Status:", status);

        // Check if file_search tool calls exist
        if (run?.step_details?.tool_calls) {
          run.step_details.tool_calls.forEach((toolCall: any) => {
            if (toolCall.type === "file_search") {
              console.log("File Search Results:", JSON.stringify(toolCall.file_search.results, null, 2));
            }
          });
        }
      }

      if (status !== "completed") {
        throw new Error(`Run ${runId} did not complete successfully. Status: ${status}`);
      }
    }



    let isProcessingTool = false;

    async function processStream(
      stream: any,
      controller: any,
      encoder: TextEncoder,
      availableFunctions: any,
      openai: any,
      currentChatId: string
    ) {
      isProcessingTool = false;

      try {
        for await (const event of stream) {
          if (controller.desiredSize === null) {
            console.error("Stream controller closed; stopping processing.");
            return;
          }


          const messageContent = extractMessageContent(event);
          if (messageContent && !isProcessingTool) {
            console.log("Enqueuing message content:", messageContent);
            controller.enqueue(encoder.encode(messageContent));
          }

          const currentRun = stream.currentRun();
          if (!currentRun) {
            console.warn("No current run found.");
            continue;
          }


          if (currentRun.status === "requires_action") {
            isProcessingTool = true;

            const functions =
              currentRun?.required_action?.submit_tool_outputs?.tool_calls || [];

            if (!functions.length) {
              console.warn("No tool calls found in current run.");
              isProcessingTool = false;
              continue;
            }

            console.log(
              "Functions to call:",
              functions.map((f: { function: { name: string } }) => f.function.name)
            );

            const toolOutputs: any[] = [];

            for (const func of functions) {
              let result;

              try {

                result = await availableFunctions[func.function.name](
                  func.function.arguments ? JSON.parse(func.function.arguments) : "",
                  controller,
                  encoder
                );

                if (!result) {
                  console.warn(
                    `Function ${func.function.name} returned no output. Using placeholder.`
                  );
                  result = {
                    message: "No data returned from the tool. Placeholder data used.",
                  };
                }

                toolOutputs.push({
                  tool_call_id: func.id,
                  output: JSON.stringify(result),
                });
              } catch (error) {
                console.error(`Error in function ${func.function.name}:`, error);
                toolOutputs.push({
                  tool_call_id: func.id,
                  output: JSON.stringify({
                    error: `Error processing ${func.function.name}`,
                    details: error,
                  }),
                });
              }
            }

            try {
              const newStream = openai.beta.threads.runs.submitToolOutputsStream(
                currentChatId,
                currentRun.id,
                {
                  tool_outputs: toolOutputs,
                }
              );


              await processStream(
                newStream,
                controller,
                encoder,
                availableFunctions,
                openai,
                currentChatId
              );
            } catch (error: any) {
              if (
                error?.message.includes("already has an active run") ||
                error.includes("already has an active run")
              ) {
                console.warn("Active run detected. Waiting for completion...");
                await waitForRunCompletion(openai, currentRun.id);
              } else {
                throw error;
              }
            } finally {
              isProcessingTool = false;
            }
          }
        }
      } catch (error) {
        console.error("Error processing stream:", error);
      } finally {
        console.log("Stream processing completed.");
      }
    }

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          if (isNewThread) {
            const threadInfo = { threadId: currentChatId };
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(threadInfo)}\n\n`));
          }

          // const pingInterval = setInterval(() => {
          //   controller.enqueue(encoder.encode(""));
          // }, 1000);

          await processStream(
            stream,
            controller,
            encoder,
            availableFunctions,
            openai,
            currentChatId
          );

          // clearInterval(pingInterval);
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

