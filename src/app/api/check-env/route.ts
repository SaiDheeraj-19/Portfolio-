import { NextResponse } from 'next/server';

export async function GET() {
    const secret = process.env.UPLOADTHING_SECRET;
    const appId = process.env.UPLOADTHING_APP_ID;

    return NextResponse.json({
        hasSecret: !!secret,
        secretLength: secret ? secret.length : 0,
        hasAppId: !!appId,
        appId: appId || "MISSING",
        nodeEnv: process.env.NODE_ENV,
        ver: "7.7.4-check",
        // Check if it starts correctly
        secretPrefix: secret ? secret.substring(0, 7) : "N/A"
    });
}
