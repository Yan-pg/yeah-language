import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { unit } = await req.json();

  const prompt = `
    Generate 5 sentences in English on the subject below and return only json array of sentences: 
      ${unit}

      A example: 
      [
        {
          english: 'sentence in english',
          portuguese: 'sentence in por'
        }
      ]
  `.trim();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: false,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  console.log("yan", response);

  return NextResponse.json({
    response: JSON.parse(response.choices[0].message.content || ""),
  });
}
