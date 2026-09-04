"use client";

import { FlaskConical } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { sectionPages } from "@/locales/sections";
import { usePageBlocks, blockToFeature } from "@/hooks/usePageBlocks";
import type { Paginated, Journal } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, FeatureGrid, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import { formatDate } from "@/lib/format";
import Link from "next/link";

/** Ilmiy faoliyat — kengashlar, jurnallar, laboratoriyalar va to'garaklar. */
export default function ResearchPage() {
  const { p, lang } = useT();
  const { language } = useApp();
  const dict = sectionPages[language];

  const { data: journalsRes, notFound } = useApi<Paginated<Journal>>("/journals");
  const journals = journalsRes?.data ?? [];

  // Bloklar admin paneldan keladi (GET /pages/research).
  const { blocks, page } = usePageBlocks("research");
  const areas = blocks.map(blockToFeature);

  return (
    <>
      <PageHero
        title={dict.research.title}
        subtitle={dict.research.subtitle}
        crumbs={[{ label: dict.research.title }]}
        icon={<FlaskConical className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelda "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {areas.length > 0 && (
        <Section>
          <FeatureGrid items={areas} columns={3} tone="mist" />
        </Section>
      )}

      <Section tone="mist">
        <h2 className="display-3 text-ink-900 dark:text-white mb-10">
          {p.titles.journals}
        </h2>
        {notFound || journals.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journals.map((journal) => (
              <Link
                key={journal.id}
                href={`/journals/${journal.slug ?? journal.id}`}
                className="lift bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col"
              >
                <h3 className="text-xl font-semibold text-ink-900 dark:text-white leading-snug">
                  {journal.title}
                </h3>
                {journal.date && (
                  <p className="mt-4 text-sm text-ink-400">
                    {formatDate(journal.date, lang)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
