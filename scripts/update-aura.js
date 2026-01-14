const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
    console.error("Error: DATABASE_URL is missing in .env.local");
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const jsonPath = path.join(process.cwd(), 'src/data/portfolio.json');

async function updateProject() {
    try {
        // 1. Read Local JSON
        console.log("📂 Reading local data...");
        let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

        // 2. Find and Update Project
        const targetTitle = "AI-Powered Multilingual Speech Translation Platform";
        let found = false;

        data.projects = data.projects.map(p => {
            if (p.title === targetTitle) {
                console.log(`✅ Found project: "${p.title}"`);
                p.gallery = [
                    '/projects/aura/aura-preview-1.png',
                    '/projects/aura/aura-preview-2.png',
                    '/projects/aura/aura-preview-3.png'
                ];
                found = true;
            }
            return p;
        });

        if (!found) {
            console.error("❌ Project not found!");
            process.exit(1);
        }

        // 3. Save back to Local JSON
        fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
        console.log("💾 Updated local portfolio.json");

        // 4. Update Supabase
        console.log("🔌 Connecting to Supabase...");
        const client = await pool.connect();
        try {
            console.log("🚀 Uploading updated data to DB...");
            // Update the row with ID 1
            await client.query(
                'INSERT INTO portfolio (id, data) VALUES (1, $1) ON CONFLICT (id) DO UPDATE SET data = $1',
                [data]
            );
            console.log("✅ Database successfully updated!");

        } finally {
            client.release();
        }

    } catch (e) {
        console.error("❌ Update Failed:", e);
    } finally {
        pool.end();
    }
}

updateProject();
