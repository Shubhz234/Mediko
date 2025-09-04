import { openai } from "@/config/OpenAiModel";
import { NextRequest, NextResponse } from "next/server";
import { AIDoctor } from "@/shared/list";

export async function POST(req: NextRequest) {
    const { notes } = await req.json();

    try {
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash",
            messages: [
                { role: "system", content:JSON.stringify(AIDoctor) },
                { role: "user", content: "User Notes/Symptoms:" + notes + ", Depends on user notes and symptoms, Please suggest list of doctors, Return object in JSON on it" }
            ],
        });

        const rawResp = completion.choices[0].message;
        return NextResponse.json(rawResp);
    } catch (e) {
        return NextResponse.json(e);
    }
}