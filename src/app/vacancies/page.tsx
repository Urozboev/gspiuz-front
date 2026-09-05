"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Paginated, Vacancy } from "@/lib/types";
import { formatDate, truncate } from "@/lib/format";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import Pagination from "@/components/ui/Pagination";
import { EmptyState, ErrorState, ListSkeleton } from "@/components/ui/States";

export default function VacanciesPage() {
  const { p, lang } = useT();
  const [page, setPage] = useState(1);
  const { data, loading, error, notFound, refetch } = useApi<Paginated<Vacancy>>(
    "/vacancies",
    { page },
  );
  const items = data?.data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.vacancies}
        subtitle={p.subtitles.vacancies}
        crumbs={[{ label: p.titles.vacancies }]}
        icon={<Briefcase className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <ListSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="reveal-stagger grid lg:grid-cols-2 gap-6">
              {items.map((v) => (
                <Link
                  key={v.id}
                  href={`/vacancies/${v.id}`}
                  className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-accent-500 rounded-lg p-6 flex flex-col gap-3 transition-all hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-base text-ink-900 dark:text-white group-hover:text-brand-900 dark:group-hover:text-brand-300 leading-snug">
                      {v.title}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-ink-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                  {v.desc && (
                    <p className="text-base text-ink-600 dark:text-slate-400 line-clamp-2">
                      {truncate(v.desc, 140)}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-400 mt-1">
                    {v.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-accent-500" />
                        {v.location}
                      </span>
                    )}
                    {v.date && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-accent-500" />
                        {formatDate(v.date, lang)}
                      </span>
                    )}
                    {v.price && (
                      <span className="px-2 py-0.5 rounded bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300">
                        {v.price}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {data && (
              <Pagination
                currentPage={data.current_page}
                lastPage={data.last_page}
                onChange={(np) => {
                  setPage(np);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </>
        )}
      </Section>
    </>
  );
}
