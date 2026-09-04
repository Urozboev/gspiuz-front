"use client";

import Link from "next/link";
import {
  Network,
  Users,
  Layers,
  GraduationCap,
  ArrowUpRight,
  Building2,
  UserRound,
  Landmark,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { localized } from "@/lib/format";
import { navExtra } from "@/locales/sections";
import type { Department, StaffMember, LeadershipGroup } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";

/** Tuzilma bo'limi kartochkasi — sanoq bilan. */
function StructureCard({
  icon: Icon,
  title,
  desc,
  href,
  count,
  detailsLabel,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  href: string;
  count: number | null;
  detailsLabel: string;
}) {
  return (
    <Link href={href} className="lift group panel rounded-xl p-8 flex flex-col">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-brand-900 dark:text-brand-300 group-hover:bg-brand-900 group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </span>
        {count !== null && count > 0 && (
          <span className="font-display text-3xl font-semibold text-brand-900/25 dark:text-brand-300/30 leading-none tabular-nums">
            {count}
          </span>
        )}
      </div>
      <h3 className="mt-7 text-xl font-semibold text-ink-900 dark:text-white leading-snug">
        {title}
      </h3>
      <p className="mt-3 text-base text-ink-600 dark:text-slate-400">{desc}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
        {detailsLabel}
        <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}

export default function StructurePage() {
  const { t, p } = useT();
  const { language } = useApp();
  const navT = navExtra[language];

  const { data: leadership } = useApi<LeadershipGroup[]>("/leaderships");
  const { data: departments } = useApi<StaffMember[]>("/department");
  const { data: faculties } = useApi<Department[]>("/fakultet");
  const { data: chairs } = useApi<Department[]>("/kafedralar");

  const facultyList = faculties ?? [];
  const chairList = chairs ?? [];

  const leadershipCount = (leadership ?? []).reduce(
    (sum, group) =>
      sum + (group.manage_employ?.length ?? 0) + (group.professor_employ?.length ?? 0),
    0,
  );

  const blocks = [
    {
      icon: Users,
      title: p.titles.leadership,
      desc: p.subtitles.leadership,
      href: "/leadership",
      count: leadershipCount || null,
    },
    {
      icon: Building2,
      title: navT.departments,
      desc: "Institut boshqaruvidagi boshqarma, bo'lim va markazlar.",
      href: "/departments",
      count: departments?.length ?? null,
    },
    {
      icon: Layers,
      title: p.titles.faculties,
      desc: p.subtitles.faculties,
      href: "/faculties",
      count: facultyList.length || null,
    },
    {
      icon: Network,
      title: p.titles.chairs,
      desc: p.subtitles.chairs,
      href: "/kafedralar",
      count: chairList.length || null,
    },
    {
      icon: UserRound,
      title: navT.tutors,
      desc: "Talabalar bilan ishlovchi tyutorlar tarkibi.",
      href: "/tutors",
      count: null,
    },
    {
      icon: Landmark,
      title: navT.councils,
      desc: "Ilmiy va o'quv-uslubiy kengashlar tarkibi hamda qarorlari.",
      href: "/councils",
      count: null,
    },
    {
      icon: GraduationCap,
      title: p.titles.programs,
      desc: p.subtitles.programs,
      href: "/educational-programs",
      count: null,
    },
  ];

  return (
    <>
      <PageHero
        title={t.nav.structure}
        subtitle="Institutning tashkiliy tuzilmasi: rahbariyat, boshqarma va bo'limlar, fakultetlar hamda kafedralar."
        crumbs={[{ label: t.nav.structure }]}
        icon={<Network className="w-6 h-6" />}
      />

      <Section>
        <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((b) => (
            <StructureCard
              key={b.href}
              icon={b.icon}
              title={b.title}
              desc={b.desc}
              href={b.href}
              count={b.count}
              detailsLabel={p.common.details}
            />
          ))}
        </div>
      </Section>

      {/* Fakultetlar va kafedralar ro'yxati */}
      {(facultyList.length > 0 || chairList.length > 0) && (
        <Section tone="mist">
          <div className="grid lg:grid-cols-2 gap-14 reveal">
            {facultyList.length > 0 && (
              <div>
                <h2 className="display-3 text-ink-900 dark:text-white">
                  {p.titles.faculties}
                </h2>
                <ul className="mt-8">
                  {facultyList.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/faculties/${item.slug}`}
                        className="group flex items-center gap-4 py-5 border-t border-mist-200 dark:border-slate-800 hover:border-brand-900 dark:hover:border-brand-400 transition-colors"
                      >
                        <span className="text-base text-ink-900 dark:text-slate-100 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors">
                          {localized(item.name, language)}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-ink-300 ml-auto shrink-0 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {chairList.length > 0 && (
              <div>
                <h2 className="display-3 text-ink-900 dark:text-white">
                  {p.titles.chairs}
                </h2>
                <ul className="mt-8">
                  {chairList.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/kafedralar/${item.slug}`}
                        className="group flex items-center gap-4 py-5 border-t border-mist-200 dark:border-slate-800 hover:border-brand-900 dark:hover:border-brand-400 transition-colors"
                      >
                        <span className="text-base text-ink-900 dark:text-slate-100 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors">
                          {localized(item.name, language)}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-ink-300 ml-auto shrink-0 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>
      )}
    </>
  );
}
