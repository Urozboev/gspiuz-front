"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Calendar, Wallet, Eye } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Vacancy } from "@/lib/types";
import { formatDate } from "@/lib/format";
import Container from "@/components/ui/Container";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

export default function VacancyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { p, lang } = useT();
  const { data: v, loading, error, notFound, refetch } = useApi<Vacancy>(`/vacancies/${id}`);

  const meta = v
    ? [
        v.location && { icon: MapPin, label: p.vacancy.location, value: v.location },
        v.week && { icon: Clock, label: p.vacancy.schedule, value: v.week },
        v.price && { icon: Wallet, label: p.vacancy.salary, value: v.price },
        v.date && { icon: Calendar, label: p.vacancy.posted, value: formatDate(v.date, lang) },
      ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[]
    : [];

  return (
    <div className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28">
      <Container className="max-w-4xl">
        <Link href="/vacancies" className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 mb-10 transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {p.titles.vacancies}
        </Link>

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !v ? (
          <EmptyState title={p.common.notFound} description={p.common.notFoundDesc} />
        ) : (
          <article className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-10 shadow-sm">
            <h1 className="display-2 text-ink-900 dark:text-white mb-2">
              {v.title}
            </h1>
            {v.views_count != null && (
              <span className="text-sm text-ink-400 flex items-center gap-1 mb-6">
                <Eye className="w-3.5 h-3.5" />
                {v.views_count} {p.common.views}
              </span>
            )}

            {meta.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {meta.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 bg-mist-100 dark:bg-slate-800/60 rounded-xl p-4">
                    <m.icon className="w-5 h-5 text-accent-500 shrink-0" />
                    <div>
                      <p className="text-sm text-ink-400">{m.label}</p>
                      <p className="text-sm font-semibold text-ink-900 dark:text-slate-100">{m.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {v.desc && (
              <div className="article-content text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: v.desc }} />
            )}

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold transition-colors"
            >
              {p.common.apply}
            </Link>
          </article>
        )}
      </Container>
    </div>
  );
}
