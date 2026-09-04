"use client";

import { useState } from "react";
import { Megaphone } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { sectionPages } from "@/locales/sections";
import type { Paginated, Post } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import NewsCard from "@/components/cards/NewsCard";
import Pagination from "@/components/ui/Pagination";
import { Spinner, ErrorState } from "@/components/ui/States";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/**
 * E'lonlar.
 *
 * Backenddagi "elonlar" turkumi bo'yicha filtrlangan postlar.
 */
export default function AnnouncementsPage() {
  const { language } = useApp();
  // Sahifa matni admin paneldan keladi (GET /pages/announcements).
  const { page: cmsPage } = usePageBlocks("announcements");

  const dict = sectionPages[language];
  const [page, setPage] = useState(1);

  const { data, loading, error, notFound, refetch } = useApi<Paginated<Post>>(
    "/news",
    { page, category: "elonlar" },
  );
  const items = data?.data ?? [];

  return (
    <>
      <PageHero
        title={dict.announcements.title}
        subtitle={dict.announcements.subtitle}
        crumbs={[{ label: dict.announcements.title }]}
        icon={<Megaphone className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={cmsPage?.body} />

      <Section tone="mist">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || items.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
            {data && data.last_page > 1 && (
              <div className="mt-14">
                <Pagination
                  currentPage={page}
                  lastPage={data.last_page}
                  onChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
}
