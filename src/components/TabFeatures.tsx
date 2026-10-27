"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import BreathingWidget from "./BreathingWidget";
import {
  Compass,
  Sparkles,
  Heart,
  ShieldAlert,
  CalendarHeart,
  Users,
  ThumbsUp,
  PlusCircle,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
  Flame,
  HandHeart,
  MessageCircleHeart,
  HelpCircle,
} from "lucide-react";
import { FeatureItem } from "@/lib/landingClient";

interface TabFeaturesProps {
  onOpenWaitlistModal?: () => void;
}

export default function TabFeatures({ onOpenWaitlistModal }: TabFeaturesProps) {
  const { t } = useI18n();

  // Roadmap features state
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [votingId, setVotingId] = useState<string | null>(null);

  // Propose feature modal state
  const [isProposing, setIsProposing] = useState(false);
  const [proposeTitle, setProposeTitle] = useState("");
  const [proposeDetails, setProposeDetails] = useState("");
  const [isSubmittingPropose, setIsSubmittingPropose] = useState(false);
  const [proposeSuccess, setProposeSuccess] = useState(false);

  // Somatic demo interactive state
  const [selectedEmotion, setSelectedEmotion] = useState<string>("ansiedad");
  const [somaticZone, setSomaticZone] = useState<string>("pecho");

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/features");
      if (res.ok) {
        const data = await res.json();
        setFeatures(data);
      }
    } catch {
      // Handled gracefully
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (id: string) => {
    if (votingId) return;
    setVotingId(id);
    try {
      const res = await fetch(`/api/features/${id}/vote`, { method: "POST" });
      if (res.ok) {
        const result = await res.json();
        setFeatures((prev) =>
          prev.map((f) =>
            f.id === id ? { ...f, votes: result.votes, has_voted: result.voted } : f
          )
        );
      }
    } catch {
      // Ignored
    } finally {
      setVotingId(null);
    }
  };

  const handleProposeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proposeTitle.trim()) return;

    setIsSubmittingPropose(true);
    try {
      const res = await fetch("/api/features", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: proposeTitle, details: proposeDetails }),
      });
      if (res.ok) {
        const created = await res.json();
        setFeatures((prev) => [created, ...prev]);
        setProposeSuccess(true);
        setTimeout(() => {
          setProposeSuccess(false);
          setIsProposing(false);
          setProposeTitle("");
          setProposeDetails("");
        }, 1800);
      }
    } catch {
      // Handle error
    } finally {
      setIsSubmittingPropose(false);
    }
  };

  const filteredFeatures = features.filter((f) => {
    if (filter === "all") return true;
    return f.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in_progress":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-moody-secondary/15 text-moody-secondary dark:text-moody-secondaryDark">
            <Clock className="w-3 h-3" /> En Desarrollo
          </span>
        );
      case "planned":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-moody-primary/15 text-moody-primary dark:text-moody-primaryDark">
            <Compass className="w-3 h-3" /> Planificada
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-moody-strength/20 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-3 h-3" /> Lista
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-moody-oat dark:bg-moody-surfaceHoverDark text-moody-textSecondary">
            Propuesta
          </span>
        );
    }
  };

  return (
    <div className="space-y-12 md:space-y-16 py-4 animate-fade-in">
      {/* SECTION 1: THE 5 PILLARS (Compact & Balanced) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moody-primary/10 dark:bg-moody-primaryDark/15 text-moody-primary dark:text-moody-primaryDark text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.features.badge}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-moody-textPrimary dark:text-moody-textPrimaryDark tracking-tight mb-2">
            {t.features.title}
          </h2>
          <p className="text-xs md:text-sm text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
            {t.features.subtitle}
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Pillar 1 */}
          <div className="p-6 rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark flex flex-col justify-between hover:border-moody-primary/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-moody-primary/15 dark:bg-moody-primaryDark/20 flex items-center justify-center text-moody-primary dark:text-moody-primaryDark">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-moody-surface dark:bg-moody-surfaceDark text-moody-primary dark:text-moody-primaryDark border border-moody-oat/50 dark:border-moody-surfaceHoverDark">
                  {t.features.p1Tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1.5">
                {t.features.p1Title}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
                {t.features.p1Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-moody-oat/40 dark:border-moody-surfaceHoverDark flex items-center gap-1.5 text-xs text-moody-primary dark:text-moody-primaryDark font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aceptación ACT sin culpa</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark flex flex-col justify-between hover:border-moody-primary/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-moody-mist/20 dark:bg-moody-mistDark/25 flex items-center justify-center text-moody-mist dark:text-moody-mistDark">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-moody-surface dark:bg-moody-surfaceDark text-moody-mist dark:text-moody-mistDark border border-moody-oat/50 dark:border-moody-surfaceHoverDark">
                  {t.features.p2Tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1.5">
                {t.features.p2Title}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
                {t.features.p2Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-moody-oat/40 dark:border-moody-surfaceHoverDark flex items-center gap-1.5 text-xs text-moody-mist dark:text-moody-mistDark font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Micro-pasos de 2 a 3 min</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-6 rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark flex flex-col justify-between hover:border-moody-secondary/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-moody-secondary/15 dark:bg-moody-secondaryDark/20 flex items-center justify-center text-moody-secondary dark:text-moody-secondaryDark">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-moody-surface dark:bg-moody-surfaceDark text-moody-secondary dark:text-moody-secondaryDark border border-moody-oat/50 dark:border-moody-surfaceHoverDark">
                  {t.features.p3Tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1.5">
                {t.features.p3Title}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
                {t.features.p3Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-moody-oat/40 dark:border-moody-surfaceHoverDark flex items-center gap-1.5 text-xs text-moody-secondary dark:text-moody-secondaryDark font-medium">
              <Heart className="w-3.5 h-3.5" />
              <span>Respiración 4-7-8 & Grounding</span>
            </div>
          </div>

          {/* Pillar 4 */}
          <div className="p-6 rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark flex flex-col justify-between hover:border-moody-primary/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <CalendarHeart className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-moody-surface dark:bg-moody-surfaceDark text-amber-600 dark:text-amber-400 border border-moody-oat/50 dark:border-moody-surfaceHoverDark">
                  {t.features.p4Tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1.5">
                {t.features.p4Title}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
                {t.features.p4Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-moody-oat/40 dark:border-moody-surfaceHoverDark flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 font-medium">
              <Flame className="w-3.5 h-3.5" />
              <span>Días de gracia automáticos</span>
            </div>
          </div>

          {/* Pillar 5 */}
          <div className="p-6 rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark flex flex-col justify-between md:col-span-2 lg:col-span-2 hover:border-moody-primary/40 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="w-10 h-10 rounded-2xl bg-moody-primary/15 dark:bg-moody-primaryDark/20 flex items-center justify-center text-moody-primary dark:text-moody-primaryDark">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-moody-surface dark:bg-moody-surfaceDark text-moody-primary dark:text-moody-primaryDark border border-moody-oat/50 dark:border-moody-surfaceHoverDark">
                  {t.features.p5Tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1.5">
                {t.features.p5Title}
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed">
                {t.features.p5Desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-moody-oat/40 dark:border-moody-surfaceHoverDark flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-moody-textSecondary dark:text-moody-textSecondaryDark">
                Reacciones empáticas:
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-moody-empathy/20 text-rose-800 dark:text-rose-200">
                💖 Empatía
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-moody-strength/25 text-emerald-800 dark:text-emerald-200">
                💪 Fuerza
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-moody-hope/25 text-sky-800 dark:text-sky-200">
                🌈 Esperanza
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-moody-understood/25 text-purple-800 dark:text-purple-200">
                🫂 Te Entiendo
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE CALM & SOMATIC INTERACTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* Breathing Widget */}
          <BreathingWidget />

          {/* Somatic Check-In Demo */}
          <div className="p-6 md:p-8 rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moody-secondary/15 text-moody-secondary dark:text-moody-secondaryDark text-xs font-semibold mb-2">
                <HandHeart className="w-3.5 h-3.5" />
                <span>Mapeo Somático en el Santuario</span>
              </div>
              <h3 className="text-xl font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1.5">
                ¿Dónde sientes tu emoción hoy?
              </h3>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark leading-relaxed mb-4">
                Antes de forzar calma, Moody te enseña a notar el cuerpo sin juzgar:
              </p>

              {/* Step 1: Emotion selector */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1.5">
                  1. Selecciona lo que experimentas:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { id: "ansiedad", label: "Ansiedad / Inquietud" },
                    { id: "cansancio", label: "Agotamiento / Vacío" },
                    { id: "tristeza", label: "Tristeza / Duelo" },
                    { id: "calma", label: "Gratitud / Calma" },
                  ].map((em) => (
                    <button
                      key={em.id}
                      onClick={() => setSelectedEmotion(em.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedEmotion === em.id
                          ? "bg-moody-primary text-white shadow-xs"
                          : "bg-moody-surface dark:bg-moody-surfaceDark text-moody-textPrimary dark:text-moody-textPrimaryDark border border-moody-oat/60 dark:border-moody-surfaceHoverDark"
                      }`}
                    >
                      {em.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Somatic Body Zone */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1.5">
                  2. ¿En qué zona física reside?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: "pecho", label: "Pecho / Opresión" },
                    { id: "garganta", label: "Garganta / Nudo" },
                    { id: "hombros", label: "Hombros / Espalda" },
                    { id: "estomago", label: "Estómago / Vacío" },
                  ].map((zone) => (
                    <button
                      key={zone.id}
                      onClick={() => setSomaticZone(zone.id)}
                      className={`p-2 rounded-xl text-[11px] text-center font-medium transition-all ${
                        somaticZone === zone.id
                          ? "bg-moody-secondary text-white shadow-xs"
                          : "bg-moody-surface dark:bg-moody-surfaceDark text-moody-textSecondary dark:text-moody-textSecondaryDark border border-moody-oat/60 dark:border-moody-surfaceHoverDark"
                      }`}
                    >
                      {zone.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reflection Box */}
              <div className="p-3.5 rounded-2xl bg-moody-surface/80 dark:bg-moody-surfaceDark/80 border border-moody-oat dark:border-moody-surfaceHoverDark">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-moody-primary/15 flex items-center justify-center text-moody-primary dark:text-moody-primaryDark shrink-0">
                    <MessageCircleHeart className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-moody-primary dark:text-moody-primaryDark mb-0.5">
                      Acompañamiento Moody:
                    </h5>
                    <p className="text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark leading-relaxed">
                      {selectedEmotion === "ansiedad" &&
                        `Es natural sentir opresión en ${somaticZone}. No intentes expulsarla; inhala despacio y dale espacio para existir sin peligro.`}
                      {selectedEmotion === "cansancio" &&
                        `Tu cuerpo en ${somaticZone} está pidiendo descanso genuino. Hoy no necesitas rendir; tu presencia ya es suficiente.`}
                      {selectedEmotion === "tristeza" &&
                        `Hacemos silencio contigo. Notar esa pesadez en ${somaticZone} es el primer paso para procesar con ternura lo que duele.`}
                      {selectedEmotion === "calma" &&
                        `Saborea esta ligereza en ${somaticZone}. Tómate 10 segundos para grabarla en tu memoria somática.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: REAL ROADMAP (LandingJ4F Backend Connection, Clean Empty State) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 md:p-10 rounded-3xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/80 dark:border-moody-surfaceHoverDark shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-moody-primary/10 dark:bg-moody-primaryDark/15 text-moody-primary dark:text-moody-primaryDark text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Construcción Comunitaria</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold text-moody-textPrimary dark:text-moody-textPrimaryDark tracking-tight mb-1">
                {t.features.roadmapTitle}
              </h2>
              <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark max-w-xl">
                {t.features.roadmapSubtitle}
              </p>
            </div>

            {/* Propose Button */}
            <button
              onClick={() => setIsProposing(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-moody-primary text-white text-xs font-bold hover:bg-moody-primaryHover transition-all shadow-sm active:scale-95 shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.features.roadmapProposeBtn}</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5 pb-3 border-b border-moody-oat/60 dark:border-moody-surfaceHoverDark">
            {[
              { id: "all", label: t.features.roadmapFilterAll },
              { id: "in_progress", label: t.features.roadmapFilterInProgress },
              { id: "planned", label: t.features.roadmapFilterPlanned },
              { id: "shipped", label: t.features.roadmapFilterShipped },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filter === f.id
                    ? "bg-moody-textPrimary text-white dark:bg-moody-textPrimaryDark dark:text-moody-textPrimary"
                    : "bg-moody-surface dark:bg-moody-surfaceDark text-moody-textSecondary hover:text-moody-textPrimary dark:hover:text-moody-textPrimaryDark border border-moody-oat/50 dark:border-moody-surfaceHoverDark"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Feature List / Real Clean Dynamic State */}
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-moody-textSecondary">
              <Loader2 className="w-5 h-5 animate-spin text-moody-primary" />
              <span className="text-xs">Consultando roadmap de LandingJ4F...</span>
            </div>
          ) : filteredFeatures.length === 0 ? (
            <div className="py-10 px-4 rounded-2xl bg-moody-surface/60 dark:bg-moody-surfaceDark/60 border border-dashed border-moody-oat dark:border-moody-surfaceHoverDark text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-moody-primary/10 text-moody-primary dark:text-moody-primaryDark flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1">
                  {t.features.roadmapEmptyTitle}
                </h4>
                <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark max-w-md mx-auto">
                  {t.features.roadmapEmptySubtitle}
                </p>
              </div>
              <button
                onClick={() => setIsProposing(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moody-primary text-white text-xs font-bold hover:bg-moody-primaryHover transition-all shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>{t.features.roadmapProposeBtn}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {filteredFeatures.map((feat) => (
                <div
                  key={feat.id}
                  className="p-3.5 md:p-4 rounded-xl bg-moody-surface dark:bg-moody-surfaceDark border border-moody-oat/60 dark:border-moody-surfaceHoverDark flex items-center justify-between gap-3 hover:border-moody-primary/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs md:text-sm font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark">
                        {feat.title}
                      </span>
                      {getStatusBadge(feat.status)}
                    </div>
                  </div>

                  {/* Vote Button */}
                  <button
                    onClick={() => handleVote(feat.id)}
                    disabled={votingId === feat.id}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 active:scale-95 ${
                      feat.has_voted
                        ? "bg-moody-primary text-white hover:bg-moody-primaryHover shadow-xs"
                        : "bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark text-moody-textPrimary dark:text-moody-textPrimaryDark border border-moody-oat/60 dark:border-moody-surfaceHoverDark hover:border-moody-primary"
                    }`}
                  >
                    {votingId === feat.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <ThumbsUp className={`w-3 h-3 ${feat.has_voted ? "fill-current" : ""}`} />
                    )}
                    <span>{feat.votes}</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Propose Feature Modal */}
      {isProposing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg bg-moody-surface dark:bg-moody-surfaceDark rounded-3xl border border-moody-oat dark:border-moody-surfaceContainerDark shadow-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-moody-textPrimary dark:text-moody-textPrimaryDark mb-1">
              {t.features.roadmapProposeBtn}
            </h3>
            <p className="text-xs text-moody-textSecondary dark:text-moody-textSecondaryDark mb-4">
              Tu idea será revisada y conectada directamente a LandingJ4F.
            </p>

            {proposeSuccess ? (
              <div className="p-5 rounded-xl bg-moody-primary/15 text-center text-moody-primary dark:text-moody-primaryDark font-bold text-xs">
                {t.features.roadmapProposeSuccess}
              </div>
            ) : (
              <form onSubmit={handleProposeSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1">
                    Título de la función
                  </label>
                  <input
                    type="text"
                    required
                    value={proposeTitle}
                    onChange={(e) => setProposeTitle(e.target.value)}
                    placeholder={t.features.roadmapProposePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat dark:border-moody-surfaceHoverDark text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark focus:outline-none focus:border-moody-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-moody-textSecondary dark:text-moody-textSecondaryDark mb-1">
                    ¿Por qué te ayudaría en tu bienestar? (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={proposeDetails}
                    onChange={(e) => setProposeDetails(e.target.value)}
                    placeholder="Describe brevemente cómo te gustaría usarla..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat dark:border-moody-surfaceHoverDark text-xs text-moody-textPrimary dark:text-moody-textPrimaryDark focus:outline-none focus:border-moody-primary resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsProposing(false)}
                    className="px-3.5 py-2 rounded-lg font-medium text-xs text-moody-textSecondary hover:text-moody-textPrimary"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingPropose || !proposeTitle.trim()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-moody-primary text-white font-bold text-xs hover:bg-moody-primaryHover transition-all shadow-sm disabled:opacity-50"
                  >
                    {isSubmittingPropose ? (
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
      )}
    </div>
  );
}
