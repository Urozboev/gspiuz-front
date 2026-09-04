"use client";

import { Landmark, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { INSTITUTE } from "@/lib/config";
import { sectionPages } from "@/locales/sections";
import PageHero from "@/components/ui/PageHero";
import { Section, ContactStrip, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/**
 * Rekvizitlar.
 * Aloqa ma'lumotlari siteinfo'dan keladi; bank rekvizitlari uchun backendda
 * alohida maydonlar yo'q — ular admin panelga qo'shilgach shu yerga ulanadi.
 */
export default function RequisitesPage() {
  const { p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  // Sahifa matni admin paneldan keladi (GET /pages/requisites).
  const { page } = usePageBlocks("requisites");

  const dict = sectionPages[language];

  const rows = [
    {
      label: p.common.address,
      value: siteInfo?.address || INSTITUTE.address,
    },
    {
      label: p.common.phone,
      value: siteInfo?.phone_number || INSTITUTE.phone,
    },
    {
      label: p.common.email,
      value: siteInfo?.email || INSTITUTE.email,
    },
    {
      label: p.common.workTime,
      value: siteInfo?.work_time || INSTITUTE.workTime,
    },
  ];

  /*
   * Bank rekvizitlari backenddan keladi. Bo'sh maydonlar tushirib qoldiriladi —
   * to'ldirilmagan qatorlar jadvalda "—" bo'lib turmasin.
   */
  const req = siteInfo?.requisites;
  const bankRows = [
    { label: "Yuridik nomi", value: req?.legal_name },
    { label: "Bank nomi", value: req?.bank_name },
    { label: "Hisob raqami", value: req?.bank_account },
    { label: "G'aznachilik hisob raqami", value: req?.treasury_account },
    { label: "MFO", value: req?.mfo },
    { label: "STIR (INN)", value: req?.inn },
    { label: "OKED", value: req?.oked },
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));

  return (
    <>
      <PageHero
        title={dict.requisites.title}
        subtitle={dict.requisites.subtitle}
        crumbs={[{ label: dict.requisites.title }]}
        icon={<Landmark className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {/* Umumiy ma'lumotlar jadvali */}
      <Section>
        <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
          <dl>
            {rows.map((row) => (
              <div
                key={row.label}
                className="grid sm:grid-cols-3 gap-2 sm:gap-8 px-8 py-7 border-t first:border-t-0 border-mist-200 dark:border-slate-800"
              >
                <dt className="text-base text-ink-400">{row.label}</dt>
                <dd className="sm:col-span-2 text-lg text-ink-900 dark:text-slate-100">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* Bank rekvizitlari — /siteinfo dagi `requisites` obyektidan */}
      <Section tone="mist">
        <h2 className="display-3 text-ink-900 dark:text-white mb-10">
          {dict.labels.bankDetails}
        </h2>
        {bankRows.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden">
            <dl>
              {bankRows.map((row) => (
                <div
                  key={row.label}
                  className="grid sm:grid-cols-3 gap-2 sm:gap-8 px-8 py-7 border-t first:border-t-0 border-mist-200 dark:border-slate-800"
                >
                  <dt className="text-base text-ink-400">{row.label}</dt>
                  <dd className="sm:col-span-2 text-lg text-ink-900 dark:text-slate-100 tabular-nums">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <PendingNotice text={dict.pending} />
        )}
      </Section>

      <Section tone="brand">
        <h2 className="display-3 text-white mb-12">{dict.labels.contact}</h2>
        <ContactStrip
          rows={[
            {
              icon: Phone,
              label: p.common.phone,
              value: siteInfo?.phone_number || INSTITUTE.phone,
              href: `tel:${siteInfo?.phone_number || INSTITUTE.phone}`,
            },
            {
              icon: Mail,
              label: p.common.email,
              value: siteInfo?.email || INSTITUTE.email,
              href: `mailto:${siteInfo?.email || INSTITUTE.email}`,
            },
            {
              icon: MapPin,
              label: p.common.address,
              value: siteInfo?.address || INSTITUTE.address,
            },
            {
              icon: Clock,
              label: p.common.workTime,
              value: siteInfo?.work_time || INSTITUTE.workTime,
            },
          ]}
        />
      </Section>
    </>
  );
}
