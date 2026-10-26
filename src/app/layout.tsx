import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/i18n/context";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL("https://moody.j4f.dev"),
  title: {
    default: "Moody — App para Bienestar Emocional y Salud Mental Sin Juicio",
    template: "%s | Moody Santuario",
  },
  description:
    "Moody es tu santuario personal de bienestar emocional. App de emociones basada en ACT, registro somático, respiración SOS 4-7-8, racha compasiva y total privacidad. Únete a la lista de espera.",
  keywords: [
    "app para bienestar emocional",
    "app de emociones",
    "salud mental",
    "bienestar emocional",
    "registro de estado de ánimo",
    "mindfulness act",
    "diario intimo",
    "ansiedad sos",
    "respiracion 4-7-8",
    "racha compasiva",
    "comunidad de resonancia",
    "emotional well-being app",
    "mood tracker",
    "app de bem-estar emocional",
  ],
  authors: [{ name: "Moody Team • J4F", url: "https://moody.j4f.dev" }],
  creator: "J4F Ecosystem",
  publisher: "J4F Ecosystem",
  openGraph: {
    type: "website",
    locale: "es_ES",
    alternateLocale: ["en_US", "pt_BR"],
    url: "https://moody.j4f.dev",
    siteName: "Moody",
    title: "Moody — App para Bienestar Emocional y Salud Mental Sin Juicio",
    description:
      "Todas tus emociones son válidas aquí y ahora. Descubre Moody: diario compasivo, ejercicios somáticos 4-7-8, IA empática y comunidad libre de vanidad.",
    images: [
      {
        url: "https://moody.j4f.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Moody — Santuario de Bienestar Emocional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moody — Santuario de Bienestar Emocional",
    description:
      "Todas tus emociones son válidas aquí y ahora. Santuario de bienestar emocional, mindfulness ACT y total privacidad.",
    creator: "@MoodyApp",
  },
  alternates: {
    canonical: "https://moody.j4f.dev",
    languages: {
      "es-ES": "https://moody.j4f.dev?lang=es",
      "en-US": "https://moody.j4f.dev?lang=en",
      "pt-BR": "https://moody.j4f.dev?lang=pt",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <StructuredData />
      </head>
      <body className="min-h-screen flex flex-col font-sans selection:bg-moody-primary/20 selection:text-moody-primary">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
