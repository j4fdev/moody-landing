"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, Translations } from "./types";
import { es } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import { pt } from "./dictionaries/pt";

const dictionaries: Record<Locale, Translations> = {
  es,
  en,
  pt,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem("moody_locale") as Locale;
    if (saved && (saved === "es" || saved === "en" || saved === "pt")) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
      return;
    }
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    if (browserLang === "pt") {
      setLocaleState("pt");
      document.documentElement.lang = "pt";
    } else if (browserLang === "en") {
      setLocaleState("en");
      document.documentElement.lang = "en";
    } else {
      setLocaleState("es");
      document.documentElement.lang = "es";
    }
  }, []);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem("moody_locale", loc);
    document.documentElement.lang = loc;
  };

  const value = {
    locale,
    setLocale,
    t: dictionaries[locale] || es,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
