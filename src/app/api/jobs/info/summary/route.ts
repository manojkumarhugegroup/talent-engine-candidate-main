import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get("jobId");
        const access_token = searchParams.get("access_token");

        if (!jobId) {
            return NextResponse.json(
                { message: "Missing jobId" },
                { status: 400 }
            );
        }

        // if (!access_token) {
        //     return NextResponse.json(
        //         { message: "Missing access token" },
        //         { status: 400 }
        //     );
        // }

        const cloudApiUrl = `https://mock.apidog.com/m1/1041944-0-default/api/job/${jobId}/candidates/count?access_token=${access_token}`;

        const response = await fetch(cloudApiUrl, {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { message: "Error from cloud API", error: errorText },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching cloud API:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error.message },
            { status: 500 }
        );
    }
}
