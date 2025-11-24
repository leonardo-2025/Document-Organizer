import { NextResponse } from 'next/server';
import { rm } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';      // tells Next to use a serverless function
export const dynamic = 'force-dynamic'; // ensures the route runs at request time

export async function POST(request) {
    try {
        const { sessionId } = await request.json();

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        const workDir = join(process.cwd(), 'temp', sessionId);

        await rm(workDir, { recursive: true, force: true });

        return NextResponse.json({ message: "Cleanup successful" });

    } catch (error) {
        console.error("Cleanup error:", error);
        return NextResponse.json({ error: "Cleanup failed" }, { status: 500 });
    }
}
