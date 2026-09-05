import React from "react";
import { Inbox, AlertTriangle } from "lucide-react";

/**
 * Skeletning bitta bo'lagi.
 *
 * Skeletlar haqiqiy kontent shakliga o'xshashi kerak — aks holda kontent
 * kelganda sahifa "sakraydi" va bu spinnerdan ham bezovta qiladi.
 */
export function Bar({ className = "" }: { className?: string }) {
  return <div className={`rounded bg-mist-200 dark:bg-slate-800 ${className}`} />;
}

/** Karta shaklidagi skelet — yangilik va shunga o'xshash kartochkalar uchun. */
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden animate-pulse">
      <div className="h-52 bg-mist-200 dark:bg-slate-800" />
      <div className="p-7 space-y-4">
        <Bar className="h-3 w-24" />
        <Bar className="h-5 w-full" />
        <Bar className="h-5 w-3/4" />
        <Bar className="h-4 w-1/3 mt-2" />
      </div>
    </div>
  );
}

/** Xodim kartochkasi skeleti — portret + ism + lavozim. */
export function StaffCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden animate-pulse">
      <div className="h-64 bg-mist-200 dark:bg-slate-800" />
      <div className="p-6 space-y-3">
        <Bar className="h-3 w-28" />
        <Bar className="h-5 w-4/5" />
        <Bar className="h-4 w-1/2" />
      </div>
    </div>
  );
}

/** Xodimlar to'ri skeleti. */
export function StaffGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <StaffCardSkeleton key={i} />
      ))}
    </div>
  );
}

/** Ro'yxat qatorlari skeleti — hujjatlar, fayllar, havolalar uchun. */
export function ListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-900 rounded-xl p-6 flex items-center gap-5 animate-pulse"
        >
          <Bar className="h-12 w-12 shrink-0 rounded-lg" />
          <div className="flex-grow space-y-2.5">
            <Bar className="h-5 w-2/3" />
            <Bar className="h-3.5 w-1/4" />
          </div>
          <Bar className="hidden sm:block h-4 w-24 shrink-0" />
        </div>
      ))}
    </div>
  );
}

/**
 * Matnli sahifa skeleti — sarlavha va bir nechta paragraf.
 * Qatorlar uzunligi har xil, chunki haqiqiy matn ham shunday.
 */
export function ArticleSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-12 animate-pulse">
      <Bar className="h-8 w-2/3" />
      <div className="mt-8 space-y-3.5 max-w-3xl">
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-11/12" />
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-4/5" />
        <Bar className="h-4 w-full" />
        <Bar className="h-4 w-2/3" />
      </div>
    </div>
  );
}

/** Detal sahifasi skeleti — muqova rasmi, sarlavha, matn. */
export function DetailSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden animate-pulse">
      <div className="h-72 sm:h-96 bg-mist-200 dark:bg-slate-800" />
      <div className="p-8 sm:p-12">
        <Bar className="h-3.5 w-32" />
        <Bar className="mt-5 h-9 w-3/4" />
        <div className="mt-9 space-y-3.5 max-w-3xl">
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-11/12" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-3/5" />
        </div>
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
