"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, ClipboardList, Info, Phone, MapPin, Clock } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { useApi } from "@/hooks/useApi";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { INSTITUTE } from "@/lib/config";
import { endpoints } from "@/lib/endpoints";
import { admissions, sectionPages } from "@/locales/sections";
import type { Language } from "@/context/AppContext";
import type { DynamicPageItem, Paginated, DocumentItem } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, ContactStrip, DocumentList, PendingNotice } from "@/components/ui/InfoBlocks";

const TAB_KEYS = ["commission", "bachelor", "master", "second", "foreign"] as const;

/**
 * Slug bo'yicha kartochkani topadi.
 *
 * Sluglar faqat o'zbekcha ro'yxatda saqlanadi; boshqa tillarda kartochkalar
 * tartibi bir xil, shuning uchun indeks orqali mos matn olinadi.
 */
function findCard(slug: string, language: Language) {
  for (const tab of TAB_KEYS) {
    const index = admissions.uz.cards[tab].findIndex((c) => c.slug === slug);
    if (index >= 0) {
      const localized = admissions[language].cards[tab][index];
      return {
        tab,
        title: localized?.title ?? admissions.uz.cards[tab][index].title,
        desc: localized?.desc ?? admissions.uz.cards[tab][index].desc,
      };
    }
  }
  return null;
}

export default function AdmissionItemPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item } = use(params);
  const { p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();

  const dict = admissions[language];
  const sp = sectionPages[language];
  const card = findCard(item, language);
  const year = new Date().getFullYear();

  /*
   * To'liq matn admin paneldan keladi. Endpoint hali tayyor bo'lmasa yoki
   * kontent kiritilmagan bo'lsa, kartochka tavsifi va tegishli hujjatlar
   * ko'rsatiladi — sahifa bo'sh qolmaydi.
   */
  const { data } = useApi<{ data: DynamicPageItem }>(
    endpoints.pageItem("admissions", item),
  );
  const content = data?.data;

  const { data: docsRes } = useApi<Paginated<DocumentItem>>("/documents", {
    category: "normativ-hujjatlar",
  });
  const docs = docsRes?.data ?? [];

  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  const address = siteInfo?.address || INSTITUTE.address;
  const workTime = siteInfo?.work_time || INSTITUTE.workTime;

  const title = content?.title || card?.title || `${dict.title} ${year}`;
  const backTab = card && card.tab !== "commission" ? `?tab=${card.tab}` : "";

  return (
    <>
      <PageHero
        title={title}
        subtitle={content?.desc || card?.desc}
        crumbs={[
          { label: `${dict.title} ${year}`, href: `/admissions${backTab}` },
          { label: title },
        ]}
        icon={<ClipboardList className="w-6 h-6" />}
      />

      <Section tone="mist">
        <Link
          href={`/admissions${backTab}`}
          className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {card ? dict.tabs[card.tab] : `${dict.title} ${year}`}
        </Link>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-12">
          {content?.body ? (
            <div
              className="article-content max-w-3xl"
              // Matn admin panel muharriridan keladi.
              dangerouslySetInnerHTML={{ __html: content.body }}
            />
          ) : (
            <div className="max-w-3xl">
              <p className="text-lg text-ink-600 dark:text-slate-400">
                {card?.desc}
              </p>
              <div className="mt-8">
                <PendingNotice text={sp.pending} />
              </div>
            </div>
          )}
        </div>

        {/* Tegishli hujjatlar */}
        {docs.length > 0 && (
          <div className="mt-16">
            <h2 className="display-3 text-ink-900 dark:text-white mb-10">
              {sp.labels.documents}
            </h2>
            <DocumentList items={docs} />
          </div>
        )}

        <p className="mt-14 flex items-start gap-3 text-sm text-ink-400 max-w-2xl">
          <Info className="w-4 h-4 shrink-0 mt-1" />
          {dict.note}
        </p>
      </Section>

      {/* Qabul komissiyasi bilan aloqa */}
      <Section tone="brand">
        <h2 className="display-3 text-white mb-12">{dict.tabs.commission}</h2>
        <ContactStrip
          rows={[
            { icon: Phone, label: p.common.phone, value: phone, href: `tel:${phone}` },
            { icon: MapPin, label: p.common.address, value: address },
            { icon: Clock, label: p.common.workTime, value: workTime },
          ]}
        />
      </Section>
    </>
  );
}
