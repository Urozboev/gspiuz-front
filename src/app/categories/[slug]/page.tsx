"use client";

import { use, useState } from "react";
import { FolderOpen } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { CategoryWithPosts } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import NewsCard from "@/components/cards/NewsCard";
import Pagination from "@/components/ui/Pagination";
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/ui/States";

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { p } = useT();
  const [page, setPage] = useState(1);

  // slug o'zgarsa sahifani 1-ga tiklash (oldingi qiymatni state'da saqlash —
  // React tavsiya etgan "previous value" usuli, effektsiz).
  const [trackedSlug, setTrackedSlug] = useState(slug);
  if (trackedSlug !== slug) {
    setTrackedSlug(slug);
    setPage(1);
  }

  const { data, loading, error, notFound, refetch } = useApi<CategoryWithPosts>(
    `/categories/${slug}`,
    { page },
  );

  const posts = data?.posts?.data ?? [];
  const title = data?.category?.title || p.titles.news;

  return (
    <>
      <PageHero
        title={title}
        crumbs={[{ label: p.titles.news, href: "/news" }, { label: title }]}
        icon={<FolderOpen className="w-6 h-6" />}
        subtitle={data?.category?.desc || undefined}
      />

      <Container className="py-20 lg:py-28">
        {loading ? (
          <CardGridSkeleton count={9} />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
            {data?.posts && (
              <Pagination
                currentPage={data.posts.current_page}
                lastPage={data.posts.last_page}
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
