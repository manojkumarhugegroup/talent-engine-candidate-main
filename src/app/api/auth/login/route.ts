// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { frappePost } from "@/lib/api";

interface LoginResponse {
  message: string;
  full_name: string;
  home_page: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { usr, pwd } = body;

    // Validate input
    if (!usr || !pwd) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const payload = { usr, pwd };

    // Make login request to Frappe
    const { data, headers, status } = await frappePost<LoginResponse>(
      "/api/method/login",
      payload
    );

    // Check if login was actually successful
    if (data.message === "Logged In") {
      const res = NextResponse.json(
        {
          success: true,
          message: "Login successful",
          user: {
            full_name: data.full_name,
            home_page: data.home_page,
            email: usr,
          },
        },
        { status: 200 }
      );

      if (headers) {
        // Prefer the structured getSetCookie API when available (returns array)
        const setCookieArr: string[] = [];

        // Fallback: single header string (older fetch impls)
        if (setCookieArr.length === 0) {
          const single = headers.get("set-cookie");
          if (single) {
            // split on comma only when it actually separates multiple cookies.
            // set-cookie headers shouldn't be comma-joined, but some runtimes do.
            setCookieArr.push(...single.split(/,(?=\s*[^=]+=)/));
          }
        }

        // Normalize/clean cookies before forwarding to the browser.
        // Remove Domain attribute so the cookie is set for this proxy's domain.
        // Adjust SameSite/Secure depending on environment.
        const isProd = process.env.NODE_ENV === "production";

        setCookieArr.forEach((raw) => {
          let cookie = raw.trim();

          // Remove Domain=... if present (so browser sets cookie for our domain)
          cookie = cookie.replace(/;\s*Domain=[^;]+/i, "");

          // Ensure Path is present
          if (!/;\s*Path=/i.test(cookie)) {
            cookie += "; Path=/";
          }

          // If SameSite isn't set, choose a reasonable default.
          if (!/;\s*SameSite=/i.test(cookie)) {
            if (isProd) cookie += "; SameSite=None; Secure";
            else cookie += "; SameSite=Lax"; // avoid Secure requirement in local dev
          }

          res.headers.append("Set-Cookie", cookie);
        });
      }

      return res;
    } else {
      return NextResponse.json(
        {
          success: false,
          error: data.message || "Invalid credentials",
        },
        { status: 401 }
      );
    }
  } catch (error: unknown) {
    let message = "Unknown error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json(
      { message: "Internal Server Error", error: message },
      { status: 500 }
    );
  }
}
