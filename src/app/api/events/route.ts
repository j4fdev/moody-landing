import { NextRequest, NextResponse } from "next/server";
import { recordTelemetryEvent, TelemetryEventInput } from "@/lib/landingClient";

export async function POST(req: NextRequest) {
  try {
    const body: TelemetryEventInput = await req.json();

    if (!body || (body.type !== "page_view" && body.type !== "cta_click")) {
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
    }

    const visitorId = body.visitor_id || req.cookies.get("moody_vid")?.value || "";

    const eventPayload: TelemetryEventInput = {
      type: body.type,
      path: body.path || "/",
      referrer: body.referrer || req.headers.get("referer") || "",
      session_id: body.session_id || "",
      visitor_id: visitorId,
      utm: body.utm || {},
    };

    await recordTelemetryEvent(eventPayload);

    return new NextResponse(null, { status: 204 });
  } catch {
    return new NextResponse(null, { status: 204 });
  }
}
