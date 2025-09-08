import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { REPORT_GEN_PROMPT } from "@/shared/list";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { sessionId, sessionDetails, messages } = await req.json();

    try {
        const UserInput = 'AI Doctor Agent Info:' + JSON.stringify(sessionDetails) + ', Conversation:' + JSON.stringify(messages)
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-exp:free",
            messages: [
                { role: "system", content: REPORT_GEN_PROMPT },
                { role: "user", content: UserInput }
            ],
        });

        const rawResp = completion.choices[0].message;

        //@ts-ignore
        const Resp = rawResp.content.trim().replace('```json', '').replace('```', '')
        const JSONResp = JSON.parse(Resp);

        // Save to dataBase
        const result = await db.update(SessionChatTable).set({
            report: JSONResp,
            conversation: messages
        }).where(eq(SessionChatTable.sessionId, sessionId))

        return NextResponse.json(JSONResp)
    } catch (e) {
        return NextResponse.json(e)
    }
}