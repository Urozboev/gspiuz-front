"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GraduationCap, ArrowRight, Clock, Hash } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { EducationalProgram } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

/**
 * Ta'lim yo'nalishlari.
 *
 * Menyuda "Bakalavriat" va "Magistratura" alohida bandlar bo'lgani uchun
 * sahifa `?level=` parametrini qabul qiladi va backendga uzatadi.
 * Parametr berilmasa hamma darajalar ko'rsatiladi.
 */
function ProgramsContent() {
  const { p } = useT();
  const searchParams = useSearchParams();

  // Faqat kutilgan qiymatlarni o'tkazamiz — tasodifiy matn backendga bormasin.
  const raw = searchParams.get("level");
  const level = raw === "bachelor" || raw === "master" ? raw : undefined;

  const { data, loading, error, notFound, refetch } = useApi<EducationalProgram[]>(
    "/educational-programs",
    level ? { level } : undefined,
  );
  const groups = data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.programs}
        subtitle={p.subtitles.programs}
        crumbs={[{ label: p.titles.programs }]}
        icon={<GraduationCap className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-14">
            {groups.map((group) => {
              /*
               * Yo'nalishlar ikki bosqichli bo'lishi mumkin (soha → yo'nalishlar),
               * lekin admin ularni tekis ro'yxat sifatida ham kiritishi mumkin.
               * Ichki yozuvi bo'lmasa, yozuvning o'zi yo'nalish sifatida chiziladi —
               * aks holda u sahifada umuman ko'rinmay qolardi.
               */
              const children = group.children?.length ? group.children : [group];
              const grouped = Boolean(group.children?.length);
              return (
                <div key={group.id}>
                  {grouped && (
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-1.5 w-10 rounded-full bg-accent-500" />
                      <h2 className="text-xl font-semibold text-ink-900 dark:text-white">
                        {group.name}
                      </h2>
                      <span className="text-sm text-ink-400">
                        {children.length} {p.programs.directions}
                      </span>
                    </div>
                  )}
                  <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {children.map((child) => (
                      <Link
                        key={child.id}
                        href={`/educational-programs/${child.slug || child.id}`}
                        className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-accent-500 rounded-lg p-6 flex flex-col gap-3 transition-all hover:shadow-lg"
                      >
                        <div className="h-11 w-11 rounded-xl bg-brand-900/8 text-brand-900 dark:text-brand-300 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-sm text-ink-900 dark:text-white group-hover:text-brand-900 dark:group-hover:text-brand-300 leading-snug line-clamp-2 min-h-[2.5rem]">
                          {child.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-ink-400 mt-auto pt-3 border-t border-mist-200 dark:border-slate-800/60">
                          {child.code && (
                            <span className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              {child.code}
                            </span>
                          )}
                          {child.education_years && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {child.education_years} {p.programs.years}
                            </span>
                          )}
                          <ArrowRight className="w-4 h-4 ml-auto text-accent-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}

/*
 * `useSearchParams` Suspense chegarasini talab qiladi — aks holda
 * butun sahifa klient tomonda render bo'lib qoladi.
 */
export default function ProgramsPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <ProgramsContent />
    </Suspense>
  );
}
