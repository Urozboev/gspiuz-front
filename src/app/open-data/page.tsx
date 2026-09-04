"use client";

import { BarChart3, Users, GraduationCap, Building2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { useT } from "@/hooks/useT";
import { sectionPages } from "@/locales/sections";
import { formatNumber } from "@/lib/format";
import type { Paginated, DocumentItem, Department } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, DocumentList, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/**
 * Ochiq ma'lumotlar.
 * Statistika siteinfo'dan, hisobotlar esa hujjatlar bo'limidan olinadi.
 */
export default function OpenDataPage() {
  const { p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  // Sahifa matni admin paneldan keladi (GET /pages/open-data).
  const { page } = usePageBlocks("open-data");

  const dict = sectionPages[language];

  const { data: docsRes, notFound } = useApi<Paginated<DocumentItem>>("/documents", { category: "ochiq-malumotlar" });
  const { data: faculties } = useApi<Department[]>("/fakultet");
  const docs = docsRes?.data ?? [];

  const stats = [
    {
      icon: Users,
      value: siteInfo?.number_of_students
        ? formatNumber(siteInfo.number_of_students)
        : null,
      label: p.home.students,
    },
    {
      icon: GraduationCap,
      value: siteInfo?.audience_size ? formatNumber(siteInfo.audience_size) : null,
      label: p.home.professors,
    },
    {
      icon: Building2,
      value: faculties && faculties.length > 0 ? String(faculties.length) : null,
      label: p.home.facultiesCount,
    },
    {
      icon: BarChart3,
      value: siteInfo?.educational_programs
        ? formatNumber(siteInfo.educational_programs)
        : null,
      label: p.home.directionsCount,
    },
  ].filter((s): s is typeof s & { value: string } => Boolean(s.value));

  return (
    <>
      <PageHero
        title={dict.openData.title}
        subtitle={dict.openData.subtitle}
        crumbs={[{ label: dict.openData.title }]}
        icon={<BarChart3 className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {stats.length > 0 && (
        <Section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
            {stats.map((s) => (
              <div key={s.label}>
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300">
                  <s.icon className="w-5 h-5" />
                </span>
                <p className="mt-7 font-display text-5xl font-semibold text-brand-900 dark:text-brand-300 leading-none tabular-nums tracking-tight">
                  {s.value}
                </p>
                <p className="mt-4 text-base text-ink-600 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section tone="mist">
        <h2 className="display-3 text-ink-900 dark:text-white mb-10">
          {dict.labels.documents}
        </h2>
        {notFound || docs.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <DocumentList items={docs} />
        )}
      </Section>
    </>
  );
}
