"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw, TriangleAlert } from "lucide-react";
import { useT } from "@/hooks/useT";
import Container from "@/components/ui/Container";

/**
 * Sahifa darajasidagi xato chegarasi.
 * Prodda foydalanuvchiga texnik tafsilotlar ko'rsatilmaydi.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { p } = useT();

  useEffect(() => {
    // Serverdagi log bilan bog'lash uchun digest konsolga chiqariladi.
    console.error("Sahifa xatosi:", error.digest ?? error.message);
  }, [error]);

  return (
    <Container className="py-24 lg:py-32">
      <div className="flex flex-col items-center text-center">
        <div className="h-20 w-20 rounded-xl bg-brand-900/8 text-brand-900 dark:text-brand-300 flex items-center justify-center mb-6">
          <TriangleAlert className="w-10 h-10" />
        </div>
        <h1 className="text-xl font-semibold text-ink-900 dark:text-slate-100">
          {p.common.error}
        </h1>
        <p className="mt-2 text-sm text-ink-600 dark:text-ink-400 max-w-sm">
          {p.common.errorDesc}
        </p>
        {error.digest && (
          <p className="mt-3 text-xs text-ink-400 font-mono">{error.digest}</p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {p.common.retry}
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 panel rounded-xl text-ink-900 dark:text-slate-100 font-semibold text-sm px-6 py-3.5 hover:bg-mist-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            {p.common.backHome}
          </Link>
        </div>
      </div>
    </Container>
  );
}
