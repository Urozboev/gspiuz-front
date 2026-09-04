"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, Calendar } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Journal } from "@/lib/types";
import { pickImage, formatDate } from "@/lib/format";
import Container from "@/components/ui/Container";
import RemoteImage from "@/components/ui/RemoteImage";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

export default function JournalDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { p, lang } = useT();
  const { data: j, loading, error, notFound, refetch } = useApi<Journal>(`/journals/${slug}`);

  return (
    <div className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28">
      <Container>
        <Link href="/journals" className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 mb-10 transition-colors">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {p.titles.journals}
        </Link>

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !j ? (
          <EmptyState title={p.common.notFound} description={p.common.notFoundDesc} />
        ) : (
          <article className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 relative min-h-64 bg-mist-200 dark:bg-slate-800">
              <RemoteImage src={pickImage(j.photo, "lg")} alt={j.title || ""} className="h-full w-full object-cover" />
            </div>
            <div className="lg:col-span-8 p-6 sm:p-10">
              <div className="flex items-center gap-4 text-sm text-ink-400 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(j.date, lang)}
                </span>
                {j.views_count != null && (
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {j.views_count} {p.common.views}
                  </span>
                )}
              </div>
              <h1 className="display-3 text-ink-900 dark:text-white mb-5">
                {j.title}
              </h1>
              {j.desc && (
                <div className="article-content text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: j.desc }} />
              )}
            </div>
          </article>
        )}
      </Container>
    </div>
  );
}
