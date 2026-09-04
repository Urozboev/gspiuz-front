import React from "react";
import { Loader2, Inbox, AlertTriangle } from "lucide-react";

/** Yuklanish spinneri (markazlashtirilgan). */
export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center py-20 ${className}`}>
      <Loader2 className="w-8 h-8 text-accent-500 animate-spin" />
    </div>
  );
}

/** Karta shaklidagi skelet (yuklanish paytida). */
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-mist-200 dark:border-slate-800 rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-200 dark:bg-slate-800" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
      </div>
    </div>
  );
}

/** Bir nechta karta skeletlari to'ri. */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Ma'lumot yo'q holati. */
export function EmptyState({
  title = "Ma'lumot topilmadi",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-lg bg-mist-200 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Inbox className="w-8 h-8 text-ink-400" />
      </div>
      <h3 className="text-base font-semibold text-ink-600 dark:text-ink-300">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-400 max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
}

/** Xatolik holati + qayta urinish tugmasi. */
export function ErrorState({
  message = "Ma'lumotlarni yuklab bo'lmadi",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-lg bg-red-50 dark:bg-red-950/30 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-ink-600 dark:text-ink-300">{message}</h3>
      <p className="mt-1.5 text-sm text-ink-600 dark:text-ink-400 max-w-sm">
        Iltimos, internet aloqangizni tekshiring yoki keyinroq qayta urinib ko'ring.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold transition-colors"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
}
