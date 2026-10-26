import { NextRequest, NextResponse } from "next/server";
import { joinWaitlistRemote } from "@/lib/landingClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, ref, source } = body;

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Por favor proporciona un correo electrónico válido" },
        { status: 400 }
      );
    }

    const visitorId = req.cookies.get("moody_vid")?.value || "";

    const res = await joinWaitlistRemote({
      email,
      name: name || "Anónimo",
      ref: ref || "",
      source: source || "landing_hero",
      visitorId,
    });

    return NextResponse.json(res);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error procesando el registro";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
