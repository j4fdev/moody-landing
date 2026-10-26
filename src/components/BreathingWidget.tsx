"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { Wind, Play, Square, Sparkles } from "lucide-react";

export default function BreathingWidget() {
  const { t } = useI18n();
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("inhale");
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let timer: NodeJS.Timeout;

    if (secondsLeft > 1) {
      timer = setTimeout(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else {
      // Transition phase: 4s Inhale -> 7s Hold -> 8s Exhale -> 1s Rest
      if (phase === "inhale") {
        setPhase("hold");
        setSecondsLeft(7);
      } else if (phase === "hold") {
        setPhase("exhale");
        setSecondsLeft(8);
      } else if (phase === "exhale") {
        setPhase("rest");
        setSecondsLeft(1);
      } else if (phase === "rest") {
        setCyclesCompleted((c) => c + 1);
        setPhase("inhale");
        setSecondsLeft(4);
      }
    }

    return () => clearTimeout(timer);
  }, [isActive, phase, secondsLeft]);

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setPhase("inhale");
      setSecondsLeft(4);
    } else {
      setIsActive(true);
      setPhase("inhale");
      setSecondsLeft(4);
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return t.features.breathePromptInhale;
      case "hold":
        return t.features.breathePromptHold;
      case "exhale":
        return t.features.breathePromptExhale;
      case "rest":
        return t.features.breathePromptRest;
    }
  };

  const getScaleClass = () => {
    if (!isActive) return "scale-100";
    if (phase === "inhale") return "scale-125 transition-all duration-[4000ms] ease-out";
    if (phase === "hold") return "scale-125";
    if (phase === "exhale") return "scale-90 transition-all duration-[8000ms] ease-in-out";
    return "scale-100 transition-all duration-1000";
  };

  const getPhaseColor = () => {
    switch (phase) {
      case "inhale":
        return "bg-moody-mist/20 border-moody-mist text-moody-mist";
      case "hold":
        return "bg-moody-primary/20 border-moody-primary text-moody-primary dark:text-moody-primaryDark";
      case "exhale":
        return "bg-moody-secondary/20 border-moody-secondary text-moody-secondary dark:text-moody-secondaryDark";
      case "rest":
        return "bg-moody-oat/40 border-moody-oat text-moody-textSecondary";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/80 dark:border-moody-surfaceHoverDark p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm">
      {/* Subtle background glow */}
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-moody-mist/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-moody-primary/15 blur-3xl pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-moody-mist/15 dark:bg-moody-mistDark/20 text-moody-mist dark:text-moody-mistDark text-xs font-semibold mb-3">
        <Wind className="w-3.5 h-3.5" />
        <span>Ejercicio SOS 4-7-8 en Tiempo Real</span>
      </div>

      <h4 className="text-xl font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1">
        {t.features.interactiveDemoTitle}
      </h4>
      <p className="text-xs md:text-sm text-moody-textSecondary dark:text-moody-textSecondaryDark max-w-md mb-8">
        {t.features.interactiveDemoSubtitle}
      </p>

      {/* Breathing Bubble */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Outer pulsating ring */}
        <div
          className={`w-44 h-44 md:w-52 md:h-52 rounded-full border-2 flex items-center justify-center transition-all ${getPhaseColor()} ${getScaleClass()}`}
        >
          {/* Inner core */}
          <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-moody-surface dark:bg-moody-surfaceDark shadow-inner flex flex-col items-center justify-center p-3">
            <span className="text-3xl md:text-4xl font-extrabold text-moody-textPrimary dark:text-moody-textPrimaryDark tracking-tight">
              {isActive ? secondsLeft : "4-7-8"}
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mt-1">
              {isActive ? phase : "Respira"}
            </span>
          </div>
        </div>
      </div>

      {/* Guided prompt */}
      <div className="h-10 flex items-center justify-center my-4">
        <p className="text-sm font-medium text-moody-textPrimary dark:text-moody-textPrimaryDark transition-all">
          {isActive ? getPhaseText() : "Presiona el botón para sincronizar tu respiración con Moody."}
        </p>
      </div>

      {/* Action button */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={handleToggle}
          className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-xs md:text-sm tracking-wide shadow-md transition-all active:scale-95 ${
            isActive
              ? "bg-moody-secondary text-white hover:bg-moody-secondaryHover"
              : "bg-moody-primary text-white hover:bg-moody-primaryHover"
          }`}
        >
          {isActive ? (
            <>
              <Square className="w-4 h-4 fill-current" />
              <span>{t.features.breatheButtonStop}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{t.features.breatheButtonStart}</span>
            </>
          )}
        </button>

        {cyclesCompleted > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark font-medium px-3 py-2 rounded-xl bg-moody-surface/60 dark:bg-moody-surfaceDark/60">
            <Sparkles className="w-3.5 h-3.5 text-moody-primary" />
            <span>{cyclesCompleted} ciclos completados</span>
          </div>
        )}
      </div>
    </div>
  );
}
