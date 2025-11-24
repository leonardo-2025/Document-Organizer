import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const runtime = 'nodejs';      // tells Next to use a serverless function
export const dynamic = 'force-dynamic'; // ensures the route runs at request time


// Disable default body parser to handle large files
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll('files');

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        // Create a unique session ID for this batch
        const sessionId = uuidv4();
        const uploadDir = join(process.cwd(), 'temp', sessionId);

        await mkdir(uploadDir, { recursive: true });

        const savedFiles = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const filePath = join(uploadDir, file.name);

            await writeFile(filePath, buffer);
            savedFiles.push(file.name);
        }

        return NextResponse.json({
            message: "Upload successful",
            sessionId: sessionId,
            files: savedFiles
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed." }, { status: 500 });
    }
}
