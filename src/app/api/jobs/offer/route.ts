
import { orderData } from "@/data/offerData";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(orderData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}