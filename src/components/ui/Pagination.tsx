"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onChange: (page: number) => void;
}

/** Sahifalash boshqaruvi (paginate javoblari uchun). */
export default function Pagination({ currentPage, lastPage, onChange }: PaginationProps) {
  if (lastPage <= 1) return null;

  // Ko'rsatiladigan sahifa raqamlarini hisoblash (joriy atrofida).
  const pages: (number | "...")[] = [];
  const push = (p: number | "...") => pages.push(p);

  push(1);
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(lastPage - 1, currentPage + 1);
  if (start > 2) push("...");
  for (let i = start; i <= end; i++) push(i);
  if (end < lastPage - 1) push("...");
  if (lastPage > 1) push(lastPage);

  const btnBase =
    "min-w-9 h-9 px-2 inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors";

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-12 flex-wrap">
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${btnBase} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-ink-600 dark:text-ink-300 hover:border-accent-500 disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Oldingi sahifa"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`dots-${idx}`} className="px-1.5 text-ink-400">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`${btnBase} ${
              p === currentPage
                ? "bg-brand-900 text-white shadow-md "
                : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-ink-600 dark:text-ink-300 hover:border-accent-500"
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= lastPage}
        className={`${btnBase} bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-ink-600 dark:text-ink-300 hover:border-accent-500 disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label="Keyingi sahifa"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
