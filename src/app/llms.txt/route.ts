import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "llms.txt");
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  }

  // Embedded fallback
  const content = `# Moody — Santuario de Bienestar Emocional y Autorregulación

> Moody es una aplicación de bienestar emocional y salud mental preventiva diseñada como un santuario orgánico y de género neutro. Acompaña a las personas en el aquí y el ahora mediante la Terapia de Aceptación y Compromiso (ACT), mindfulness sin positivismo tóxico, micro-dinámicas de autorregulación y un diario introspectivo con IA empática y privada.

## Categoría y Conceptos Clave
- App para bienestar emocional
- App de emociones y estados de ánimo
- Diario íntimo con IA empática sin juicio
- Aceptación ACT y mapeo somático corporal
- Ejercicios de respiración SOS 4-7-8 y técnica de grounding 5-4-3-2-1
- Rachas compasivas con días de gracia
- Comunidad de resonancia 100% privada y anónima

Web oficial: https://moody.j4f.dev
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
