"use client";

import { Globe } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { sectionPages } from "@/locales/sections";
import { usePageBlocks, blockToFeature } from "@/hooks/usePageBlocks";
import { pickImage } from "@/lib/format";
import type { Paginated, Partner } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, FeatureGrid, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import RemoteImage from "@/components/ui/RemoteImage";

/** Xalqaro hamkorlik — yo'nalishlar va hamkor tashkilotlar. */
export default function InternationalPage() {
  const { p } = useT();
  const { language } = useApp();
  const dict = sectionPages[language];

  const { data: partnersRes, notFound } = useApi<Paginated<Partner>>("/partners");
  const partners = partnersRes?.data ?? [];

  // Bloklar admin paneldan keladi (GET /pages/international).
  const { blocks, page } = usePageBlocks("international");
  const areas = blocks.map(blockToFeature);

  return (
    <>
      <PageHero
        title={dict.international.title}
        subtitle={dict.international.subtitle}
        crumbs={[{ label: dict.international.title }]}
        icon={<Globe className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelda "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {areas.length > 0 && (
        <Section>
          <FeatureGrid items={areas} columns={4} tone="mist" />
        </Section>
      )}

      <Section tone="mist">
        <h2 className="display-3 text-ink-900 dark:text-white mb-10">
          {p.titles.partners}
        </h2>
        {notFound || partners.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {partners.map((partner) => {
              const logo = pickImage(partner.photo, "sm");
              const content = (
                <div className="bg-white dark:bg-slate-900 rounded-xl h-32 flex items-center justify-center p-6">
                  <RemoteImage
                    src={logo}
                    alt={partner.title || ""}
                    className="max-h-16 max-w-full object-contain"
                    iconClassName="w-6 h-6"
                  />
                </div>
              );
              return partner.link ? (
                <a
                  key={partner.id}
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={partner.title || ""}
                  className="lift"
                >
                  {content}
                </a>
              ) : (
                <div key={partner.id} title={partner.title || ""}>
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
