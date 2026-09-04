"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useApp } from "@/context/AppContext";

const LABELS = {
  uz: "Tepaga chiqish",
  ru: "Наверх",
  en: "Back to top",
} as const;

/**
 * Sahifani tepaga qaytarish tugmasi.
 *
 * Bir ekran pastga tushilgandan keyin paydo bo'ladi va AI yordamchi tugmasi
 * ustida turadi (ikkalasi bitta ustunda joylashadi).
 */
export default function ScrollToTop() {
  const { language } = useApp();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label = LABELS[language] ?? LABELS.uz;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        })
      }
      aria-label={label}
      title={label}
      className={`fixed bottom-27 right-5 z-[89] h-12 w-12 rounded-full bg-white dark:bg-slate-800 text-brand-900 dark:text-brand-300 border border-mist-200 dark:border-slate-700 shadow-[0_10px_28px_-12px_rgb(15_30_107/0.55)] flex items-center justify-center transition-all duration-300 hover:bg-brand-900 hover:text-white hover:border-brand-900 active:scale-95 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
