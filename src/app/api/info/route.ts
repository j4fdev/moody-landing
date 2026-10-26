import { NextResponse } from "next/server";
import { fetchProjectInfo } from "@/lib/landingClient";

export async function GET() {
  const info = await fetchProjectInfo();
  return NextResponse.json(info);
}
