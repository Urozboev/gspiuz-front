"use client";

import Link from "next/link";
import {
  ShieldAlert,
  Phone,
  Mail,
  MessageSquare,
  ArrowRight,
} from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { INSTITUTE } from "@/lib/config";
import { sectionPages } from "@/locales/sections";
import { usePageBlocks, blockToFeature } from "@/hooks/usePageBlocks";
import type { Paginated, DocumentItem } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import {
  Section,
  FeatureGrid,
  DocumentList,
  ContactStrip,
  PendingNotice,
  PageBody,
} from "@/components/ui/InfoBlocks";

/**
 * Korrupsiyaga qarshi kurashish.
 * Davlat OTM saytlari uchun majburiy bo'lim: komplayens tizimi,
 * ishonch telefoni va murojaat qilish yo'li.
 */
export default function AntiCorruptionPage() {
  const { p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  const dict = sectionPages[language];

  const { data: docsRes, notFound } = useApi<Paginated<DocumentItem>>("/documents", { category: "normativ-hujjatlar" });
  const docs = docsRes?.data ?? [];

  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  const email = siteInfo?.email || INSTITUTE.email;

  // Bloklar admin paneldan keladi (GET /pages/anti-corruption).
  const { blocks, page } = usePageBlocks("anti-corruption");
  const measures = blocks.map(blockToFeature);

  return (
    <>
      <PageHero
        title={dict.antiCorruption.title}
        subtitle={dict.antiCorruption.subtitle}
        crumbs={[{ label: dict.antiCorruption.title }]}
        icon={<ShieldAlert className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelda "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {measures.length > 0 && (
        <Section>
          <FeatureGrid items={measures} columns={3} tone="mist" />
        </Section>
      )}

      {/* Murojaat qilish */}
      <Section tone="mist">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="display-3 text-ink-900 dark:text-white">
              {p.common.appeal}
            </h2>
            <p className="mt-5 text-lg text-ink-600 dark:text-slate-400">
              Korrupsiya holati yoki manfaatlar to'qnashuvi haqida xabar berish
              uchun komplayens bo'limiga murojaat qiling. Murojaat maxfiy tarzda
              ko'rib chiqiladi.
            </p>
          </div>
          <Link
            href="/murojaat?type=compliance"
            className="group shrink-0 inline-flex items-center gap-3 bg-brand-900 hover:bg-brand-800 text-white font-semibold px-9 py-4.5 rounded-lg transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            {p.common.appeal}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      {/* Hujjatlar */}
      <Section>
        <h2 className="display-3 text-ink-900 dark:text-white mb-10">
          {dict.labels.documents}
        </h2>
        {notFound || docs.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <DocumentList items={docs} />
        )}
      </Section>

      {/* Ishonch telefoni */}
      <Section tone="brand">
        <h2 className="display-3 text-white mb-12">{dict.labels.hotline}</h2>
        <ContactStrip
          rows={[
            { icon: Phone, label: p.common.phone, value: phone, href: `tel:${phone}` },
            { icon: Mail, label: p.common.email, value: email, href: `mailto:${email}` },
          ]}
        />
      </Section>
    </>
  );
}
