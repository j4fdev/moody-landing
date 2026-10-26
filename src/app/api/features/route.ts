import { NextRequest, NextResponse } from "next/server";
import { fetchFeaturesRemote, createFeatureRemote } from "@/lib/landingClient";

export async function GET(req: NextRequest) {
  const visitorId = req.nextUrl.searchParams.get("visitor_id") || req.cookies.get("moody_vid")?.value || "";
  const features = await fetchFeaturesRemote(visitorId);
  return NextResponse.json(features);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, details } = body;

    if (!title || typeof title !== "string" || title.trim().length < 3) {
      return NextResponse.json(
        { error: "El título de la propuesta debe tener al menos 3 caracteres" },
        { status: 400 }
      );
    }

    const visitorId = req.cookies.get("moody_vid")?.value || "";
    const created = await createFeatureRemote(title.trim(), details, visitorId);
    return NextResponse.json(created, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error enviando propuesta";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
