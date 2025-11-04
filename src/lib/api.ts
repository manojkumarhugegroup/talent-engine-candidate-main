// lib/cloudApi.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export const MOCK_API_BASE_URL = process.env.NEXT_PUBLIC_MOCK_API_BASE_URL!;
export const CLOUD_API_BASE_URL = process.env.NEXT_PUBLIC_API_CLOUD_URL!;
export const FRAPPE_API_BASE_URL = process.env.NEXT_PUBLIC_API_FRAPPE_URL!;

function buildUrl(baseUrl: string | undefined, endpoint: string): string {
  if (!baseUrl) {
    console.log("base url", baseUrl);
    throw new Error("❌ Base URL is not defined. Check environment variables.");
  }
  return `${baseUrl.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
}

async function request<T>(
  baseUrl: string | undefined,
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown,
  options?: RequestInit
): Promise<{
  data: T;
  headers: Headers;
  status: number;
  cookieHeader?: string;
}> {
  const url = buildUrl(baseUrl, endpoint);

  const headers = new Headers(options?.headers || {});

  let fetchBody: BodyInit | undefined;
  if (body instanceof FormData) {
    fetchBody = body;
  } else if (body instanceof URLSearchParams) {
    fetchBody = body.toString();
    headers.set("Content-Type", "application/x-www-form-urlencoded");
  } else if (body) {
    fetchBody = JSON.stringify(body);
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    method,
    headers,
    ...(fetchBody ? { body: fetchBody } : {}),
    credentials: "include",
    ...options,
  });

  const text = await response.text();
  let data: T;
  try {
    data = JSON.parse(text);
  } catch {
    data = text as unknown as T;
  }

  // Extract the `Set-Cookie` header for login responses
  const cookieHeader = response.headers.get("set-cookie") || undefined;

  return {
    data,
    headers: response.headers,
    status: response.status,
    cookieHeader,
  };
}

// -------- API Helpers --------
export const apiGet = <T>(endpoint: string, options?: RequestInit) =>
  request<T>(API_BASE_URL, endpoint, "GET", undefined, options);

export const apiPost = <T>(
  endpoint: string,
  body: unknown,
  options?: RequestInit
) => request<T>(API_BASE_URL, endpoint, "POST", body, options);

// -------- Mock API Helpers --------
export const mockGet = <T>(endpoint: string, options?: RequestInit) =>
  request<T>(MOCK_API_BASE_URL, endpoint, "GET", undefined, options);

export const mockPost = <T>(
  endpoint: string,
  body: unknown,
  options?: RequestInit
) => request<T>(MOCK_API_BASE_URL, endpoint, "POST", body, options);

// -------- Cloud API Helpers --------
export const cloudGet = <T>(endpoint: string, options?: RequestInit) =>
  request<T>(CLOUD_API_BASE_URL, endpoint, "GET", undefined, options);

export const cloudPost = <T>(
  endpoint: string,
  body: unknown,
  options?: RequestInit
) => request<T>(CLOUD_API_BASE_URL, endpoint, "POST", body, options);
// -------- Cloud API Helpers --------
export const frappeGet = <T>(endpoint: string, options?: RequestInit) =>
  request<T>(FRAPPE_API_BASE_URL, endpoint, "GET", undefined, options);

export const frappePost = <T>(
  endpoint: string,
  body: unknown,
  options?: RequestInit
) => request<T>(FRAPPE_API_BASE_URL, endpoint, "POST", body, options);
