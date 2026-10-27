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

    console.log(`[Telemetry API] Received event:`, eventPayload.type, eventPayload.path);

    const success = await recordTelemetryEvent(eventPayload);
    console.log(`[Telemetry API] Upstream recorded:`, success);

    return NextResponse.json(
      { ok: true, status: "recorded", upstream: success },
      { status: 200 }
    );
  } catch (err) {
    console.error("[Telemetry API Error]", err);
    return NextResponse.json(
      { ok: false, error: "Failed to record event" },
      { status: 500 }
    );
  }
}
