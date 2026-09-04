"use client";

import { useState } from "react";
import { FileText, FileDown, ExternalLink, Calendar } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Paginated, DocumentItem, DocumentCategory } from "@/lib/types";
import { formatDate } from "@/lib/format";
import PageHero from "@/components/ui/PageHero";
import { PageBody } from "@/components/ui/InfoBlocks";
import { usePageBlocks } from "@/hooks/usePageBlocks";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

export default function DocumentsPage() {
  const { p, lang } = useT();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string | null>(null);

  // Turkumlar backenddan keladi; bo'sh bo'lsa filtr paneli ko'rsatilmaydi.
  const { data: catsRes } = useApi<{ data: DocumentCategory[] }>("/document-categories");

  // Sahifa kirish matni admin paneldan keladi (GET /pages/documents).
  const { page: cmsPage } = usePageBlocks("documents");
  const categories = catsRes?.data ?? [];

  const { data, loading, error, notFound, refetch } = useApi<Paginated<DocumentItem>>(
    "/documents",
    { page, category },
  );
  const docs = data?.data ?? [];

  const selectCategory = (slug: string | null) => {
    setCategory(slug);
    setPage(1);
  };

  return (
    <>
      <PageHero
        title={p.titles.documents}
        subtitle={p.subtitles.documents}
        crumbs={[{ label: p.titles.documents }]}
        icon={<FileText className="w-7 h-7" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={cmsPage?.body} />

      <Container className="py-20 lg:py-28">
        {/* Turkum bo'yicha filtr */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              type="button"
              onClick={() => selectCategory(null)}
              className={`px-5 py-2.5 rounded-lg text-base transition-colors ${
                category === null
                  ? "bg-brand-900 text-white"
                  : "panel text-ink-600 dark:text-slate-300 hover:bg-mist-200 dark:hover:bg-slate-800"
              }`}
            >
              {p.common.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-lg text-base transition-colors ${
                  category === cat.slug
                    ? "bg-brand-900 text-white"
                    : "panel text-ink-600 dark:text-slate-300 hover:bg-mist-200 dark:hover:bg-slate-800"
                }`}
              >
                {cat.title}
                {typeof cat.documents_count === "number" && (
                  <span className="ml-2 text-sm opacity-60 tabular-nums">
                    {cat.documents_count}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || docs.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex flex-col gap-3">
              {docs.map((doc) => (
                <div
                  key={doc.id}
                  className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-accent-500 rounded-lg p-4 sm:p-5 flex items-center gap-4 transition-all"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl bg-brand-900/8 text-brand-900 dark:text-brand-300 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <h3 className="font-semibold text-sm text-ink-900 dark:text-white leading-snug line-clamp-2">
                      {doc.title}
                    </h3>
                    {doc.date && (
                      <span className="text-xs text-ink-400 font-semibold flex items-center gap-1 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(doc.date, lang)}
                      </span>
                    )}
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    {doc.link && (
                      <a
                        href={doc.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-mist-200 dark:bg-slate-800 text-ink-600 dark:text-ink-300 hover:bg-brand-800 hover:text-white transition-colors"
                        title={p.common.more}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {doc.file && (
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-800 text-white text-xs font-semibold transition-colors"
                      >
                        <FileDown className="w-4 h-4" />
                        <span className="hidden sm:inline">{p.common.download}</span>
                      </a>
                    )}
                  </div>
                </div>
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
      </Container>
    </>
  );
}
