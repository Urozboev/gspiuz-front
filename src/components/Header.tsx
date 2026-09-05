"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { EXTERNAL_LINKS, INSTITUTE } from "@/lib/config";
import { navExtra, admissions, extraPages, events as eventsDict } from "@/locales/sections";
import type { MenuItem } from "@/lib/types";
import AccessibilityMenu from "./AccessibilityMenu";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import {
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  MessageSquare,
  ExternalLink,
} from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}
interface NavItem {
  label: string;
  href?: string;
  dropdown?: NavLink[];
}

export default function Header() {
  const { language } = useApp();
  const { t, p } = useT();
  const { siteInfo, menu } = useSiteInfo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenItem, setMobileOpenItem] = useState<string | null>(null);
  const pathname = usePathname();

  // Menyu va qabul bo'limi yorliqlari (samdpi.uz / jdpu.uz tuzilishi).
  const navT = navExtra[language];
  const adm = admissions[language];
  const ex = extraPages[language];
  const evt = eventsDict[language];

  // Menyu `bootstrap` bilan birga keladi — alohida so'rov yuborilmaydi.
  const menuData = menu;

  /*
   * Belgilangan (fallback) menyu — admin menyusi bo'sh/yuklanmaganda ishlatiladi.
   * Tuzilma samdpi.uz saytidagi bo'limlar tartibiga moslashtirilgan:
   * Institut → Ta'lim → Axborot xizmati → Faoliyat → Talabalar hayoti → Qabul.
   */
  const fallbackNav: NavItem[] = [
    { label: t.nav.home, href: "/" },
    {
      label: t.nav.institute,
      dropdown: [
        { label: t.nav.about, href: "/about" },
        { label: ex.instituteHistory.title, href: "/institute-history" },
        { label: p.titles.leadership, href: "/leadership" },
        { label: t.nav.structure, href: "/structure" },
        { label: navT.departments, href: "/departments" },
        { label: navT.councils, href: "/councils" },
        { label: navT.regulations, href: "/documents" },
        { label: navT.requisites, href: "/requisites" },
        { label: navT.openData, href: "/open-data" },
        { label: p.titles.partners, href: "/partners" },
      ],
    },
    {
      label: navT.education,
      dropdown: [
        { label: t.nav.faculties, href: "/faculties" },
        { label: t.nav.chairs, href: "/kafedralar" },
        { label: p.programs.bachelor, href: "/educational-programs?level=bachelor" },
        { label: p.programs.master, href: "/educational-programs?level=master" },
        { label: p.titles.programs, href: "/educational-programs" },
        { label: ex.studyPlans.title, href: "/study-plans" },
        { label: ex.studySchedule.title, href: "/study-schedule" },
        { label: ex.syllabus.title, href: "/syllabus" },
        { label: ex.qualificationRequirements.title, href: "/qualification-requirements" },
        { label: ex.eResources.title, href: "/e-resources" },
        { label: navT.tutors, href: "/tutors" },
      ],
    },
    {
      label: navT.pressService,
      dropdown: [
        { label: p.titles.news, href: "/news" },
        { label: p.titles.announcements, href: "/announcements" },
        { label: p.titles.videoNews, href: "/news/video" },
        { label: ex.gallery.title, href: "/gallery" },
        { label: evt.title, href: "/events" },
        { label: p.titles.contact, href: "/contact" },
      ],
    },
    {
      label: navT.activity,
      dropdown: [
        { label: navT.research, href: "/research" },
        { label: p.titles.journals, href: "/journals" },
        { label: ex.conferences.title, href: "/conferences" },
        { label: navT.internationalCooperation, href: "/international" },
        { label: ex.spiritual.title, href: "/spiritual" },
        { label: ex.greenInstitute.title, href: "/green-institute" },
        { label: navT.antiCorruption, href: "/anti-corruption" },
      ],
    },
    {
      label: navT.studentLife,
      dropdown: [
        { label: t.studentsPage.title, href: "/students" },
        { label: navT.dormitory, href: "/dormitory" },
        { label: navT.talentedStudents, href: "/talented-students" },
        { label: ex.ecoStudents.title, href: "/eco-students" },
        { label: ex.informationHours.title, href: "/information-hours" },
        { label: ex.career.title, href: "/career" },
        { label: ex.employers.title, href: "/employers" },
        { label: p.titles.vacancies, href: "/vacancies" },
        { label: p.titles.faq, href: "/faq" },
        { label: navT.library, href: EXTERNAL_LINKS.library, isExternal: true },
        { label: t.nav.hemis, href: EXTERNAL_LINKS.hemis, isExternal: true },
      ],
    },
    {
      label: `${t.nav.admissions} ${new Date().getFullYear()}`,
      dropdown: [
        { label: adm.tabs.commission, href: "/admissions" },
        { label: p.programs.bachelor, href: "/admissions?tab=bachelor" },
        { label: p.programs.master, href: "/admissions?tab=master" },
        { label: adm.tabs.second, href: "/admissions?tab=second" },
        { label: adm.tabs.foreign, href: "/admissions?tab=foreign" },
      ],
    },
  ];

  // Menyu elementidan havola manzilini aniqlash.
  const resolveHref = (m: MenuItem): string => {
    if (m.path && m.path.trim()) return m.path.trim();
    if (m.slug && m.slug.trim()) return `/${m.slug.replace(/^\//, "")}`;
    return "#";
  };
  const isExt = (href: string) => /^https?:\/\//.test(href);

  // Admin menyusini NavItem strukturasiga aylantirish.
  const dynamicNav: NavItem[] = (menuData ?? [])
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((m) => {
      const kids = (m.children ?? [])
        .slice()
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      if (kids.length > 0) {
        return {
          label: m.title ?? "",
          dropdown: kids
            .map((c) => {
              const href = resolveHref(c);
              return { label: c.title ?? "", href, isExternal: isExt(href) };
            })
            .filter((c) => c.label),
        };
      }
      return { label: m.title ?? "", href: resolveHref(m) };
    })
    .filter((n) => n.label);

  // Admin menyusi mavjud bo'lsa — o'shani, aks holda belgilangan menyuni ishlatamiz.
  const navItems: NavItem[] = dynamicNav.length > 0 ? dynamicNav : fallbackNav;

  // Zaxira raqam config'dan olinadi — footer bilan bir manba bo'lsin.
  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  // Call markaz alohida bo'lishi mumkin; kiritilmagan bo'lsa asosiy raqam.
  const callCenter = siteInfo?.call_center?.trim() || phone;

  // Ijtimoiy tarmoqlar — faqat manzili kiritilganlari ko'rsatiladi.
  const socials = [
    { icon: TelegramIcon, href: siteInfo?.telegram, title: "Telegram" },
    { icon: InstagramIcon, href: siteInfo?.instagram, title: "Instagram" },
    { icon: FacebookIcon, href: siteInfo?.facebook, title: "Facebook" },
    {
      icon: YoutubeIcon,
      href: siteInfo?.youtube || siteInfo?.yt_url,
      title: "YouTube",
    },
  ].filter((s) => s.href);

  return (
    <header className="w-full z-40 relative">
      {/* 1. TOP BAR */}
      <div className="bg-brand-950 text-brand-100/80 border-b border-white/10 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-6">
          {/* Chap: yuguruvchi qator */}
          <div className="flex-1 overflow-hidden relative h-5 flex items-center md:max-w-md">
            <div className="animate-marquee whitespace-nowrap text-accent-300 text-sm font-medium select-none">
              {siteInfo?.tagline || t.tagline} · {t.callCenter}: {callCenter} ·{" "}
              {siteInfo?.slogan || t.since}
            </div>
          </div>

          {/* O'ng: ijtimoiy tarmoqlar · telefon · imkoniyatlar · til */}
          <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-5">
            {socials.length > 0 && (
              <>
                <div className="hidden sm:flex items-center gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.title}
                      href={s.href as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.title}
                      aria-label={s.title}
                      className="h-8 w-8 rounded-full border border-white/25 text-brand-100/80 hover:text-white hover:border-white/60 hover:bg-white/10 flex items-center justify-center transition-colors"
                    >
                      <s.icon className="w-3.5 h-3.5" />
                    </a>
                  ))}
                </div>
                <span className="hidden sm:block h-6 w-px bg-white/15" />
              </>
            )}

            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 text-brand-100/90 hover:text-white transition-colors"
            >
              <span className="h-8 w-8 rounded-full border border-white/25 flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <span className="hidden lg:inline text-sm font-semibold tabular-nums">
                {phone}
              </span>
            </a>

            <span className="hidden sm:block h-6 w-px bg-white/15" />

            <div className="flex items-center rounded-lg text-brand-100/90">
              <AccessibilityMenu />
            </div>

            <span className="hidden sm:block h-6 w-px bg-white/15" />

            <LanguageSwitcher />
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <Image
              src="/brand/logo.png"
              alt={t.instituteName}
              width={64}
              height={64}
              priority
              className="w-14 h-14 object-contain group-hover:scale-105 transition-transform"
            />
            {/* Nom gerbning o'zida yozilgan — takrorlamaymiz, faqat skrin o'quvchilar uchun qoldiramiz. */}
            <span className="sr-only">{t.instituteName}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item, idx) => {
              if (item.dropdown) {
                return (
                  <div key={idx} className="relative group py-2">
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-900 dark:hover:text-brand-300 transition-colors rounded-lg">
                      {item.label}
                      <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                    </button>
                    <div className="absolute left-0 mt-1 w-60 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl p-2 hidden group-hover:block z-50">
                      {item.dropdown.map((sub, sIdx) =>
                        sub.isExternal ? (
                          <a
                            key={sIdx}
                            href={sub.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between w-full px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-900 dark:hover:text-brand-300 rounded-lg transition-all"
                          >
                            <span>{sub.label}</span>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                        ) : (
                          <Link
                            key={sIdx}
                            href={sub.href}
                            className="block w-full px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-900 dark:hover:text-brand-300 rounded-lg transition-all"
                          >
                            {sub.label}
                          </Link>
                        ),
                      )}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === item.href;
              return (
                <Link
                  key={idx}
                  href={item.href || "/"}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    isActive
                      ? "text-brand-900 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40"
                      : "text-slate-700 dark:text-slate-200 hover:text-brand-900 dark:hover:text-brand-300 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/murojaat"
              className="hidden md:flex items-center gap-1.5 bg-brand-900 hover:bg-brand-800 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              {p.common.appeal}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 xl:hidden text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {navItems.map((item, idx) => {
              if (item.dropdown) {
                const isDropped = mobileOpenItem === item.label;
                return (
                  <div
                    key={idx}
                    className="border-b border-slate-100 dark:border-slate-800/60 pb-2"
                  >
                    <button
                      onClick={() =>
                        setMobileOpenItem(isDropped ? null : item.label)
                      }
                      className="flex items-center justify-between w-full py-2 px-3 text-sm font-semibold text-slate-900 dark:text-white"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isDropped ? "rotate-180 text-brand-700" : ""
                        }`}
                      />
                    </button>
                    {isDropped && (
                      <div className="pl-4 mt-1 flex flex-col gap-1.5 border-l-2 border-accent-500 bg-slate-50 dark:bg-slate-800/50 p-2 rounded">
                        {item.dropdown.map((sub, sIdx) =>
                          sub.isExternal ? (
                            <a
                              key={sIdx}
                              href={sub.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between py-1.5 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-900"
                            >
                              <span>{sub.label}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                            </a>
                          ) : (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-1.5 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-brand-900"
                            >
                              {sub.label}
                            </Link>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <Link
                  key={idx}
                  href={item.href || "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2.5 px-3 text-sm font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800/60"
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/murojaat"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 bg-brand-900 text-white font-semibold text-sm py-3.5 rounded-lg"
            >
              <MessageSquare className="w-4 h-4" />
              {p.common.appeal}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
