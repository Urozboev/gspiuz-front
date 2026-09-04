"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useApp, type Language } from "@/context/AppContext";
import { LanguageFlag } from "./FlagIcons";

const LANGS: { code: Language; label: string; short: string }[] = [
  { code: "uz", label: "O'zbekcha", short: "Uz" },
  { code: "ru", label: "Русский", short: "Ru" },
  { code: "en", label: "English", short: "En" },
];

/** Bayroqli til tanlagich — yuqori paneldagi dropdown. */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useApp();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Tashqariga bosilganda yoki Esc bosilganda yopiladi.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = LANGS.find((l) => l.code === language) ?? LANGS[0];

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-brand-100/90 hover:text-white hover:bg-white/10 transition-colors"
      >
        <LanguageFlag lang={current.code} className="w-6 h-4 rounded-xs shadow-sm" />
        <span className="text-sm font-medium">{current.short}</span>
        <ChevronDown
          className={`w-4 h-4 text-brand-200/60 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-2 w-48 py-1.5 bg-white dark:bg-slate-900 rounded-lg shadow-2xl z-50 animate-fade-in-up"
        >
          {LANGS.map((item) => {
            const isActive = item.code === language;
            return (
              <li key={item.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => {
                    setLanguage(item.code);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive
                      ? "text-brand-900 dark:text-brand-300"
                      : "text-ink-600 dark:text-slate-300 hover:bg-mist-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <LanguageFlag lang={item.code} className="w-6 h-4 rounded-xs" />
                  <span className="text-base">{item.label}</span>
                  {isActive && <Check className="w-4 h-4 ml-auto" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
