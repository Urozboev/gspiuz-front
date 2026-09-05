"use client";

import { Users } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { sectionPages } from "@/locales/sections";
import type { Paginated, DocumentItem } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, DocumentList, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import { ListSkeleton } from "@/components/ui/States";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/** Kengashlar — tarkib va qarorlar hujjatlar ro'yxati orqali beriladi. */
export default function CouncilsPage() {
  const { language } = useApp();
  // Sahifa matni admin paneldan keladi (GET /pages/councils).
  const { page } = usePageBlocks("councils");

  const dict = sectionPages[language];
  const { data, loading, notFound } = useApi<Paginated<DocumentItem>>("/documents", { category: "nizomlar" });
  const docs = data?.data ?? [];

  return (
    <>
      <PageHero
        title={dict.councils.title}
        subtitle={dict.councils.subtitle}
        crumbs={[{ label: dict.councils.title }]}
        icon={<Users className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      <Section tone="mist">
        {loading ? (
          <ListSkeleton />
        ) : notFound || docs.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <>
            <h2 className="display-3 text-ink-900 dark:text-white mb-10">
              {dict.labels.documents}
            </h2>
            <DocumentList items={docs} />
          </>
        )}
      </Section>
    </>
  );
}
