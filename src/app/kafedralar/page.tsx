"use client";

import Link from "next/link";
import { Network, ArrowRight } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { localized } from "@/lib/format";
import type { Department } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { EmptyState, ErrorState, CardGridSkeleton } from "@/components/ui/States";

export default function ChairsPage() {
  const { p } = useT();
  const { language } = useApp();
  const { data, loading, error, notFound, refetch } = useApi<Department[]>("/kafedralar");
  const items = data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.chairs}
        subtitle={p.subtitles.chairs}
        crumbs={[{ label: p.titles.chairs }]}
        icon={<Network className="w-7 h-7" />}
      />

      <Container className="py-20 lg:py-28">
        {loading ? (
          <CardGridSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((chair) => (
              <Link
                key={chair.id}
                href={`/kafedralar/${chair.slug}`}
                className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-accent-500 rounded-lg p-6 flex items-center gap-4 transition-all hover:shadow-lg"
              >
                <div className="h-12 w-12 shrink-0 rounded-xl bg-brand-900/8 text-brand-900 dark:text-brand-300 flex items-center justify-center">
                  <Network className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sm text-ink-900 dark:text-white group-hover:text-brand-900 dark:group-hover:text-brand-300 leading-snug flex-grow">
                  {localized(chair.name, language)}
                </h3>
                <ArrowRight className="w-4 h-4 text-ink-300 group-hover:text-accent-500 group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
