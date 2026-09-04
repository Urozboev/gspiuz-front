"use client";

import Link from "next/link";
import {
  Laptop,
  BookMarked,
  Home,
  CalendarDays,
  Award,
  Briefcase,
  GraduationCap,
  Trophy,
  Leaf,
  Clock,
  MessageSquare,
  HelpCircle,
  FileText,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { EXTERNAL_LINKS } from "@/lib/config";
import { extraPages, navExtra, sectionPages } from "@/locales/sections";
import PageHero from "@/components/ui/PageHero";
import { Section, FeatureGrid, LinkList } from "@/components/ui/InfoBlocks";

/**
 * Talabalarga — talabalar hayoti bo'yicha markaziy sahifa.
 * Bu yerdan barcha tegishli bo'limlar va tashqi tizimlarga o'tiladi.
 */
export default function StudentsPage() {
  const { t, p } = useT();
  const { language } = useApp();
  const ex = extraPages[language];
  const navT = navExtra[language];
  const sp = sectionPages[language];

  /** Kundalik ishlatiladigan tizimlar. */
  const portals = [
    {
      icon: Laptop,
      title: t.nav.hemis,
      desc: "Baholar, dars jadvali va o'quv jarayoni bo'yicha shaxsiy kabinet.",
      href: EXTERNAL_LINKS.hemis,
    },
    {
      icon: BookMarked,
      title: navT.library,
      desc: "Darsliklar, ilmiy adabiyotlar va elektron resurslar to'plami.",
      href: EXTERNAL_LINKS.library,
    },
    {
      icon: CalendarDays,
      title: ex.studySchedule.title,
      desc: "Joriy semestr uchun mashg'ulotlar jadvali va o'zgarishlar.",
      href: "/study-schedule",
    },
    {
      icon: FileText,
      title: ex.syllabus.title,
      desc: "Fanlar bo'yicha sillabuslar va o'quv-uslubiy majmualar.",
      href: "/syllabus",
    },
  ];

  /** Talabalar hayoti bo'limlari. */
  const life = [
    {
      icon: Home,
      title: navT.dormitory,
      desc: t.studentsPage.dormDesc,
      href: "/dormitory",
    },
    {
      icon: Trophy,
      title: navT.talentedStudents,
      desc: "Olimpiada, tanlov va ilmiy anjumanlarda muvaffaqiyat qozongan talabalar.",
      href: "/talented-students",
    },
    {
      icon: Clock,
      title: ex.informationHours.title,
      desc: "Talabalar bilan o'tkaziladigan axborot soatlari mavzulari va jadvali.",
      href: "/information-hours",
    },
    {
      icon: Leaf,
      title: ex.ecoStudents.title,
      desc: "Ekologik harakatda faol ishtirok etuvchi talabalar va loyihalari.",
      href: "/eco-students",
    },
    {
      icon: Briefcase,
      title: ex.career.title,
      desc: "Amaliyot, ishga joylashish va karyera bo'yicha xizmatlar.",
      href: "/career",
    },
    {
      icon: Award,
      title: t.studentsPage.scholarshipTitle,
      desc: t.studentsPage.scholarshipDesc,
    },
  ];

  /** Qo'shimcha havolalar. */
  const links = [
    { label: p.common.appeal, href: "/murojaat" },
    { label: p.titles.faq, href: "/faq" },
    { label: p.titles.vacancies, href: "/vacancies" },
    { label: p.titles.programs, href: "/educational-programs" },
    { label: navT.tutors, href: "/tutors" },
  ];

  return (
    <>
      <PageHero
        title={t.studentsPage.title}
        subtitle="Talabalar uchun zarur tizimlar, xizmatlar va bo'limlar — bir sahifada."
        crumbs={[{ label: t.nav.students }]}
        icon={<GraduationCap className="w-6 h-6" />}
      />

      {/* Tizimlar */}
      <Section>
        <h2 className="display-3 text-ink-900 dark:text-white">O&apos;quv jarayoni</h2>
        <p className="mt-5 text-lg text-ink-600 dark:text-slate-400 max-w-2xl">
          Kunlik o&apos;qish uchun kerak bo&apos;ladigan tizimlar va o&apos;quv hujjatlari.
        </p>
        <div className="mt-12">
          <FeatureGrid items={portals} columns={4} tone="mist" />
        </div>
      </Section>

      {/* Talabalar hayoti */}
      <Section tone="mist">
        <h2 className="display-3 text-ink-900 dark:text-white">{navT.studentLife}</h2>
        <p className="mt-5 text-lg text-ink-600 dark:text-slate-400 max-w-2xl">
          Turar joy, to&apos;garaklar, ekologik harakat va karyera imkoniyatlari.
        </p>
        <div className="mt-12">
          <FeatureGrid items={life} columns={3} tone="white" />
        </div>
      </Section>

      {/* Murojaat chaqiriqi */}
      <Section tone="brand">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-accent-300">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="mt-7 display-3 text-white">Savolingiz bormi?</h2>
            <p className="mt-5 text-lg text-brand-100/70">
              Tyutoringizga yoki tegishli bo&apos;limga murojaat qiling — murojaatingiz
              ro&apos;yxatga olinadi va belgilangan muddatda javob beriladi.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/murojaat?type=tutor"
              className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-400 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              {p.common.appeal}
            </Link>
            <Link
              href="/faq"
              className="inline-flex items-center gap-3 text-white/85 hover:text-white font-semibold px-8 py-4 rounded-lg border border-white/25 hover:border-white/50 transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              {p.titles.faq}
            </Link>
          </div>
        </div>
      </Section>

      {/* Tegishli bo'limlar */}
      <Section>
        <h2 className="display-3 text-ink-900 dark:text-white mb-10">
          {sp.labels.relatedLinks}
        </h2>
        <LinkList items={links} />
      </Section>
    </>
  );
}
