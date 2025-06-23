import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  try {
    const response = await axios.post(
      "https://api.together.xyz/v1/chat/completions",
      {
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer tgp_v1_u3snPEd8bCCG1ySobiynHYL17R8oMlxTMAEFkVcEB1Q`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("TogetherAI Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "TogetherAI API failed" },
      { status: 500 }
    );
  }
}
