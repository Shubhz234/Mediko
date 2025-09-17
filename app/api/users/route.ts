import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    try {
        const users = await db.select().from(usersTable)
            .where(eq(usersTable.email, user.primaryEmailAddress.emailAddress));

        if (users?.length === 0) {
            const result = await db.insert(usersTable).values({
                name: user.fullName || "Anonymous",
                email: user.primaryEmailAddress.emailAddress,
                credits: 10
            }).returning();

            return NextResponse.json(result[0]);
        }

        return NextResponse.json(users[0]);
    } catch (e) {
        console.error("Error in users API:", e);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}