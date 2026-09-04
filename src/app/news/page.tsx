"use client";

import { useState } from "react";
import Link from "next/link";
import { Newspaper, PlayCircle } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Paginated, Post, Category } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import NewsCard from "@/components/cards/NewsCard";
import Pagination from "@/components/ui/Pagination";
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/ui/States";

export default function NewsPage() {
  const { p } = useT();
  const [page, setPage] = useState(1);

  const { data, loading, error, notFound, refetch } = useApi<Paginated<Post>>(
    "/news",
    { page },
  );
  const { data: catsRes } = useApi<Paginated<Category>>("/categories");
  const categories = catsRes?.data ?? [];

  const posts = data?.data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.news}
        subtitle={p.subtitles.news}
        crumbs={[{ label: p.titles.news }]}
        icon={<Newspaper className="w-6 h-6" />}
      />

      <Section tone="mist">
        <div className="flex flex-wrap items-center gap-2 mb-12">
          <span className="px-5 py-2.5 text-base rounded-lg bg-brand-900 text-white">
            {p.common.all}
          </span>
          {categories.slice(0, 8).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="px-5 py-2.5 text-base rounded-lg text-ink-600 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-mist-200 dark:hover:bg-slate-700 transition-colors"
            >
              {cat.title}
            </Link>
          ))}
          <Link
            href="/news/video"
            className="ml-auto inline-flex items-center gap-2 px-5 py-2.5 text-base font-semibold rounded-lg text-brand-900 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-950/60 transition-colors"
          >
            <PlayCircle className="w-4 h-4" />
            {p.titles.videoNews}
          </Link>
        </div>

        {loading ? (
          <CardGridSkeleton count={9} />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
            {data && (
              <Pagination
                currentPage={data.current_page}
                lastPage={data.last_page}
                onChange={(newPage) => {
                  setPage(newPage);
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
