"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ClipboardList,
  ArrowUpRight,
  Phone,
  MapPin,
  Info,
  GraduationCap,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { useApi } from "@/hooks/useApi";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { INSTITUTE } from "@/lib/config";
import { admissions } from "@/locales/sections";
import type { EducationalProgram } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { PageBody } from "@/components/ui/InfoBlocks";
import { usePageBlocks } from "@/hooks/usePageBlocks";
import Container from "@/components/ui/Container";

const TAB_KEYS = ["commission", "bachelor", "master", "second", "foreign"] as const;
type TabKey = (typeof TAB_KEYS)[number];

/** URL'dagi `?tab=` qiymatini tekshirib, mavjud bo'lmasa birinchi bo'limni qaytaradi. */
function resolveTab(value: string | null): TabKey {
  return TAB_KEYS.includes(value as TabKey) ? (value as TabKey) : "commission";
}

function AdmissionsContent() {
  const { p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  const router = useRouter();
  const searchParams = useSearchParams();

  const dict = admissions[language];
  const activeTab = resolveTab(searchParams.get("tab"));
  const cards = dict.cards[activeTab];

  const { data: programs } = useApi<EducationalProgram[]>("/educational-programs");

  // Qabul sahifasining kirish matni admin paneldan keladi.
  const { page } = usePageBlocks("admissions");
  const programList = programs ?? [];

  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  const address = siteInfo?.address || INSTITUTE.address;
  const year = new Date().getFullYear();

  return (
    <>
      <PageHero
        title={`${dict.title} ${year}`}
        subtitle={dict.subtitle}
        crumbs={[{ label: `${dict.title} ${year}` }]}
        icon={<ClipboardList className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {/* Bo'limlar (tab) — jdpu.uz dagi kabi */}
      <section className="bg-white dark:bg-slate-900 sticky top-24 z-30 border-b border-mist-200 dark:border-slate-800">
        <Container>
          <div className="flex gap-2 overflow-x-auto py-4 -mx-1 px-1">
            {TAB_KEYS.map((key) => {
              const isActive = key === activeTab;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() =>
                    router.replace(
                      key === "commission" ? "/admissions" : `/admissions?tab=${key}`,
                      { scroll: false },
                    )
                  }
                  className={`shrink-0 px-6 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-brand-900 text-white"
                      : "text-ink-600 dark:text-slate-400 hover:bg-mist-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {dict.tabs[key]}
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Tanlangan bo'lim kartochkalari */}
      <section className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-24 transition-colors">
        <Container>
          <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => {
              /*
               * Kartochka manzili: tashqi havola bo'lsa o'sha, aks holda
               * o'z sahifasi. Slug uz ro'yxatidan indeks bo'yicha olinadi —
               * barcha tillarda kartochkalar tartibi bir xil.
               */
              const slug = admissions.uz.cards[activeTab][index]?.slug;
              const href = card.href ?? (slug ? `/admissions/${slug}` : null);

              const body = (
                <>
                  <h2 className="text-xl font-semibold text-ink-900 dark:text-white leading-snug">
                    {card.title}
                  </h2>
                  <p className="mt-4 text-base text-ink-600 dark:text-slate-400">
                    {card.desc}
                  </p>
                  {href && (
                    <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                      {p.common.readMore}
                      <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  )}
                </>
              );

              return href ? (
                <Link
                  key={card.title}
                  href={href}
                  className="lift group bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col min-h-[14rem]"
                >
                  {body}
                </Link>
              ) : (
                <div
                  key={card.title}
                  className="bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col min-h-[14rem]"
                >
                  {body}
                </div>
              );
            })}
          </div>

          <p className="mt-14 flex items-start gap-3 text-sm text-ink-400 max-w-2xl">
            <Info className="w-4 h-4 shrink-0 mt-1" />
            {dict.note}
          </p>
        </Container>
      </section>

      {/* Ta'lim yo'nalishlari */}
      {programList.length > 0 && (
        <section className="bg-white dark:bg-slate-900 py-20 lg:py-24 transition-colors">
          <Container>
            <h2 className="display-3 text-ink-900 dark:text-white">
              {p.titles.programs}
            </h2>
            <ul className="mt-10">
              {programList.map((pr) => (
                <li key={pr.id}>
                  <Link
                    href={`/educational-programs/${pr.slug || pr.id}`}
                    className="group flex items-center gap-6 py-6 border-t border-mist-200 dark:border-slate-800 hover:border-brand-900 dark:hover:border-brand-400 transition-colors"
                  >
                    <GraduationCap className="w-5 h-5 shrink-0 text-ink-300 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors" />
                    <span className="text-lg text-ink-900 dark:text-slate-100 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors">
                      {pr.name}
                    </span>
                    {pr.education_years && (
                      <span className="hidden sm:inline text-sm text-ink-400 shrink-0">
                        {pr.education_years} {p.programs.years}
                      </span>
                    )}
                    <ArrowUpRight className="w-5 h-5 text-ink-300 ml-auto shrink-0 group-hover:text-brand-900 dark:group-hover:text-brand-300 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      {/* Qabul komissiyasi bilan aloqa */}
      <section className="bg-brand-950 py-20 lg:py-24">
        <Container>
          <div className="grid sm:grid-cols-2 gap-10">
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-300">
                <Phone className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm text-brand-200/60">{p.common.phone}</p>
                <a
                  href={`tel:${phone}`}
                  className="text-xl text-white hover:text-accent-300 transition-colors"
                >
                  {phone}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-300">
                <MapPin className="w-5 h-5" />
              </span>
              <div>
                <p className="text-sm text-brand-200/60">{p.common.address}</p>
                <p className="text-xl text-white">{address}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

export default function AdmissionsPage() {
  return (
    <Suspense fallback={null}>
      <AdmissionsContent />
    </Suspense>
  );
}
