import { db } from "@/config/db";
import { sessionsTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser();
        
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { notes, selectedDoctor } = await req.json();

        if (!notes) {
            return NextResponse.json({ error: "Notes are required" }, { status: 400 });
        }

        // Get user from database
        const dbUser = await db.select().from(usersTable)
            .where(eq(usersTable.email, user.primaryEmailAddress?.emailAddress!));

        if (dbUser.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Generate unique session ID
        const sessionId = uuidv4();

        // Create new session
        const result = await db.insert(sessionsTable).values({
            sessionId: sessionId,
            notes: notes,
            selectedDoctor: selectedDoctor || null,
            createdBy: dbUser[0].id,
            user: dbUser[0].id,
        }).returning();

        return NextResponse.json({ 
            success: true, 
            sessionId: sessionId,
            session: result[0] 
        });

    } catch (error) {
        console.error("Error creating session:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const user = await currentUser();
        
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const sessionId = searchParams.get('sessionId');

        if (sessionId) {
            // Get specific session
            const session = await db.select().from(sessionsTable)
                .where(eq(sessionsTable.sessionId, sessionId));
            
            if (session.length === 0) {
                return NextResponse.json({ error: "Session not found" }, { status: 404 });
            }

            return NextResponse.json(session[0]);
        } else {
            // Get all sessions for user
            const dbUser = await db.select().from(usersTable)
                .where(eq(usersTable.email, user.primaryEmailAddress?.emailAddress!));

            if (dbUser.length === 0) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            const sessions = await db.select().from(sessionsTable)
                .where(eq(sessionsTable.user, dbUser[0].id))
                .orderBy(sessionsTable.createdOn);

            return NextResponse.json(sessions);
        }

    } catch (error) {
        console.error("Error fetching sessions:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}