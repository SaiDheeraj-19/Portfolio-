import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileContents);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ message: "Error reading data" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { password, data } = body;

        if (password !== "Saidheeraj@website") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Write to local file
        const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

        return NextResponse.json({ message: "Data saved successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}
