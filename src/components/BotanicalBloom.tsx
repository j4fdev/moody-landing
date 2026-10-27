"use client";

import React, { useState } from "react";
import { Sparkles, Flower2, Heart } from "lucide-react";

export default function BotanicalBloom() {
  const [isBlooming, setIsBlooming] = useState(true);
  const [bloomCount, setBloomCount] = useState(0);

  const handleBloom = () => {
    setIsBlooming(false);
    setTimeout(() => {
      setIsBlooming(true);
      setBloomCount((c) => c + 1);
    }, 250);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 md:p-8 rounded-4xl bg-moody-surfaceContainer/80 dark:bg-moody-surfaceContainerDark/80 border border-moody-oat dark:border-moody-surfaceHoverDark shadow-sm overflow-hidden group">
      {/* Floating calming particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-4 left-6 w-2 h-2 rounded-full bg-moody-empathy/40 animate-pulse" />
        <div className="absolute bottom-6 right-8 w-3 h-3 rounded-full bg-moody-mist/40 animate-bounce" style={{ animationDuration: "6s" }} />
        <div className="absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-moody-primary/40 animate-ping" style={{ animationDuration: "4s" }} />
        <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-moody-primary/10 blur-2xl" />
        <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-moody-secondary/10 blur-2xl" />
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat/60 dark:border-moody-surfaceHoverDark text-[11px] font-bold text-moody-primary dark:text-moody-primaryDark mb-3 shadow-xs">
        <Flower2 className="w-3.5 h-3.5 text-moody-secondary" />
        <span>Santuario Botánico • Toca la flor para florecer</span>
      </div>

      {/* SVG Blooming Flower Canvas */}
      <div
        onClick={handleBloom}
        className="relative w-48 h-48 sm:w-56 sm:h-56 cursor-pointer select-none transition-transform duration-700 hover:scale-105 active:scale-95 flex items-center justify-center"
        title="Toca para sincronizar el florecimiento"
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="bloomCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#D97A53" />
              <stop offset="100%" stopColor="#C46842" />
            </radialGradient>
            <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#86AFA0" />
              <stop offset="100%" stopColor="#3F6353" />
            </linearGradient>
            <linearGradient id="petalGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E58EA4" />
              <stop offset="100%" stopColor="#D97A53" />
            </linearGradient>
            <linearGradient id="petalGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E8DFD1" />
              <stop offset="100%" stopColor="#7D9BA6" />
            </linearGradient>
          </defs>

          {/* Stem & Leaves */}
          <g className="transition-opacity duration-1000">
            <path
              d="M100 120 C100 150 90 170 85 195"
              stroke="#3F6353"
              strokeWidth="4"
              strokeLinecap="round"
              className="opacity-75"
            />
            {/* Left Leaf */}
            <path
              d="M93 155 C70 145 60 160 85 168 C90 168 93 160 93 155 Z"
              fill="#86AFA0"
              className="opacity-80 transition-transform duration-1000 origin-[93px_155px] hover:rotate-6"
            />
            {/* Right Leaf */}
            <path
              d="M96 140 C120 130 130 148 105 155 C99 155 96 145 96 140 Z"
              fill="#3F6353"
              className="opacity-85 transition-transform duration-1000 origin-[96px_140px] hover:-rotate-6"
            />
          </g>

          {/* Outer Layer of Petals (8 petals) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <path
              key={`outer-${i}`}
              d="M100 100 C80 60 85 25 100 15 C115 25 120 60 100 100 Z"
              fill="url(#petalGrad1)"
              opacity="0.85"
              transform={`rotate(${angle} 100 100) ${isBlooming ? "scale(1)" : "scale(0.3)"}`}
              className="transition-all duration-1000 ease-out origin-[100px_100px]"
              style={{
                transitionDelay: `${i * 40}ms`,
              }}
            />
          ))}

          {/* Middle Layer of Warm Empathetic Petals (rotated 22.5 deg) */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
            <path
              key={`mid-${i}`}
              d="M100 100 C85 70 88 40 100 30 C112 40 115 70 100 100 Z"
              fill="url(#petalGrad2)"
              opacity="0.9"
              transform={`rotate(${angle} 100 100) ${isBlooming ? "scale(0.95)" : "scale(0.2)"}`}
              className="transition-all duration-700 ease-out origin-[100px_100px]"
              style={{
                transitionDelay: `${i * 30 + 100}ms`,
              }}
            />
          ))}

          {/* Inner Light Petals */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <path
              key={`inner-${i}`}
              d="M100 100 C90 80 92 55 100 48 C108 55 110 80 100 100 Z"
              fill="url(#petalGrad3)"
              opacity="0.95"
              transform={`rotate(${angle} 100 100) ${isBlooming ? "scale(0.85)" : "scale(0.1)"}`}
              className="transition-all duration-500 ease-out origin-[100px_100px]"
            />
          ))}

          {/* Center Glowing Core */}
          <circle
            cx="100"
            cy="100"
            r={isBlooming ? "15" : "8"}
            fill="url(#bloomCore)"
            className="transition-all duration-500 ease-out shadow-lg"
          />
          <circle
            cx="100"
            cy="100"
            r={isBlooming ? "8" : "4"}
            fill="#FAF7F2"
            opacity="0.9"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* Botanical Calming Phrase */}
      <div className="text-center mt-2 space-y-1">
        <p className="text-xs md:text-sm font-semibold text-moody-textPrimary dark:text-moody-textPrimaryDark">
          Florece a tu propio ritmo. Cada emoción nutre tu raíz.
        </p>
        <span className="text-[11px] text-moody-textSecondary dark:text-moody-textSecondaryDark block">
          Inspiración botánica Wabi-Sabi • {bloomCount > 0 ? `${bloomCount} momentos de consciencia` : "Pausa consciente"}
        </span>
      </div>
    </div>
  );
}
