import { openai } from "@/config/OpenAiModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const completion = await openai.chat.completions.create({
            model: "${Model.GPT_4_Omni}",
            messages: [
                { role: "user", content: "Say this is a test" }
            ],
        })
    } catch (e) {

    }
}