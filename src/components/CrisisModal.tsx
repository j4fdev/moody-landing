"use client";

import React from "react";
import { useI18n } from "@/i18n/context";
import { PhoneCall, X, ShieldAlert, HeartHandshake } from "lucide-react";

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
  const { t } = useI18n();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-moody-surface dark:bg-moody-surfaceDark rounded-3xl border border-moody-oat dark:border-moody-surfaceContainerDark shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-moody-secondary/15 dark:bg-moody-secondaryDark/20 flex items-center justify-center text-moody-secondary dark:text-moody-secondaryDark">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                {t.crisis.modalTitle}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark mt-0.5">
                Atención gratuita, confidencial y 24 horas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-moody-surfaceContainer dark:hover:bg-moody-surfaceContainerDark text-moody-textSecondary dark:text-moody-textSecondaryDark transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Intro */}
        <div className="p-4 rounded-2xl bg-moody-secondary/10 dark:bg-moody-secondaryDark/15 border border-moody-secondary/20 mb-6">
          <p className="text-sm text-moody-textPrimary dark:text-moody-textPrimaryDark leading-relaxed">
            {t.crisis.modalIntro}
          </p>
        </div>

        {/* Country List */}
        <div className="space-y-3 mb-6">
          {t.crisis.countries.map((c, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-2xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark/60 border border-moody-oat/50 dark:border-moody-surfaceHoverDark hover:border-moody-primary transition-colors"
            >
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-moody-primary dark:text-moody-primaryDark">
                  {c.country}
                </span>
                <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark mt-0.5">
                  {c.desc}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={c.number.includes(".") ? `https://${c.number}` : `tel:${c.number.split("/")[0].trim()}`}
                  target={c.number.includes(".") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-moody-primary text-white text-xs font-bold hover:bg-moody-primaryHover transition-all shadow-sm"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{c.number}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-moody-oat dark:border-moody-surfaceContainerDark">
          <div className="flex items-center gap-2 text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark">
            <HeartHandshake className="w-4 h-4 text-moody-secondary" />
            <span>Recuerda que no estás a solas. Siempre hay ayuda disponible.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark font-medium text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark hover:bg-moody-surfaceHover transition-colors"
          >
            {t.crisis.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
}
