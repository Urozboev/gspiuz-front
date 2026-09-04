"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { extraPages, sectionPages, PAGE_SLUGS } from "@/locales/sections";
import type { ExtraPageKey } from "@/locales/sections";
import { Section, LinkList } from "@/components/ui/InfoBlocks";
import DynamicPageView from "@/components/page-layouts/DynamicPageView";

/**
 * Menyudagi bo'limlar uchun sahifa.
 *
 * Kontent backenddan (`GET /pages/{slug}`) keladi va sahifa turiga qarab
 * matn / kartochkalar / fayllar ko'rinishida chiziladi. Backendda sahifa
 * hali to'ldirilmagan bo'lsa, frontenddagi sarlavha va tavsif ishlatiladi.
 */
export default function SimpleSectionPage({
  pageKey,
  icon,
  relatedLinks = [],
}: {
  pageKey: ExtraPageKey;
  icon: LucideIcon;
  /**
   * Eskirgan parametr — hujjatlar endi backenddagi sahifa `files` maydonidan
   * keladi. Chaqiruvchi joylarni buzmaslik uchun qabul qilinadi.
   */
  withDocuments?: boolean;
  relatedLinks?: { label: string; href: string }[];
}) {
  const { language } = useApp();
  const page = extraPages[language][pageKey];
  const sp = sectionPages[language];
  const Icon = icon;
  const slug = PAGE_SLUGS[pageKey] ?? pageKey;

  return (
    <>
      <DynamicPageView
        slug={slug}
        fallback={{ title: page.title, subtitle: page.subtitle }}
        icon={<Icon className="w-6 h-6" />}
      />

      {relatedLinks.length > 0 && (
        <Section>
          <h2 className="display-3 text-ink-900 dark:text-white mb-10">
            {sp.labels.relatedLinks}
          </h2>
          <LinkList items={relatedLinks} />
        </Section>
      )}
    </>
  );
}
