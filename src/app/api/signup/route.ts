import { SignupRequest } from "@/types/auth/login";
import { NextResponse } from "next/server"

// Mock DB
let users: { fullName: string; email: string; password: string;confirmPassword:string }[] = []

export async function POST(req: Request) {
  try {
    const body: SignupRequest = await req.json()
    const { fullName, email, password ,confirmPassword} = body

    // check if email exists
    const existing = users.find((u) => u.email === email)
    if (existing) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      )
    }

    // save user (mock)
    users.push({ fullName, email, password,confirmPassword })

    return NextResponse.json(
      {
        success: true,
        message: "Signup successful! Please login.",
        user: { fullName, email },
      },
      { status: 201 }
    )
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    )
  }
}
