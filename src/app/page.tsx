"use client";

import Link from "next/link";
import {
  GraduationCap,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Globe,
  Building2,
  FlaskConical,
  HeartHandshake,
  CalendarDays,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import { useApp, type Language } from "@/context/AppContext";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { QUICK_LINKS, INSTITUTE } from "@/lib/config";
import {
  formatNumber,
  pickImage,
  localized,
  formatDate,
  splitHeadline,
  stripHtml,
} from "@/lib/format";
import type {
  Paginated,
  Post,
  Partner,
  EducationalProgram,
  Banner,
  Department,
  DynamicPage,
} from "@/lib/types";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RemoteImage from "@/components/ui/RemoteImage";
import Marquee from "@/components/ui/Marquee";
import NewsCard from "@/components/cards/NewsCard";
import { CardGridSkeleton } from "@/components/ui/States";
import BirthdayGreeting from "@/components/BirthdayGreeting";
import HeroBackground, { type HeroImage } from "@/components/HeroBackground";
import AdmissionCountdown from "@/components/AdmissionCountdown";
import UpcomingEvents from "@/components/UpcomingEvents";
import { iconFromName } from "@/lib/icons";

/**
 * Tuzilma bo'limlari ro'yxati (fakultetlar / kafedralar).
 */
function StructureSection({
  eyebrow,
  title,
  subtitle,
  items,
  basePath,
  viewAllLabel,
  language,
  tone,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  items: Department[];
  basePath: string;
  viewAllLabel: string;
  language: Language;
  tone: "white" | "mist";
}) {
  if (items.length === 0) return null;

  return (
    <section
      className={`${
        tone === "mist" ? "bg-mist-100 dark:bg-slate-950" : "bg-white dark:bg-slate-900"
      } py-24 lg:py-28 transition-colors`}
    >
      <Container>
        <div className="flex items-end justify-between gap-8 flex-wrap reveal">
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} />
          <Link
            href={basePath}
            className="hidden sm:inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:gap-3.5 transition-all"
          >
            {viewAllLabel}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`${basePath}/${item.slug}`}
              className={`lift group rounded-xl p-8 flex flex-col min-h-[15rem] ${
                tone === "mist"
                  ? "bg-white dark:bg-slate-900"
                  : "panel"
              }`}
            >
              <span className="h-12 w-12 rounded-lg bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </span>
              <h3 className="mt-auto pt-8 text-xl font-semibold text-ink-900 dark:text-white leading-snug">
                {localized(item.name, language)}
              </h3>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                <span className="h-px w-8 bg-accent-500 group-hover:w-12 transition-all" />
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  const { t, p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();

  const { data: bannersRes } = useApi<Paginated<Banner>>("/banners");
  const { data: newsRes, loading: newsLoading } = useApi<Paginated<Post>>("/news");
  const { data: faculties } = useApi<Department[]>("/fakultet");
  const { data: chairs } = useApi<Department[]>("/kafedralar");
  const { data: programs } = useApi<EducationalProgram[]>("/educational-programs");
  const { data: partnersRes } = useApi<Paginated<Partner>>("/partners");
  // Bosh sahifa bloklari admin paneldan boshqariladi (GET /pages/home).
  const { data: homeRes } = useApi<{ data: DynamicPage }>("/pages/home");

  const heroBanner = bannersRes?.data?.[0];
  /*
   * Hero foni admin paneldagi bannerlardan olinadi. Bir nechta banner bo'lsa
   * rasmlar almashib turadi; hech biri bo'lmasa mahalliy rasm ishlatiladi.
   */
  const heroTitle = localized(siteInfo?.title, language) || INSTITUTE.nameUz;
  const titleLines = splitHeadline(heroTitle);

  const heroImages = (bannersRes?.data ?? [])
    .map((b) => pickImage(b.images, "lg"))
    .filter((src): src is string => !!src)
    .map((src) => ({ src }));

  /*
   * Admin panelda banner qo'shilmagan bo'lsa institut binosining rasmi
   * ko'rsatiladi. Ikki o'lchamda tayyorlangan — tor ekran yengilrog'ini oladi.
   */
  const fallbackHero: HeroImage = {
    src: "/images/hero-campus-1920.webp",
    srcSet:
      "/images/hero-campus-1280.webp 1280w, /images/hero-campus-1920.webp 1920w",
    sizes: "100vw",
  };

  const heroSlides = heroImages.length > 0 ? heroImages : [fallbackHero];

  const allNews = newsRes?.data ?? [];
  const featuredNews = allNews.slice(0, 4);
  const latestNews = allNews.slice(0, 6);
  const facultyList = faculties ?? [];
  const chairList = chairs ?? [];
  const programList = programs ?? [];
  const partners = partnersRes?.data ?? [];

  const homeBlocks = homeRes?.data?.blocks ?? [];
  const systemBlocks = homeBlocks.filter((b) => b.group === "systems");

  /*
   * Bo'lim sarlavhalari ham admin paneldan boshqariladi ("headings" guruhi).
   * Blok topilmasa yoki bo'sh bo'lsa `locales` dagi qiymat ishlatiladi —
   * shunda admin sarlavhani o'chirib qo'ysa ham sahifa bo'sh chiqmaydi.
   */
  /*
   * Tezkor havolalar ham admin paneldan boshqariladi ("quicklinks" guruhi).
   * Guruh bo'sh bo'lsa `config.ts` dagi belgilangan ro'yxat ishlatiladi —
   * shunda backend tayyorlanmagunicha ham blok bo'sh qolmaydi.
   */
  const quickLinkBlocks = homeBlocks.filter((b) => b.group === "quicklinks");
  const quickLinks: { href: string; external: boolean; label: string }[] =
    quickLinkBlocks.length > 0
      ? quickLinkBlocks
          .filter((b) => b.link && b.title)
          .map((b) => ({
            href: b.link as string,
            external: /^https?:\/\//.test(b.link as string),
            label: b.title as string,
          }))
      : QUICK_LINKS.map((link) => ({
          href: link.href,
          external: link.external,
          label: link.label[language] ?? link.label.uz,
        }));

  const headingBlocks = homeBlocks.filter((b) => b.group === "headings");
  const heading = (slug: string, fallback: string) =>
    headingBlocks.find((b) => b.slug === slug)?.title?.trim() || fallback;
  const headingDesc = (slug: string, fallback: string) =>
    stripHtml(headingBlocks.find((b) => b.slug === slug)?.desc).trim() || fallback;
  const linkBlocks = homeBlocks.filter((b) => b.group === "links");

  /*
   * Statistika faqat haqiqiy qiymat bo'lganda ko'rsatiladi —
   * bo'sh katakchalar sayt "buzuq" ko'rinishini beradi.
   */
  const stats = [
    {
      value: siteInfo?.number_of_students
        ? formatNumber(siteInfo.number_of_students)
        : null,
      label: p.home.students,
    },
    {
      value: siteInfo?.audience_size ? formatNumber(siteInfo.audience_size) : null,
      label: p.home.professors,
    },
    {
      value:
        facultyList.length > 0
          ? String(facultyList.length)
          : chairList.length > 0
            ? String(chairList.length)
            : null,
      label: facultyList.length > 0 ? p.home.facultiesCount : p.titles.chairs,
    },
    {
      value: siteInfo?.educational_programs
        ? formatNumber(siteInfo.educational_programs)
        : programList.length > 0
          ? String(programList.length)
          : null,
      label: p.home.directionsCount,
    },
  ].filter((s): s is typeof s & { value: string } => Boolean(s.value));

  /** "Institut faoliyati" bloklari — JDPU saytidagi tuzilishga yaqin. */
  const activityBlocks = [
    {
      icon: GraduationCap,
      title: p.home.education,
      text: p.home.educationText,
      links: [
        { label: p.programs.bachelor, href: "/educational-programs" },
        { label: p.programs.master, href: "/educational-programs" },
        { label: p.titles.faculties, href: "/faculties" },
        { label: p.titles.chairs, href: "/kafedralar" },
      ],
    },
    {
      icon: FlaskConical,
      title: p.home.science,
      text: p.home.scienceText,
      links: [
        { label: p.titles.journals, href: "/journals" },
        { label: p.titles.documents, href: "/documents" },
      ],
    },
    {
      icon: Globe,
      title: p.home.international,
      text: p.home.internationalText,
      links: [
        { label: p.titles.partners, href: "/partners" },
        { label: p.titles.programs, href: "/educational-programs" },
      ],
    },
    {
      icon: HeartHandshake,
      title: p.home.spiritual,
      text: p.home.spiritualText,
      links: [
        { label: t.studentsPage.title, href: "/students" },
        { label: p.titles.vacancies, href: "/vacancies" },
      ],
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* 1. HERO */}
      <section className="relative bg-brand-950 overflow-hidden">
        <HeroBackground images={heroSlides} alt={INSTITUTE.nameUz} />

        <Container className="relative z-10 pt-24 pb-40 lg:pt-32 lg:pb-48">
          <div className="max-w-xl lg:max-w-2xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
              <span className="h-px w-10 bg-accent-500" />
              {p.home.badge}
            </p>

            <h1 className="mt-8 display-1 text-white">
              {titleLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-brand-100/75 max-w-2xl">
              {stripHtml(heroBanner?.desc) || p.home.heroLead}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-12">
              <Link
                href="/admissions"
                className="group inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-400 text-white font-semibold px-9 py-4.5 rounded-lg transition-colors"
              >
                {p.home.admission} {currentYear}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-3 text-white/85 hover:text-white font-semibold px-9 py-4.5 rounded-lg border border-white/25 hover:border-white/50 transition-colors"
              >
                {p.home.aboutInstitute}
              </Link>
            </div>

            <p className="mt-10 text-sm text-brand-200/55">{p.home.since}</p>
          </div>
        </Container>
      </section>

      {/*
        2. TEZKOR HAVOLALAR — hero ustiga chiqib turadi.

        Bo'lim tepasida to'ldirish yo'q: uning foni aynan hero tugagan
        joydan boshlanadi, kartochka esa manfiy margin bilan hero ustiga
        ko'tariladi. Shu tarzda hero bilan keyingi bo'lim orasida fon
        berilmagan bo'shliq qolmaydi — aks holda u yerda oq va kulrang
        yonma-yon tushib, xatodek ko'rinardi.
      */}
      {/*
        `flow-root` — bo'limning yuqori chegarasi ichkaridagi manfiy
        margin bilan tepaga tortilmasin. Usiz bo'lim hero ustiga chiqib,
        uning pastki 96px ini yopib qo'yardi.
      */}
      <section className="flow-root bg-white dark:bg-slate-900 transition-colors">
        <Container className="relative z-20 -mt-24">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-[0_24px_70px_-30px_rgb(15_30_107_/_0.3)] p-4 sm:p-6">
          <p className="px-3 pb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
            {p.home.quickLinks}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {quickLinks.map((link) => {
              const label = link.label;
              const inner = (
                <>
                  <span className="text-base font-medium text-ink-900 dark:text-slate-100">
                    {label}
                  </span>
                  <ArrowUpRight className="w-4.5 h-4.5 text-ink-300 ml-auto shrink-0 group-hover:text-brand-900 dark:group-hover:text-brand-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                </>
              );
              const cls =
                "group flex items-center gap-3 px-5 py-4 rounded-lg hover:bg-mist-100 dark:hover:bg-slate-800/70 transition-colors";
              return link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <Link key={link.href} href={link.href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
        </Container>
      </section>

      {/* Qabul hisoblagichi — sana kiritilmagan bo'lsa ko'rinmaydi */}
      <AdmissionCountdown />

      {/* 3. STATISTIKA */}
      {stats.length > 0 && (
        <section className="bg-white dark:bg-slate-900 py-24 lg:py-28 transition-colors">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 reveal-stagger">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-5xl lg:text-6xl font-semibold text-brand-900 dark:text-brand-300 leading-none tabular-nums tracking-tight">
                    {s.value}
                  </p>
                  <span className="mt-6 block h-px w-12 bg-accent-500" />
                  <p className="mt-5 text-base text-ink-600 dark:text-slate-400">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-16 text-sm text-ink-400 max-w-xl">{p.home.statsNote}</p>
          </Container>
        </section>
      )}

      {/* Yaqin tadbirlar — tadbir bo'lmasa ko'rinmaydi */}
      <UpcomingEvents />

      {/* Bugungi tug'ilgan kunlar — hech kim bo'lmasa ko'rinmaydi */}
      <BirthdayGreeting />

      {/* 4. YANGILIKLAR */}
      <section className="bg-mist-100 dark:bg-slate-950 py-24 lg:py-28 transition-colors">
        <Container>
          <div className="flex items-end justify-between gap-8 flex-wrap reveal">
            <SectionHeading
              eyebrow={p.home.pressService}
              title={p.titles.news}
              subtitle={p.subtitles.news}
            />
            <Link
              href="/news"
              className="hidden sm:inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:gap-3.5 transition-all"
            >
              {p.common.viewAll}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-14 grid lg:grid-cols-12 gap-8 reveal">
            <div className="lg:col-span-8">
              {newsLoading ? (
                <CardGridSkeleton count={4} />
              ) : featuredNews.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {featuredNews.map((post) => (
                    <NewsCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-ink-400 py-14">{p.common.loading}</p>
              )}
            </div>

            {/* So'nggi yangiliklar ro'yxati */}
            <aside className="lg:col-span-4">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-3 h-full">
                <p className="px-5 pt-5 pb-4 text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
                  {p.titles.announcements}
                </p>
                <ul>
                  {latestNews.map((post) => (
                    <li key={`latest-${post.id}`}>
                      <Link
                        href={`/news/${post.slug}`}
                        className="group block px-5 py-4 rounded-lg hover:bg-mist-100 dark:hover:bg-slate-800/70 transition-colors"
                      >
                        <span className="flex items-center gap-2 text-xs font-medium text-ink-400">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {formatDate(post.date, language)}
                        </span>
                        <p className="mt-2 text-base text-ink-900 dark:text-slate-100 leading-snug line-clamp-3 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors">
                          {post.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                  {latestNews.length === 0 && (
                    <li className="px-5 py-14 text-center text-ink-400">
                      {p.common.loading}
                    </li>
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* 5. FAKULTETLAR VA KAFEDRALAR */}
      <StructureSection
        eyebrow={p.home.structureEyebrow}
        title={p.titles.faculties}
        subtitle={p.subtitles.faculties}
        items={facultyList}
        basePath="/faculties"
        viewAllLabel={p.common.viewAll}
        language={language}
        tone="white"
      />
      <StructureSection
        eyebrow={p.home.structureEyebrow}
        title={p.titles.chairs}
        subtitle={p.subtitles.chairs}
        items={chairList}
        basePath="/kafedralar"
        viewAllLabel={p.common.viewAll}
        language={language}
        tone={facultyList.length > 0 ? "mist" : "white"}
      />

      {/* 6. TA'LIM YO'NALISHLARI */}
      {programList.length > 0 && (
        <section className="bg-white dark:bg-slate-900 py-24 lg:py-28 transition-colors">
          <Container>
            <div className="flex items-end justify-between gap-8 flex-wrap reveal">
              <SectionHeading
                eyebrow={p.home.educationEyebrow}
                title={heading("directions", p.home.directions)}
                subtitle={headingDesc("directions", p.home.directionsSubtitle)}
              />
              <Link
                href="/educational-programs"
                className="hidden sm:inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:gap-3.5 transition-all"
              >
                {p.common.viewAll}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <ul className="mt-14 reveal">
              {programList.slice(0, 10).map((pr) => (
                <li key={pr.id}>
                  <Link
                    href={`/educational-programs/${pr.slug || pr.id}`}
                    className="group flex items-center gap-6 py-7 border-t border-mist-200 dark:border-slate-800 hover:border-brand-900 dark:hover:border-brand-400 transition-colors"
                  >
                    <span className="text-sm font-medium text-ink-300 tabular-nums w-10 shrink-0">
                      {String(pr.id).padStart(2, "0")}
                    </span>
                    <span className="text-lg sm:text-xl font-medium text-ink-900 dark:text-slate-100 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors">
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

      {/* 7. INSTITUT FAOLIYATI */}
      <section className="bg-mist-100 dark:bg-slate-950 py-24 lg:py-28 transition-colors">
        <Container>
          <SectionHeading
            eyebrow={p.home.aboutEyebrow}
            title={heading("activity", p.home.activity)}
            subtitle={headingDesc("activity", p.home.activitySubtitle)}
            align="center"
            className="reveal"
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
            {activityBlocks.map((block) => (
              <div
                key={block.title}
                className="lift bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col"
              >
                <span className="h-12 w-12 rounded-lg bg-brand-900 text-accent-300 flex items-center justify-center">
                  <block.icon className="w-5 h-5" />
                </span>
                <h3 className="mt-7 text-xl font-semibold text-ink-900 dark:text-white">
                  {block.title}
                </h3>
                <p className="mt-4 text-base text-ink-600 dark:text-slate-400">
                  {block.text}
                </p>
                <ul className="mt-7 pt-7 border-t border-mist-200 dark:border-slate-800 space-y-3.5">
                  {block.links.map((l) => (
                    <li key={`${block.title}-${l.label}`}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-2 text-sm text-ink-600 dark:text-slate-300 hover:text-brand-900 dark:hover:text-brand-300 transition-colors"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-accent-500 group-hover:translate-x-0.5 transition-transform" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 8. BIZNING TIZIMLARIMIZ — admin paneldan boshqariladi */}
      {systemBlocks.length > 0 && (
      <section className="bg-white dark:bg-slate-900 py-24 lg:py-28 transition-colors">
        <Container>
          <SectionHeading
            eyebrow={p.home.digitalEyebrow}
            title={heading("systems", p.home.systems)}
            subtitle={headingDesc("systems", p.home.systemsSubtitle)}
            align="center"
            className="reveal"
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 reveal-stagger">
            {systemBlocks.map((sys) => {
              const Icon = iconFromName(sys.icon);
              return (
                <a
                  key={sys.slug}
                  href={sys.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift panel group rounded-xl p-8 flex flex-col min-h-[14rem]"
                >
                  {Icon && (
                    <span className="h-12 w-12 rounded-lg bg-white dark:bg-slate-800 text-brand-900 dark:text-brand-300 flex items-center justify-center group-hover:bg-brand-900 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </span>
                  )}
                  <h3 className="mt-auto pt-8 text-xl font-semibold text-ink-900 dark:text-white flex items-center gap-2">
                    {sys.title}
                    <ArrowUpRight className="w-4.5 h-4.5 text-ink-300 group-hover:text-brand-900 dark:group-hover:text-brand-300 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="mt-3 text-sm text-ink-600 dark:text-slate-400">
                    {stripHtml(sys.desc)}
                  </p>
                </a>
              );
            })}
          </div>
        </Container>
      </section>
      )}

      {/* 9. CTA */}
      <section className="bg-brand-950 py-24 lg:py-28">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 reveal">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
                <span className="h-px w-10 bg-accent-500" />
                {p.home.admission} {currentYear}
              </p>
              <h2 className="mt-8 display-2 text-white">{heading("ctatitle", p.home.ctaTitle)}</h2>
              <p className="mt-6 text-lg text-brand-100/70">{heading("ctatext", p.home.ctaText)}</p>
            </div>
            <div className="flex flex-wrap gap-4 shrink-0">
              <Link
                href="/admissions"
                className="group inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-400 text-white font-semibold px-9 py-4.5 rounded-lg transition-colors"
              >
                {p.home.admission} {currentYear}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/murojaat"
                className="inline-flex items-center text-white/85 hover:text-white font-semibold px-9 py-4.5 rounded-lg border border-white/25 hover:border-white/50 transition-colors"
              >
                {p.common.appeal}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 10. FOYDALI HAVOLALAR — admin paneldan boshqariladi */}
      {linkBlocks.length > 0 && (
        <section className="bg-white dark:bg-slate-900 py-24 lg:py-28 transition-colors">
          <Container>
            <SectionHeading
              eyebrow={p.home.resourcesEyebrow}
              title={heading("usefullinks", p.home.usefulLinks)}
              subtitle={headingDesc("usefullinks", p.home.usefulLinksSubtitle)}
              className="reveal"
            />
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-6 reveal-stagger">
              {linkBlocks.map((link) => (
                <a
                  key={link.slug}
                  href={link.link ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lift panel group rounded-xl p-7"
                >
                  <p className="text-xl font-semibold text-ink-900 dark:text-white flex items-center gap-2">
                    {link.title}
                    <ArrowUpRight className="w-4 h-4 text-ink-300 group-hover:text-brand-900 dark:group-hover:text-brand-300 group-hover:-translate-y-0.5 transition-all" />
                  </p>
                  <p className="mt-3 text-sm text-ink-600 dark:text-slate-400">
                    {stripHtml(link.desc)}
                  </p>
                </a>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* 11. HAMKORLAR */}
      {partners.length > 0 && (
        <section className="bg-mist-100 dark:bg-slate-950 py-20 transition-colors">
          <Container>
            <SectionHeading title={p.titles.partners} align="center" className="mb-14" />
          </Container>
          <Marquee durationSec={35} gapClassName="gap-16">
            {partners.map((partner) => {
              const logo = pickImage(partner.photo, "sm");
              const content = (
                <div className="h-20 w-40 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
                  <RemoteImage
                    src={logo}
                    alt={partner.title || "Hamkor"}
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
                  className="shrink-0"
                >
                  {content}
                </a>
              ) : (
                <div key={partner.id} title={partner.title || ""} className="shrink-0">
                  {content}
                </div>
              );
            })}
          </Marquee>
        </section>
      )}
    </>
  );
}
