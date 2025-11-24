import { NextResponse } from 'next/server';
import { readdir, mkdir, rename, stat } from 'fs/promises';
import { join, extname } from 'path';

export async function POST(request) {
    try {
        const { sessionId, groupingOption, selectedExtensions } = await request.json();

        if (!sessionId) {
            return NextResponse.json({ error: "Session ID required" }, { status: 400 });
        }

        const workDir = join(process.cwd(), 'temp', sessionId);

        // Check if directory exists
        try {
            await stat(workDir);
        } catch (e) {
            return NextResponse.json({ error: "Session not found" }, { status: 404 });
        }

        const files = await readdir(workDir);

        for (const file of files) {
            const filePath = join(workDir, file);
            const fileStat = await stat(filePath);

            if (fileStat.isDirectory()) continue; // Skip directories

            const ext = extname(file).toLowerCase().replace('.', '');
            if (!ext) continue; // Skip files without extension

            let shouldGroup = false;

            if (groupingOption === 'all') {
                shouldGroup = true;
            } else if (groupingOption === 'specific') {
                shouldGroup = selectedExtensions.includes(ext);
            }

            if (shouldGroup) {
                const targetDir = join(workDir, ext);
                await mkdir(targetDir, { recursive: true });
                await rename(filePath, join(targetDir, file));
            }
        }

        return NextResponse.json({ message: "Processing complete" });

    } catch (error) {
        console.error("Processing error:", error);
        return NextResponse.json({ error: "Processing failed" }, { status: 500 });
    }
}
