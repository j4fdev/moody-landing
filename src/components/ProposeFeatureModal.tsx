"use client";

import React, { useState } from "react";
import { useI18n } from "@/i18n/context";
import { trackTelemetry } from "@/lib/telemetry";
import { X, Sparkles, Send, Loader2 } from "lucide-react";
import { FeatureItem } from "@/lib/landingClient";

interface ProposeFeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFeatureCreated: (feat: FeatureItem) => void;
}

export default function ProposeFeatureModal({
  isOpen,
  onClose,
  onFeatureCreated,
}: ProposeFeatureModalProps) {
  const { t } = useI18n();

  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    trackTelemetry("cta_click", "#modal-propose-feature-submit");
    try {
      const res = await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), details: details.trim() }),
      });
      if (res.ok) {
        const created = await res.json();
        onFeatureCreated(created);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          setTitle("");
          setDetails("");
          onClose();
        }, 1800);
      }
    } catch {
      // Ignored
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-moody-surface dark:bg-moody-surfaceDark rounded-3xl border border-moody-oat dark:border-moody-surfaceContainerDark shadow-2xl p-6 md:p-8 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-moody-surfaceContainer dark:hover:bg-moody-surfaceContainerDark text-moody-textSecondary dark:text-moody-textSecondaryDark transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-moody-primary dark:text-moody-primaryDark mb-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-xl font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
            {t.features.roadmapProposeBtn}
          </h3>
        </div>

        <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark mb-5">
          {t.features.roadmapProposeModalSubtitle}
        </p>

        {success ? (
          <div className="p-6 rounded-2xl bg-moody-primary/15 text-center text-moody-primary dark:text-moody-primaryDark font-bold text-xs md:text-sm">
            {t.features.roadmapProposeSuccess}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1">
                {t.features.roadmapProposeFieldTitle} <span className="text-moody-secondary">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.features.roadmapProposePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat dark:border-moody-surfaceHoverDark text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark focus:outline-none focus:border-moody-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1">
                {t.features.roadmapProposeFieldDetails}
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder={t.features.roadmapProposeFieldDetailsPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat dark:border-moody-surfaceHoverDark text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark focus:outline-none focus:border-moody-primary resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl font-medium text-xs text-moody-textSecondary hover:text-moody-textPrimary"
              >
                {t.features.roadmapProposeCancel}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moody-primary text-white font-bold text-xs hover:bg-moody-primaryHover transition-all shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>{t.features.roadmapProposeSubmit}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
