import { NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest) {
  try {
    const { message, assistantId } = await req.json();

    if (!message || !assistantId) {
      return NextResponse.json(
        { error: "Missing required fields: user_query or assistantId." },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    });

    const aiResponse = response.choices[0]?.message?.content || "No response from AI.";

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

