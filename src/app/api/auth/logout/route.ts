// app/api/logout/route.ts
import { frappePost } from "@/lib/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Call Frappe's logout endpoint
    const { data, status } = await frappePost("/api/method/logout", {});

    // Prepare the response
    const response = NextResponse.json({
      message: "Logged out successfully",
      data,
    });

    // Clear both HTTP-only and normal cookies
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set("token", "", {
      httpOnly: false,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("❌ Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}
