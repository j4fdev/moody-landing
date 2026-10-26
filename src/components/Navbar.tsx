"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/i18n/context";
import { Locale } from "@/i18n/types";
import {
  Compass,
  Users,
  Sun,
  Moon,
  Globe,
  ShieldAlert,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface NavbarProps {
  activeTab: "features" | "waitlist";
  onTabChange: (tab: "features" | "waitlist") => void;
  onOpenCrisis: () => void;
}

export default function Navbar({ activeTab, onTabChange, onOpenCrisis }: NavbarProps) {
  const { locale, setLocale, t } = useI18n();
  const [isDark, setIsDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const isDarkStored = localStorage.getItem("moody_theme") === "dark";
    setIsDark(isDarkStored);
    if (isDarkStored) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("moody_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("moody_theme", "light");
    }
  };

  const handleLangChange = (loc: Locale) => {
    setLocale(loc);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-moody-surface/85 dark:bg-moody-surfaceDark/85 border-b border-moody-oat/70 dark:border-moody-surfaceContainerDark transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => onTabChange("features")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-2xl bg-moody-primary flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            {/* Organic river stone / squircle logo */}
            <div className="w-5 h-5 rounded-full border-2 border-white/90 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-moody-textPrimary dark:text-moody-textPrimaryDark">
              Moody
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-moody-textSecondary dark:text-moody-textSecondaryDark">
              {t.nav.brandSubtitle}
            </span>
          </div>
        </div>

        {/* Desktop Tab Switcher (The 2 main tabs) */}
        <div className="hidden md:flex items-center p-1.5 rounded-2xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/70 dark:border-moody-surfaceHoverDark shadow-inner">
          <button
            onClick={() => onTabChange("features")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "features"
                ? "bg-moody-surface dark:bg-moody-surfaceDark text-moody-primary dark:text-moody-primaryDark shadow-sm"
                : "text-moody-textSecondary hover:text-moody-textPrimary dark:hover:text-moody-textPrimaryDark"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.nav.tabFeatures}</span>
          </button>
          <button
            onClick={() => onTabChange("waitlist")}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "waitlist"
                ? "bg-moody-surface dark:bg-moody-surfaceDark text-moody-secondary dark:text-moody-secondaryDark shadow-sm"
                : "text-moody-textSecondary hover:text-moody-textPrimary dark:hover:text-moody-textPrimaryDark"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>{t.nav.tabWaitlist}</span>
          </button>
        </div>

        {/* Right Actions: Language Switcher, Theme, SOS */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Language Selector */}
          <div className="flex items-center p-1 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/60 dark:border-moody-surfaceHoverDark text-xs font-bold">
            {(["es", "en", "pt"] as Locale[]).map((loc) => (
              <button
                key={loc}
                onClick={() => handleLangChange(loc)}
                className={`px-2.5 py-1 rounded-lg uppercase text-[11px] transition-all ${
                  locale === loc
                    ? "bg-moody-primary text-white shadow-sm"
                    : "text-moody-textSecondary hover:text-moody-textPrimary dark:hover:text-moody-textPrimaryDark"
                }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark border border-moody-oat/60 dark:border-moody-surfaceHoverDark text-moody-textSecondary hover:text-moody-textPrimary dark:hover:text-moody-textPrimaryDark transition-all"
            aria-label={isDark ? t.nav.themeToggleLight : t.nav.themeToggleDark}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Crisis Button */}
          <button
            onClick={onOpenCrisis}
            className="p-2.5 rounded-xl bg-moody-secondary/15 dark:bg-moody-secondaryDark/20 text-moody-secondary dark:text-moody-secondaryDark hover:bg-moody-secondary/25 transition-all text-xs font-bold flex items-center gap-1.5"
            title="Líneas de ayuda en crisis"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden lg:inline text-[11px]">SOS</span>
          </button>

          {/* CTA Button */}
          {activeTab !== "waitlist" && (
            <button
              onClick={() => onTabChange("waitlist")}
              className="px-4 py-2 rounded-xl bg-moody-primary text-white text-xs font-bold hover:bg-moody-primaryHover transition-all shadow-sm active:scale-95"
            >
              {t.nav.joinWaitlistBtn}
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark text-moody-textSecondary"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark text-moody-textPrimary dark:text-moody-textPrimaryDark"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-moody-oat dark:border-moody-surfaceContainerDark bg-moody-surface dark:bg-moody-surfaceDark p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onTabChange("features");
                setMobileMenuOpen(false);
              }}
              className={`py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${
                activeTab === "features"
                  ? "bg-moody-primary text-white"
                  : "bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark text-moody-textPrimary dark:text-moody-textPrimaryDark"
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>{t.nav.tabFeatures}</span>
            </button>
            <button
              onClick={() => {
                onTabChange("waitlist");
                setMobileMenuOpen(false);
              }}
              className={`py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 ${
                activeTab === "waitlist"
                  ? "bg-moody-secondary text-white"
                  : "bg-moody-surfaceContainer dark:bg-moody-surfaceContainerDark text-moody-textPrimary dark:text-moody-textPrimaryDark"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>{t.nav.tabWaitlist}</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-moody-oat/50 dark:border-moody-surfaceContainerDark">
            <div className="flex items-center gap-1.5 text-xs font-bold">
              <Globe className="w-3.5 h-3.5 text-moody-textSecondary" />
              {(["es", "en", "pt"] as Locale[]).map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLangChange(loc)}
                  className={`px-2 py-1 rounded-lg uppercase text-[11px] font-bold ${
                    locale === loc
                      ? "bg-moody-primary text-white"
                      : "text-moody-textSecondary"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                onOpenCrisis();
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-xl bg-moody-secondary/15 text-moody-secondary text-xs font-bold flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>SOS Crisis</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
