"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import BotanicalBloom from "./BotanicalBloom";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Users,
  Compass,
} from "lucide-react";

interface HeroProps {
  onTabChange: (tab: "features" | "waitlist") => void;
  activeTab: "features" | "waitlist";
  onOpenWaitlistModal: () => void;
}

export default function Hero({ onTabChange, activeTab, onOpenWaitlistModal }: HeroProps) {
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
    <section className="relative overflow-hidden pt-8 pb-10 md:pt-12 md:pb-14">
      {/* Background Calm Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-80 bg-gradient-to-b from-moody-mist/10 via-moody-primary/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-8">
          {/* Sanctuary Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat dark:border-moody-surfaceHoverDark text-moody-textPrimary dark:text-moody-textPrimaryDark text-xs font-semibold shadow-xs mb-4 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-moody-primary animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-moody-textPrimary dark:text-moody-textPrimaryDark tracking-tight leading-[1.18] mb-4">
            {t.hero.titleStart}{" "}
            <span className="relative inline-block text-moody-primary dark:text-moody-primaryDark underline decoration-moody-secondary/40 decoration-wavy decoration-2">
              {t.hero.titleHighlight}
            </span>{" "}
            {t.hero.titleEnd}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed mb-6 max-w-2xl mx-auto font-normal">
            {t.hero.subtitle}
          </p>

          {/* Direct CTA Buttons - Opens Popup Instantly Without Scrolling */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <button
              onClick={onOpenWaitlistModal}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-moody-primary text-white hover:bg-moody-primaryHover font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.hero.ctaPrimary}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onTabChange("features")}
              className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                activeTab === "features"
                  ? "bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border-moody-primary text-moody-primary dark:text-moody-primaryDark"
                  : "bg-transparent border-moody-oat dark:border-moody-surfaceContainerDark text-moody-textPrimary dark:text-moody-textPrimaryDark hover:bg-moody-surfaceContainer"
              }`}
            >
              <span>{t.hero.ctaSecondary}</span>
            </button>
          </div>

          {/* Real Trust Highlights (No hardcoded inflated numbers) */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark pt-3 border-t border-moody-oat/50 dark:border-moody-surfaceContainerDark">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-moody-primary" />
              <span>
                <strong>
                  {waitlistCount && waitlistCount > 0 ? waitlistCount : "Pioneros"}
                </strong>{" "}
                {waitlistCount && waitlistCount > 0
                  ? t.hero.statUsersWaiting
                  : "registrándose en el santuario"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-moody-primary" />
              <span>{t.hero.statRating}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-moody-secondary" />
              <span>{t.hero.statNoAds}</span>
            </div>
          </div>
        </div>

        {/* 2-Column Compact Interactive Showcase: Bloom & App Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-center">
          {/* Botanical Bloom Animation */}
          <BotanicalBloom />

          {/* Phone Screen Mockup */}
          <div className="p-3 rounded-4xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border-2 border-moody-oat dark:border-moody-surfaceHoverDark shadow-xl relative">
            <div className="rounded-3xl bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat/60 dark:border-moody-surfaceContainerDark p-5 space-y-3.5 overflow-hidden">
              {/* Header inside mockup */}
              <div className="flex items-center justify-between border-b border-moody-oat/50 dark:border-moody-surfaceContainerDark pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-moody-primary flex items-center justify-center text-white text-[10px]">
                    🌿
                  </div>
                  <span className="text-xs font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                    Moody Santuario
                  </span>
                </div>
                <div className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300">
                  🔥 Racha Compasiva
                </div>
              </div>

              {/* Greeting */}
              <div className="space-y-0.5">
                <p className="text-[10px] text-moody-textSecondary dark:text-moody-textSecondaryDark">
                  Aquí y ahora
                </p>
                <h4 className="text-sm font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                  ¿Cómo late tu corazón en este instante?
                </h4>
              </div>

              {/* Intensity Slider Mockup */}
              <div className="p-3 rounded-2xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                  <span>Intensidad Somática</span>
                  <span className="text-moody-primary dark:text-moody-primaryDark font-mono">
                    En equilibrio
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-moody-oat dark:bg-moody-surfaceHoverDark relative flex items-center">
                  <div className="w-1/2 h-full rounded-full bg-moody-primary" />
                  <div className="w-4 h-4 rounded-full bg-moody-primary border-2 border-white dark:border-moody-surfaceDark absolute left-[50%] -translate-x-1/2 shadow-xs" />
                </div>
              </div>

              {/* Micro-Dynamic Card Mockup */}
              <div className="p-3 rounded-2xl bg-moody-mist/15 dark:bg-moody-mistDark/20 border border-moody-mist/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-moody-mist text-white flex items-center justify-center text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                      One Day, One Win
                    </h5>
                    <p className="text-[9px] text-moody-textSecondary dark:text-moody-textSecondaryDark">
                      ⏱️ 2 min • Sin juicio
                    </p>
                  </div>
                </div>
                <button
                  onClick={onOpenWaitlistModal}
                  className="px-2.5 py-1 rounded-lg bg-moody-primary text-white text-[10px] font-bold"
                >
                  Unirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
