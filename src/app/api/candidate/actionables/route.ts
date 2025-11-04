
import {  mockGet } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search");
        const access_token = searchParams.get("access_token");

        // if (!access_token) {
        //     return NextResponse.json(
        //         { message: "Missing access token" },
        //         { status: 400 }
        //     );
        // }

        const data = await mockGet(`/api/candidate/actionables`);

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching job info:", error);

        // Distinguish between different types of errors
        if (error.message.includes('Mock API request failed')) {
            return NextResponse.json(
                { message: "External API unavailable", error: error.message },
                { status: 502 }
            );
        }

        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}