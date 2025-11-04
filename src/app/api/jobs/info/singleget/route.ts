import { mockGet } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get("jobId");

    if (!jobId) {
      return NextResponse.json(
        { message: "Missing required parameter: jobId" },
        { status: 400 }
      );
    }

    // Validate jobId format if needed
    if (!/^\d+$/.test(jobId)) {
      return NextResponse.json(
        { message: "Invalid jobId format" },
        { status: 400 }
      );
    }

    const data = await mockGet(`api/rr/${jobId}`);

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
