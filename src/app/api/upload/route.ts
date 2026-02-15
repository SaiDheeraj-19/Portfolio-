import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Create a unique filename to avoid collisions
        const filename = Date.now() + "_" + file.name.replace(/\s/g, '_');
        const uploadDir = path.join(process.cwd(), "public/uploads");

        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);

        await fs.writeFile(filePath, buffer);

        return NextResponse.json({ url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Error uploading file:", error);
        return NextResponse.json({ error: "Failed to upload file." }, { status: 500 });
    }
}
