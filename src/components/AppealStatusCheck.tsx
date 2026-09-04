"use client";

import { useState, FormEvent } from "react";
import { Search, Loader2, FileText, CalendarDays } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { apiFetch, ApiError } from "@/lib/api";
import { endpoints } from "@/lib/endpoints";
import { appeal as appealDict } from "@/locales/sections";
import { formatDate } from "@/lib/format";
import type { Appeal, AppealStatus } from "@/lib/types";

/** Holat rangi — javob berilgan yashil, rad etilgan qizil, qolgani ko'k. */
const STATUS_STYLES: Record<AppealStatus, string> = {
  new: "bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300",
  in_review: "bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300",
  answered: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-400",
  rejected: "bg-red-500/12 text-red-600 dark:text-red-400",
};

/** Ariza raqami bo'yicha murojaat holatini tekshirish. */
export default function AppealStatusCheck() {
  const { language } = useApp();
  const dict = appealDict[language];

  const [ticket, setTicket] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "found" | "missing" | "error">(
    "idle",
  );
  const [result, setResult] = useState<Appeal | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const value = ticket.trim();
    if (!value) return;

    setState("loading");
    setResult(null);

    try {
      const res = await apiFetch<{ data: Appeal }>(endpoints.appeal(value), {
        lang: language,
      });
      setResult(res.data);
      setState("found");
    } catch (err) {
      setState(err instanceof ApiError && err.status === 404 ? "missing" : "error");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          placeholder={dict.checkPlaceholder}
          className="flex-grow px-5 py-3.5 rounded-lg bg-white/10 border border-white/20 text-base text-white placeholder:text-brand-200/50 focus:outline-none focus:border-accent-400 focus:ring-4 focus:ring-accent-500/20 transition-all"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center gap-3 bg-accent-500 hover:bg-accent-400 disabled:opacity-60 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors shrink-0"
        >
          {state === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              {dict.checking}
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {dict.check}
            </>
          )}
        </button>
      </form>

      {(state === "missing" || state === "error") && (
        <p className="mt-5 text-base text-red-300">{dict.notFound}</p>
      )}

      {state === "found" && result && (
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-xl p-8">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <span className="font-display text-2xl font-semibold text-ink-900 dark:text-white tabular-nums tracking-tight">
              {result.ticket}
            </span>
            <span
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${STATUS_STYLES[result.status]}`}
            >
              {result.status_label}
            </span>
          </div>

          <dl className="mt-7 pt-7 border-t border-mist-200 dark:border-slate-800 grid sm:grid-cols-2 gap-6">
            {result.type_label && (
              <div>
                <dt className="text-sm text-ink-400">{dict.status}</dt>
                <dd className="mt-1 text-base text-ink-900 dark:text-slate-100">
                  {result.type_label}
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-ink-400 flex items-center gap-1.5">
                <CalendarDays className="w-3.5 h-3.5" />
                {dict.submittedAt}
              </dt>
              <dd className="mt-1 text-base text-ink-900 dark:text-slate-100">
                {formatDate(result.created_at, language)}
              </dd>
            </div>
            {result.answered_at && (
              <div>
                <dt className="text-sm text-ink-400 flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {dict.answeredAt}
                </dt>
                <dd className="mt-1 text-base text-ink-900 dark:text-slate-100">
                  {formatDate(result.answered_at, language)}
                </dd>
              </div>
            )}
          </dl>

          <div className="mt-7 pt-7 border-t border-mist-200 dark:border-slate-800">
            <p className="text-sm text-ink-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              {dict.answer}
            </p>
            <p className="mt-3 text-base text-ink-600 dark:text-slate-400">
              {result.answer || dict.noAnswerYet}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
