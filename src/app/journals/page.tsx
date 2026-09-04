"use client";

import { useState } from "react";
import Link from "next/link";
import { BookText, ArrowRight, Eye } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Paginated, Journal } from "@/lib/types";
import { pickImage, truncate } from "@/lib/format";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import RemoteImage from "@/components/ui/RemoteImage";
import Pagination from "@/components/ui/Pagination";
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/ui/States";

export default function JournalsPage() {
  const { p } = useT();
  const [page, setPage] = useState(1);
  const { data, loading, error, notFound, refetch } = useApi<Paginated<Journal>>(
    "/journals",
    { page },
  );
  const items = data?.data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.journals}
        subtitle={p.subtitles.journals}
        crumbs={[{ label: p.titles.journals }]}
        icon={<BookText className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <CardGridSkeleton count={6} />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((j) => (
                <article
                  key={j.id}
                  className="group bg-white dark:bg-slate-900 border border-mist-200 dark:border-slate-800 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
                >
                  <Link href={`/journals/${j.slug}`} className="relative h-52 w-full bg-mist-100 dark:bg-slate-800 block">
                    <RemoteImage src={pickImage(j.photo, "md")} alt={j.title || ""} className="h-full w-full object-cover" />
                  </Link>
                  <div className="p-6 flex flex-col flex-grow gap-2">
                    <h3 className="font-semibold text-sm text-ink-900 dark:text-white leading-snug line-clamp-2">
                      <Link href={`/journals/${j.slug}`} className="hover:text-brand-900 dark:hover:text-brand-300">
                        {j.title}
                      </Link>
                    </h3>
                    {j.desc && (
                      <p className="text-base text-ink-600 dark:text-slate-400 line-clamp-3">
                        {truncate(j.desc, 120)}
                      </p>
                    )}
                    <div className="mt-auto pt-3 flex items-center justify-between border-t border-mist-200 dark:border-slate-800/60">
                      <Link href={`/journals/${j.slug}`} className="text-sm font-semibold text-brand-900 dark:text-brand-300 inline-flex items-center gap-1">
                        {p.common.readMore}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      {j.views_count != null && (
                        <span className="text-sm text-ink-400 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {j.views_count}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
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
