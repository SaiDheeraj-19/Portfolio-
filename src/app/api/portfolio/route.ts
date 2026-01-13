import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

// Local file path (fallback/seed)
const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

// Initialize Postgres Pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Required for Supabase/Neon
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

// Helper: Ensure table exists (Run once ideally, but safe to check)
async function ensureTable() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS portfolio (
                id INT PRIMARY KEY,
                data JSONB
            );
        `);
    } finally {
        client.release();
    }
}

export async function GET() {
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("Missing DATABASE_URL");
        }

        // Ensure table exists on first run (Lazy Init)
        await ensureTable();

        const client = await pool.connect();
        let result;
        try {
            result = await client.query('SELECT data FROM portfolio WHERE id = 1');
        } finally {
            client.release();
        }

        let data = result.rows[0]?.data;

        // If no data in DB (First run), seed it with local file data
        if (!data) {
            console.log("No data in DB, seeding from local file...");
            data = getLocalData();
            if (data) {
                const seedClient = await pool.connect();
                try {
                    await seedClient.query(
                        'INSERT INTO portfolio (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = $1',
                        [data]
                    );
                } finally {
                    seedClient.release();
                }
            }
        }

        return NextResponse.json(data || {});
    } catch (error) {
        console.error("Database Error:", error);
        // Fallback to local file if DB connection fails
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

        if (!process.env.DATABASE_URL) {
            throw new Error("Missing DATABASE_URL");
        }

        // Ensure table exists
        await ensureTable();

        // Save to Postgres (Upsert)
        const client = await pool.connect();
        try {
            await client.query(
                'INSERT INTO portfolio (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = $1',
                [data]
            );
        } finally {
            client.release();
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
