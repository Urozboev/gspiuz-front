"use client";

import { useApp } from "@/context/AppContext";
import { translations } from "@/locales/translations";
import { pages } from "@/locales/pages";

/**
 * Qulaylik hooki: joriy tildagi barcha tarjima lug'atlarini qaytaradi.
 *  - `t`  → asosiy tarjimalar (translations.ts)
 *  - `p`  → sahifa/UI tarjimalari (pages.ts)
 *  - `lang` → joriy til kodi
 */
export function useT() {
  const { language } = useApp();
  return { t: translations[language], p: pages[language], lang: language };
}
