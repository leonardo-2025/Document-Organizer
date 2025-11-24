import { NextResponse } from 'next/server';
import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import { join } from 'path';
import archiver from 'archiver';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
        return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    const workDir = join(process.cwd(), 'temp', sessionId);

    try {
        await stat(workDir);
    } catch (e) {
        return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    archive.directory(workDir, false);

    const stream = new ReadableStream({
        start(controller) {
            archive.on('data', (chunk) => controller.enqueue(chunk));
            archive.on('end', () => controller.close());
            archive.on('error', (err) => controller.error(err));
            archive.finalize();
        },
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'application/zip',
            'Content-Disposition': `attachment; filename="organized_files_${sessionId}.zip"`,
        },
    });
}
