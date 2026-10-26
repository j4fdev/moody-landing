import { NextRequest, NextResponse } from "next/server";
import { voteFeatureRemote } from "@/lib/landingClient";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const visitorId = req.cookies.get("moody_vid")?.value || "";
    const res = await voteFeatureRemote(id, visitorId);
    return NextResponse.json(res);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error procesando el voto";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
