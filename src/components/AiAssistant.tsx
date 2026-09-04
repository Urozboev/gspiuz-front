"use client";

import { useState } from "react";
import Link from "next/link";
import { X, Sparkles, Send, ArrowRight } from "lucide-react";
import RobotIcon from "@/components/ui/RobotIcon";
import { useApp } from "@/context/AppContext";

const CONTENT = {
  uz: {
    name: "GSPI Bot",
    role: "AI Yordamchi",
    greeting: "Assalomu alaykum! Men GSPI virtual yordamchisiman. Sizga qanday yordam bera olaman?",
    suggestions: ["Qabul qanday o'tadi?", "Qanday yo'nalishlar bor?", "Hujjatlar ro'yxati"],
    start: "Suhbatni boshlash",
    placeholder: "Savolingizni yozing...",
  },
  ru: {
    name: "GSPI Bot",
    role: "AI Помощник",
    greeting: "Здравствуйте! Я виртуальный помощник ГГПИ. Чем могу помочь?",
    suggestions: ["Как проходит приём?", "Какие есть направления?", "Список документов"],
    start: "Начать чат",
    placeholder: "Напишите вопрос...",
  },
  en: {
    name: "GSPI Bot",
    role: "AI Assistant",
    greeting: "Hello! I'm the GSPI virtual assistant. How can I help you?",
    suggestions: ["How does admission work?", "What programs are there?", "List of documents"],
    start: "Start chat",
    placeholder: "Type your question...",
  },
};

/** Bosh sahifa va boshqa sahifalarda ko'rinadigan AI yordamchi widgeti. */
export default function AiAssistant() {
  const { language } = useApp();
  const c = CONTENT[language];
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-3">
      {open && (
        <div className="w-[330px] max-w-[calc(100vw-2.5rem)] rounded-xl bg-white dark:bg-slate-900 border border-mist-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="relative bg-brand-900 p-5 text-white">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-full bg-white/15 backdrop-blur flex items-center justify-center border border-white/20">
                <RobotIcon className="w-7 h-7" idPrefix="robot-panel" />
              </div>
              <div>
                <p className="font-semibold text-sm flex items-center gap-1">
                  {c.name}
                  <Sparkles className="w-3.5 h-3.5 text-accent-300" />
                </p>
                <p className="text-xs text-brand-100/75 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                  {c.role}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-5">
            <div className="bg-mist-100 dark:bg-slate-800 rounded-lg rounded-tl-sm p-3.5 text-xs text-ink-600 dark:text-ink-300 leading-relaxed">
              {c.greeting}
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {c.suggestions.map((s) => (
                <Link
                  key={s}
                  href="/faq"
                  className="group flex items-center justify-between gap-2 text-left px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-accent-500 hover:bg-brand-50 dark:hover:bg-blue-950/20 text-xs font-semibold text-ink-600 dark:text-ink-300 transition-all"
                >
                  {s}
                  <ArrowRight className="w-3.5 h-3.5 text-ink-400 group-hover:text-accent-500 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="mt-4 flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-semibold text-sm py-3 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
              {c.start}
            </Link>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="group relative h-16 w-16 rounded-full bg-brand-900 text-white shadow-[0_12px_32px_-10px_rgb(15_30_107/0.7)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label="AI yordamchi"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-brand-900 animate-ping opacity-20" />
        )}
        {open ? (
          <X className="w-6 h-6 relative" />
        ) : (
          <RobotIcon className="w-10 h-10 relative drop-shadow-sm" />
        )}
      </button>
    </div>
  );
}
