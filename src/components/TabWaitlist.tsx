"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { trackTelemetry } from "@/lib/telemetry";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Users,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Loader2,
  ShieldCheck,
  Share2,
  RotateCcw,
  HeartHandshake,
  AlertCircle,
} from "lucide-react";

interface TabWaitlistProps {
  onOpenLegal?: (type: "terms" | "privacy") => void;
}

export default function TabWaitlist({ onOpenLegal }: TabWaitlistProps) {
  const { t } = useI18n();

  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("search");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Success state
  const [joinedData, setJoinedData] = useState<{
    position: number;
    referral_code: string;
    already_joined: boolean;
  } | null>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Detect ref from URL if present
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      setRefCode(ref);
    }

    // Fetch real count from API
    fetch("/api/info")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.waitlist_count === "number") {
          setWaitlistCount(data.waitlist_count);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setShowTermsError(true);
      return;
    }
    setShowTermsError(false);

    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    setErrorMsg(null);
    trackTelemetry("cta_click", "#waitlist-form-submit");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || "Anónimo",
          email: email.trim().toLowerCase(),
          source,
          ref: refCode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "No se pudo completar el registro.");
      }

      setJoinedData(data);
      if (waitlistCount !== null && !data.already_joined) {
        setWaitlistCount((c) => (c ? c + 1 : 1));
      }

      // Gentle celebration
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#3F6353", "#86AFA0", "#D97A53", "#6A8B9C", "#FAF7F2"],
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error inesperado";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const shareUrl = typeof window !== "undefined" && joinedData
    ? `${window.location.origin}?ref=${joinedData.referral_code}`
    : `https://moody.j4f.dev?ref=${joinedData?.referral_code || ""}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareTwitter = () => {
    const text = encodeURIComponent(
      "Me acabo de anotar al santuario de bienestar emocional @MoodyApp. Todas las emociones son válidas. Súmate a la lista de espera:"
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleShareWhatsapp = () => {
    const text = encodeURIComponent(
      `Hola! Me anoté en Moody, una app muy bonita para bienestar emocional y salud mental sin presiones. Échale un vistazo: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 animate-fade-in">
      {/* Badge & Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-moody-secondary/15 text-moody-secondary dark:text-moody-secondaryDark text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.waitlist.badge}</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-moody-textPrimary dark:text-moody-textPrimaryDark tracking-tight mb-2">
          {t.waitlist.title}
        </h2>
        <p className="text-xs md:text-sm text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
          {t.waitlist.subtitle}
        </p>

        {/* Dynamic Real Counter Pill */}
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark text-xs font-bold text-moody-primary dark:text-moody-primaryDark shadow-sm">
          <Users className="w-3.5 h-3.5" />
          <span>
            {waitlistCount && waitlistCount > 0
              ? `${waitlistCount.toLocaleString()} ${t.waitlist.counterText}`
              : t.waitlist.counterZero}
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/80 dark:border-moody-surfaceHoverDark p-6 md:p-10 shadow-sm">
        {!joinedData ? (
          /* Form State */
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            {refCode && (
              <div className="p-3 rounded-xl bg-moody-primary/10 border border-moody-primary/20 flex items-center gap-2 text-xs text-moody-primary dark:text-moody-primaryDark font-medium">
                <HeartHandshake className="w-4 h-4 shrink-0" />
                <span>
                  Llegaste con invitación ({refCode}). Tu turno tendrá prioridad.
                </span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1">
                {t.waitlist.nameLabel}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.waitlist.namePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat dark:border-moody-surfaceHoverDark text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark placeholder:text-moody-textSecondary/50 focus:outline-none focus:border-moody-primary"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1">
                {t.waitlist.emailLabel} <span className="text-moody-secondary">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.waitlist.emailPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat dark:border-moody-surfaceHoverDark text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark placeholder:text-moody-textSecondary/50 focus:outline-none focus:border-moody-primary"
              />
            </div>

            {/* Source Field */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1">
                {t.waitlist.sourceLabel}
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat dark:border-moody-surfaceHoverDark text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark focus:outline-none focus:border-moody-primary"
              >
                <option value="search">{t.waitlist.sourceOptions.search}</option>
                <option value="recommendation">{t.waitlist.sourceOptions.recommendation}</option>
                <option value="social">{t.waitlist.sourceOptions.social}</option>
                <option value="other">{t.waitlist.sourceOptions.other}</option>
              </select>
            </div>

            {/* Mandatory Terms & Conditions Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer select-none text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);
                    if (e.target.checked) setShowTermsError(false);
                  }}
                  className="mt-0.5 w-4 h-4 rounded border-moody-oat text-moody-primary focus:ring-moody-primary cursor-pointer accent-moody-primary"
                />
                <span className="leading-snug">
                  {t.waitlist.acceptTermsLabel}{" "}
                  <button
                    type="button"
                    onClick={() => onOpenLegal && onOpenLegal("terms")}
                    className="text-moody-primary dark:text-moody-primaryDark font-bold underline hover:opacity-80"
                  >
                    {t.waitlist.termsLinkText}
                  </button>{" "}
                  y la{" "}
                  <button
                    type="button"
                    onClick={() => onOpenLegal && onOpenLegal("privacy")}
                    className="text-moody-primary dark:text-moody-primaryDark font-bold underline hover:opacity-80"
                  >
                    {t.waitlist.privacyLinkText}
                  </button>
                  .
                </span>
              </label>

              {showTermsError && (
                <div className="flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-medium mt-1.5 animate-fade-in">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{t.waitlist.acceptTermsError}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="w-full mt-2 py-3.5 rounded-xl bg-moody-primary text-white font-bold text-xs tracking-wide hover:bg-moody-primaryHover transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.waitlist.submittingBtn}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{t.waitlist.submitBtn}</span>
                </>
              )}
            </button>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-moody-textSecondary dark:text-moody-textSecondaryDark pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-moody-primary" />
              <span>{t.waitlist.privacyNotice}</span>
            </div>
          </form>
        ) : (
          /* Success State */
          <div className="text-center max-w-md mx-auto space-y-5">
            <div className="w-14 h-14 rounded-full bg-moody-primary/15 dark:bg-moody-primaryDark/20 flex items-center justify-center mx-auto text-moody-primary dark:text-moody-primaryDark">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1">
                {t.waitlist.successTitle}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark">
                {t.waitlist.successSubtitle}
              </p>
            </div>

            {/* Position Display */}
            <div className="p-5 rounded-2xl bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat dark:border-moody-surfaceHoverDark shadow-inner">
              <span className="text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark block mb-0.5">
                {t.waitlist.positionLabel}
              </span>
              <span className="text-4xl font-black text-moody-primary dark:text-moody-primaryDark tracking-tight">
                #{joinedData.position}
              </span>
              {joinedData.already_joined && (
                <p className="text-xs text-moody-secondary dark:text-moody-secondaryDark font-medium mt-1">
                  (Ya estabas registrado previamente con este correo).
                </p>
              )}
            </div>

            {/* Referral system */}
            <div className="p-4 rounded-2xl bg-moody-primary/10 dark:bg-moody-primaryDark/15 border border-moody-primary/20 space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-moody-primary dark:text-moody-primaryDark font-bold text-xs">
                <Share2 className="w-3.5 h-3.5" />
                <span>{t.waitlist.referralTitle}</span>
              </div>
              <p className="text-[11px] text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
                {t.waitlist.referralExplanation}
              </p>

              {/* Copy input row */}
              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  readOnly
                  value={shareUrl}
                  className="w-full px-3 py-2 rounded-lg bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat dark:border-moody-surfaceHoverDark text-[11px] text-moody-textPrimary dark:text-moody-textPrimaryDark select-all font-mono"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-2 rounded-lg bg-moody-primary text-white text-xs font-bold hover:bg-moody-primaryHover transition-all shrink-0 flex items-center gap-1 shadow-sm"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copiado" : "Copiar"}</span>
                </button>
              </div>

              {/* Quick social share buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleShareTwitter}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat text-xs font-semibold text-moody-textPrimary dark:text-moody-textPrimaryDark hover:border-moody-primary transition-colors text-center"
                >
                  X
                </button>
                <button
                  onClick={handleShareWhatsapp}
                  className="flex-1 py-1.5 px-2 rounded-lg bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat text-xs font-semibold text-moody-textPrimary dark:text-moody-textPrimaryDark hover:border-moody-primary transition-colors text-center"
                >
                  WhatsApp
                </button>
              </div>
            </div>

            {/* Reset button */}
            <button
              onClick={() => {
                setJoinedData(null);
                setEmail("");
                setName("");
                setAcceptedTerms(false);
              }}
              className="inline-flex items-center gap-1.5 text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark hover:text-moody-primary font-medium pt-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.waitlist.joinAnotherBtn}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
