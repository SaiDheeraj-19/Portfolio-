import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

// Initialize Redis with fallback for different env var names
const redis = new Redis({
    url: process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "",
    token: process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "",
});

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
        // Try to get data from Redis
        // Check if we have credentials
        if (!redis.url || !redis.token) {
            throw new Error("Missing Redis Env Vars");
        }

        let data = await redis.get('portfolio_data');

        // If no data in DB (First run), seed it with local file data
        if (!data) {
            console.log("No data in Redis, seeding from local file...");
            data = getLocalData();
            if (data) {
                await redis.set('portfolio_data', data);
            }
        }

        return NextResponse.json(data || {});
    } catch (error) {
        console.error("Database Error:", error);
        // Fallback to local file if DB connection missing
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

        // Save to Redis
        if (redis.url && redis.token) {
            await redis.set('portfolio_data', data);
        } else {
            throw new Error("Missing Redis Credentials");
        }

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
