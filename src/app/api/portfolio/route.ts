import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

// Helper to get initial data from file
function getLocalData() {
    try {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error("Error reading local data:", error);
        return null;
    }
}

export async function GET() {
    try {
        // Try to get data from KV (Database)
        let data = await kv.get('portfolio_data');

        // If no data in DB (First run), seed it with local file data
        if (!data) {
            console.log("No data in KV, seeding from local file...");
            data = getLocalData();
            if (data) {
                await kv.set('portfolio_data', data);
            }
        }

        return NextResponse.json(data || {});
    } catch (error) {
        console.error("Database Error:", error);
        // Fallback to local file if DB connection missing (e.g. local dev without env vars)
        return NextResponse.json(getLocalData() || {});
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { password, data } = body;

        // Verify Password
        if (password !== "Saidheeraj@website") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Save to KV (Database)
        await kv.set('portfolio_data', data);

        // Also try to write file locally for backup if running in dev mode
        try {
            if (process.env.NODE_ENV === 'development') {
                fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
            }
        } catch (e) { console.error("Could not write local backup", e); }

        return NextResponse.json({ message: "Data saved successfully" });
    } catch (error) {
        console.error("Error saving data:", error);
        return NextResponse.json({ message: "Error saving data" }, { status: 500 });
    }
}
