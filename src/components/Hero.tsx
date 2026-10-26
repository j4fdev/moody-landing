"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Users,
  Heart,
  Sliders,
  Wind,
} from "lucide-react";

interface HeroProps {
  onTabChange: (tab: "features" | "waitlist") => void;
  activeTab: "features" | "waitlist";
}

export default function Hero({ onTabChange, activeTab }: HeroProps) {
  const { t } = useI18n();
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/info")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.waitlist_count === "number") {
          setWaitlistCount(data.waitlist_count);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-16 md:pb-24">
      {/* Background Calm Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-moody-mist/10 via-moody-primary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Sanctuary Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat dark:border-moody-surfaceHoverDark text-moody-textPrimary dark:text-moody-textPrimaryDark text-xs font-semibold shadow-xs mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-moody-primary animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-moody-textPrimary dark:text-moody-textPrimaryDark tracking-tight leading-[1.15] mb-6">
            {t.hero.titleStart}{" "}
            <span className="relative inline-block text-moody-primary dark:text-moody-primaryDark underline decoration-moody-secondary/40 decoration-wavy decoration-2">
              {t.hero.titleHighlight}
            </span>{" "}
            {t.hero.titleEnd}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed mb-8 max-w-2xl mx-auto font-normal">
            {t.hero.subtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <button
              onClick={() => onTabChange("waitlist")}
              className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-sm tracking-wide shadow-md transition-all active:scale-95 flex items-center justify-center gap-2.5 ${
                activeTab === "waitlist"
                  ? "bg-moody-secondary text-white hover:bg-moody-secondaryHover shadow-moody-secondary/20"
                  : "bg-moody-primary text-white hover:bg-moody-primaryHover shadow-moody-primary/20"
              }`}
            >
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onTabChange("features")}
              className={`w-full sm:w-auto px-7 py-4 rounded-2xl font-bold text-sm transition-all border ${
                activeTab === "features"
                  ? "bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border-moody-primary text-moody-primary dark:text-moody-primaryDark"
                  : "bg-transparent border-moody-oat dark:border-moody-surfaceContainerDark text-moody-textPrimary dark:text-moody-textPrimaryDark hover:bg-moody-surfaceContainer dark:hover:bg-moody-surfaceContainerDark"
              }`}
            >
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark pt-4 border-t border-moody-oat/60 dark:border-moody-surfaceContainerDark">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-moody-primary" />
              <span>
                <strong>{waitlistCount !== null ? waitlistCount : "140+"}</strong>{" "}
                {t.hero.statUsersWaiting}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-moody-primary" />
              <span>{t.hero.statRating}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-moody-secondary" />
              <span>{t.hero.statNoAds}</span>
            </div>
          </div>
        </div>

        {/* Visual App Interface Mockup Preview (Japandi App Frame) */}
        <div className="mt-14 max-w-sm sm:max-w-md mx-auto">
          <div className="p-3 rounded-4xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border-2 border-moody-oat dark:border-moody-surfaceHoverDark shadow-2xl relative">
            {/* Phone Screen Mockup */}
            <div className="rounded-3xl bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat/60 dark:border-moody-surfaceContainerDark p-5 space-y-4 overflow-hidden">
              {/* Header inside mockup */}
              <div className="flex items-center justify-between border-b border-moody-oat/50 dark:border-moody-surfaceContainerDark pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-moody-primary flex items-center justify-center text-white text-[10px]">
                    🌿
                  </div>
                  <span className="text-xs font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                    Moody Santuario
                  </span>
                </div>
                <div className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  🔥 5 días de racha
                </div>
              </div>

              {/* Greeting */}
              <div className="space-y-1">
                <p className="text-[11px] text-moody-textSecondary dark:text-moody-textSecondaryDark">
                  Buenas tardes
                </p>
                <h4 className="text-base font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                  ¿Cómo late tu corazón ahora?
                </h4>
              </div>

              {/* Intensity Slider Mockup */}
              <div className="p-3.5 rounded-2xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                  <span>Intensidad Emocional</span>
                  <span className="text-moody-primary dark:text-moody-primaryDark font-mono">
                    6 / 10
                  </span>
                </div>
                {/* Simulated Track */}
                <div className="h-3 rounded-full bg-moody-oat dark:bg-moody-surfaceHoverDark relative flex items-center">
                  <div className="w-3/5 h-full rounded-full bg-moody-primary" />
                  <div className="w-5 h-5 rounded-full bg-moody-primary border-2 border-white dark:border-moody-surfaceDark absolute left-[58%] -translate-x-1/2 shadow-sm" />
                </div>
                <div className="flex justify-between text-[10px] text-moody-textSecondary">
                  <span>Calma suave</span>
                  <span>Intensidad alta</span>
                </div>
              </div>

              {/* Micro-Dynamic Card Mockup */}
              <div className="p-3.5 rounded-2xl bg-moody-mist/15 dark:bg-moody-mistDark/20 border border-moody-mist/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-moody-mist text-white flex items-center justify-center text-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                      One Day, One Win
                    </h5>
                    <p className="text-[10px] text-moody-textSecondary dark:text-moody-textSecondaryDark">
                      ⏱️ 2 minutos de gratitud
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onTabChange("features")}
                  className="px-2.5 py-1 rounded-lg bg-moody-primary text-white text-[10px] font-bold"
                >
                  Abrir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
