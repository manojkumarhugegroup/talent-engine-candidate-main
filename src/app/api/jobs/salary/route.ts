
import { candidateData } from "@/data/salay-data";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(candidateData), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}