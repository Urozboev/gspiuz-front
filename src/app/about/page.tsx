"use client";

import Link from "next/link";
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Quote,
  ArrowUpRight,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { formatNumber, fullName, localized } from "@/lib/format";
import { extraPages, navExtra, sectionPages } from "@/locales/sections";
import { usePageBlocks, blockToFeature } from "@/hooks/usePageBlocks";
import type { Department, LeadershipGroup } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, LinkList, FeatureGrid } from "@/components/ui/InfoBlocks";

export default function AboutPage() {
  const { t, p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();

  const { data: faculties } = useApi<Department[]>("/fakultet");
  const { data: chairs } = useApi<Department[]>("/kafedralar");
  const { data: leadership } = useApi<LeadershipGroup[]>("/leaderships");

  const ex = extraPages[language];
  const navT = navExtra[language];
  const sp = sectionPages[language];

  /*
   * Rektor ma'lumoti backenddan olinadi. Ma'lumot bo'lmasa ism ko'rsatilmaydi —
   * rasmiy saytda tasdiqlanmagan ism turishi mumkin emas.
   *
   * Rahbariyat ro'yxatidan aynan rektorni lavozim nomi bo'yicha tanlaymiz:
   * "prorektor" ham "rektor" so'zini o'z ichiga oladi, shuning uchun uni chetlaymiz.
   */
  const leadershipStaff = (leadership ?? []).flatMap((group) => [
    ...(group.manage_employ ?? []),
    ...(group.professor_employ ?? []),
  ]);
  const rector =
    leadershipStaff.find((person) => {
      const title =
        typeof person.position === "object" && person.position
          ? localized(person.position.name, language).toLowerCase()
          : "";
      return /(^|\s)rektor/.test(title) && !title.includes("prorektor");
    }) ?? null;
  const rectorName = rector
    ? fullName(rector.first_name, rector.last_name, rector.surname)
    : null;
  const rectorPosition =
    rector && typeof rector.position === "object" && rector.position
      ? localized(rector.position.name, language)
      : null;

  const stats = [
    {
      icon: Users,
      value: siteInfo?.number_of_students
        ? formatNumber(siteInfo.number_of_students)
        : null,
      label: t.statistics.students,
    },
    {
      icon: GraduationCap,
      value: siteInfo?.audience_size ? formatNumber(siteInfo.audience_size) : null,
      label: t.statistics.professors,
    },
    {
      icon: Building2,
      value: faculties && faculties.length > 0 ? String(faculties.length) : null,
      label: t.statistics.faculties,
    },
    {
      icon: BookOpen,
      value: chairs && chairs.length > 0 ? String(chairs.length) : null,
      label: t.statistics.departments,
    },
  ].filter((s): s is typeof s & { value: string } => Boolean(s.value));

  /*
   * Sahifa kontenti admin paneldan keladi (GET /pages/about):
   * `mission` guruhidagi bloklar — maqsad va vazifa,
   * sahifaning HTML tanasi — rektor tabrigi.
   */
  const { blocks, page } = usePageBlocks("about");
  const mission = blocks
    .filter((b) => b.group === "mission")
    .map(blockToFeature);

  const relatedLinks = [
    { label: ex.instituteHistory.title, href: "/institute-history" },
    { label: p.titles.leadership, href: "/leadership" },
    { label: t.nav.structure, href: "/structure" },
    { label: navT.departments, href: "/departments" },
    { label: navT.requisites, href: "/requisites" },
    { label: navT.openData, href: "/open-data" },
  ];

  return (
    <>
      <PageHero
        title={t.nav.about}
        subtitle={t.tagline}
        crumbs={[{ label: t.nav.about }]}
        icon={<Building2 className="w-6 h-6" />}
      />

      {/* Institut haqida + ko'rsatkichlar */}
      <Section>
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-7 reveal-left">
            <h2 className="display-3 text-ink-900 dark:text-white">
              {t.aboutPage.historyTitle}
            </h2>
            <p className="mt-7 text-lg text-ink-600 dark:text-slate-400">
              {siteInfo?.desc || t.aboutPage.historyDesc}
            </p>
            <Link
              href="/institute-history"
              className="group mt-8 inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300"
            >
              {ex.instituteHistory.title}
              <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {stats.length > 0 && (
            <div className="lg:col-span-5 grid grid-cols-2 gap-6 reveal-right">
              {stats.map((s) => (
                <div key={s.label} className="panel rounded-xl p-7">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-brand-900 dark:text-brand-300">
                    <s.icon className="w-5 h-5" />
                  </span>
                  <p className="mt-6 font-display text-4xl font-semibold text-brand-900 dark:text-brand-300 leading-none tabular-nums tracking-tight">
                    {s.value}
                  </p>
                  <p className="mt-3 text-sm text-ink-600 dark:text-slate-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* Maqsad va vazifa — admin paneldan boshqariladi */}
      {mission.length > 0 && (
        <Section tone="mist">
          <FeatureGrid items={mission} columns={2} tone="white" />
        </Section>
      )}

      {/* Rektor murojaati */}
      <Section tone="brand" className="relative overflow-hidden">
        <Quote className="pointer-events-none absolute -top-4 right-4 w-40 h-40 text-white/[0.04]" />
        <div className="relative max-w-3xl reveal">
          {/*
            Tabrik matni admin paneldan keladi (GET /pages/about → body).
            Kontent kiritilmagan bo'lsa, tarjimalardagi zaxira matn ishlatiladi.
          */}
          {page?.body ? (
            <div
              className="article-content on-dark text-lg sm:text-xl"
              dangerouslySetInnerHTML={{ __html: page.body }}
            />
          ) : (
            <>
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                <span className="h-px w-10 bg-accent-500" />
                {t.aboutPage.rectorTitle}
              </p>
              <p className="mt-8 text-xl sm:text-2xl text-white leading-relaxed">
                {t.aboutPage.rectorDesc}
              </p>
            </>
          )}
          {rectorName && (
            <div className="mt-10 pt-8 border-t border-white/15">
              <p className="text-lg font-semibold text-white">{rectorName}</p>
              {rectorPosition && (
                <p className="mt-1 text-base text-brand-200/60">{rectorPosition}</p>
              )}
            </div>
          )}
        </div>
      </Section>

      {/* Tegishli bo'limlar */}
      <Section>
        <h2 className="display-3 text-ink-900 dark:text-white mb-10">
          {sp.labels.relatedLinks}
        </h2>
        <LinkList items={relatedLinks} />
      </Section>
    </>
  );
}
