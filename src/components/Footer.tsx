"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { Locale } from "@/i18n/types";
import { ShieldCheck, Heart, Sparkles, FileText, Bot } from "lucide-react";
import Link from "next/link";

interface FooterProps {
  onOpenLegal: (type: "terms" | "privacy") => void;
  onOpenCrisis: () => void;
}

export default function Footer({ onOpenLegal, onOpenCrisis }: FooterProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <footer className="w-full bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border-t border-moody-oat dark:border-moody-surfaceHoverDark py-12 md:py-16 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-moody-primary flex items-center justify-center text-white">
                <div className="w-3.5 h-3.5 rounded-full border border-white flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
              <span className="text-xl font-black text-moody-textPrimary dark:text-moody-textPrimaryDark tracking-tight">
                Moody
              </span>
            </div>
            <p className="text-xs md:text-sm text-moody-textSecondary dark:text-moody-textSecondaryDark max-w-sm leading-relaxed">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2 text-xs text-moody-primary dark:text-moody-primaryDark font-medium">
              <Sparkles className="w-4 h-4" />
              <span>{t.footer.designedWith}</span>
            </div>
          </div>

          {/* Links Col 1: Legal & Trust */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark">
              Ética & Legal
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onOpenLegal("terms")}
                  className="text-moody-textPrimary dark:text-moody-textPrimaryDark hover:text-moody-primary dark:hover:text-moody-primaryDark transition-colors"
                >
                  {t.nav.terms} y Condiciones
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("privacy")}
                  className="text-moody-textPrimary dark:text-moody-textPrimaryDark hover:text-moody-primary dark:hover:text-moody-primaryDark transition-colors"
                >
                  Política de {t.nav.privacy}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCrisis}
                  className="text-moody-secondary dark:text-moody-secondaryDark hover:underline font-semibold"
                >
                  Líneas de Ayuda en Crisis
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2: SEO & IA / Machine-readable */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark">
              IA & Plataforma
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/llms.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-moody-textPrimary dark:text-moody-textPrimaryDark hover:text-moody-primary transition-colors"
                >
                  <Bot className="w-3.5 h-3.5 text-moody-primary" />
                  <span>/llms.txt (Agentes IA)</span>
                </a>
              </li>
              <li>
                <a
                  href="/llms-full.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-moody-textSecondary dark:text-moody-textSecondaryDark hover:text-moody-primary transition-colors"
                >
                  /llms-full.txt (Contexto completo)
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="text-moody-textSecondary dark:text-moody-textSecondaryDark hover:text-moody-primary transition-colors"
                >
                  Sitemap XML
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-moody-oat dark:border-moody-surfaceHoverDark flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-moody-textSecondary dark:text-moody-textSecondaryDark">
          <span>{t.footer.rights}</span>
          <div className="flex items-center gap-4">
            <span>{t.footer.genderNeutral}</span>
            <span>•</span>
            <div className="flex items-center gap-2">
              {(["es", "en", "pt"] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocale(loc)}
                  className={`uppercase font-bold hover:underline ${
                    locale === loc ? "text-moody-primary dark:text-moody-primaryDark" : ""
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
