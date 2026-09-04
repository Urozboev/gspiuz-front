"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { Eye, Check, RefreshCw } from "lucide-react";
import { translations } from "@/locales/translations";

export default function AccessibilityMenu() {
  const { contrastMode, setContrastMode, fontSize, setFontSize, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[language];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        // Rang ota-elementdan meros olinadi — panel to'q fonda ham, oq fonda ham ishlaydi.
        className="flex min-h-11 items-center gap-2 px-3 py-2 sm:min-h-0 sm:py-1.5 text-sm font-medium hover:bg-white/10 rounded-lg transition-colors"
        title={t.accessibility.title}
      >
        <Eye className="w-4 h-4 shrink-0" />
        {/*
          Ko'zcha ikonkasi o'zi tushunarsiz — yozuv mobilda ham ko'rinadi.
          Tor ekranda qisqa variant ("Imkoniyatlar"), sm dan yuqorida to'liq nom.
        */}
        <span className="whitespace-nowrap sm:hidden">
          {t.accessibility.shortTitle}
        </span>
        <span className="hidden sm:inline whitespace-nowrap">
          {t.accessibility.title}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Overlay to close popover */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/*
            Mobilda panel viewportga biriktiriladi (fixed) — aks holda u tor
            ota-elementga nisbatan joylashib, ekrandan chiqib ketadi.
            sm dan boshlab odatdagi dropdown ko'rinishiga qaytadi.
          */}
          <div className="fixed inset-x-4 top-20 w-auto sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 sm:w-72 p-4 bg-white dark:bg-slate-900 border border-mist-200 dark:border-slate-800 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm">
                <Eye className="w-4 h-4 text-brand-900" />
                {t.accessibility.title}
              </h3>
              <button
                onClick={() => {
                  setContrastMode("normal");
                  setFontSize(100);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                title={t.accessibility.reset}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Appearance Contrast Section */}
            <div className="py-3.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                {t.accessibility.appearance}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {/* Normal Mode */}
                <button
                  onClick={() => setContrastMode("normal")}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${
                    contrastMode === "normal"
                      ? "border-accent-500 bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-full mb-1 text-xs border border-slate-300 dark:border-slate-600 font-semibold">
                    A
                  </span>
                  {t.accessibility.normal}
                  {contrastMode === "normal" && (
                    <Check className="absolute top-1 right-1 w-3 h-3 text-brand-900 dark:text-brand-300" />
                  )}
                </button>

                {/* Grayscale Mode */}
                <button
                  onClick={() => setContrastMode("grayscale")}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${
                    contrastMode === "grayscale"
                      ? "border-accent-500 bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-200 text-slate-800 rounded-full mb-1 text-xs border border-slate-400 font-semibold grayscale">
                    A
                  </span>
                  {t.accessibility.grayscale}
                  {contrastMode === "grayscale" && (
                    <Check className="absolute top-1 right-1 w-3 h-3 text-brand-900 dark:text-brand-300" />
                  )}
                </button>

                {/* Dark Mode */}
                <button
                  onClick={() => setContrastMode("dark")}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-medium transition-all ${
                    contrastMode === "dark"
                      ? "border-accent-500 bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300"
                      : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span className="w-6 h-6 flex items-center justify-center bg-slate-950 text-white rounded-full mb-1 text-xs border border-slate-700 font-semibold">
                    A
                  </span>
                  {t.accessibility.dark}
                  {contrastMode === "dark" && (
                    <Check className="absolute top-1 right-1 w-3 h-3 text-brand-900 dark:text-brand-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Font Sizer Section */}
            <div className="pt-3.5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                {t.accessibility.fontSize} ({fontSize}%)
              </span>
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() => setFontSize(fontSize - 10)}
                  disabled={fontSize <= 80}
                  className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-200 font-semibold rounded-lg text-sm transition-colors"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize(100)}
                  className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-lg text-xs transition-colors"
                >
                  100%
                </button>
                <button
                  onClick={() => setFontSize(fontSize + 10)}
                  disabled={fontSize >= 150}
                  className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50 text-slate-700 dark:text-slate-200 font-semibold rounded-lg text-sm transition-colors"
                >
                  A+
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
