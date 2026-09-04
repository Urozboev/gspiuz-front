"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useT } from "@/hooks/useT";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { useApp } from "@/context/AppContext";
import { INSTITUTE, SITE_URL } from "@/lib/config";
import { navExtra } from "@/locales/sections";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import {
  TelegramIcon,
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "@/components/ui/SocialIcons";

export default function Footer() {
  const { t, p } = useT();
  const { siteInfo } = useSiteInfo();
  const { language } = useApp();
  const navT = navExtra[language];
  const currentYear = new Date().getFullYear();

  const instituteLinks = [
    { label: t.nav.about, href: "/about" },
    { label: p.titles.leadership, href: "/leadership" },
    { label: t.nav.structure, href: "/structure" },
    { label: navT.departments, href: "/departments" },
    { label: navT.requisites, href: "/requisites" },
    { label: navT.openData, href: "/open-data" },
    { label: navT.antiCorruption, href: "/anti-corruption" },
  ];

  const sectionLinks = [
    { label: t.nav.faculties, href: "/faculties" },
    { label: t.nav.chairs, href: "/kafedralar" },
    { label: p.titles.programs, href: "/educational-programs" },
    { label: t.nav.admissions, href: "/admissions" },
    { label: navT.research, href: "/research" },
    { label: navT.internationalCooperation, href: "/international" },
    { label: p.titles.news, href: "/news" },
  ];

  const socials = [
    { icon: TelegramIcon, href: siteInfo?.telegram, title: "Telegram" },
    { icon: InstagramIcon, href: siteInfo?.instagram, title: "Instagram" },
    { icon: FacebookIcon, href: siteInfo?.facebook, title: "Facebook" },
    { icon: YoutubeIcon, href: siteInfo?.youtube || siteInfo?.yt_url, title: "YouTube" },
  ].filter((s) => s.href);

  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  const email = siteInfo?.email || INSTITUTE.email;
  const address = siteInfo?.address || t.contactPage.address;

  return (
    <footer className="bg-brand-950 text-brand-100/70 border-t border-white/10 transition-colors pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt={t.instituteName}
                width={44}
                height={44}
                className="w-11 h-11 object-contain bg-white rounded-full p-0.5"
              />
              <div>
                <h4 className="text-sm font-semibold text-white leading-tight uppercase tracking-wider">
                  {t.instituteShort}
                </h4>
                <p className="text-xs text-brand-200/60 font-medium">
                  {t.instituteName}
                </p>
              </div>
            </Link>
            <p className="text-xs text-brand-100/70 leading-relaxed max-w-sm">
              {p.footer.aboutText}
            </p>
            {socials.length > 0 && (
              <div className="flex items-center gap-3 mt-3">
                {socials.map((s, i) => (
                  <a
                    key={i}
                    href={s.href as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-accent-500 text-brand-50 hover:text-brand-950 flex items-center justify-center transition-colors"
                    title={s.title}
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Institute links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
              {t.nav.institute}
            </h3>
            <ul className="space-y-3 text-xs font-medium text-brand-100/70">
              {instituteLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Section links */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-5">
              {p.footer.sections}
            </h3>
            <ul className="space-y-3 text-xs font-medium text-brand-100/70">
              {sectionLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-accent-300 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-1">
              {t.nav.contact}
            </h3>
            <ul className="space-y-3.5 text-xs text-brand-100/70 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-500 shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent-500 shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-accent-300 transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-accent-300 transition-colors">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-accent-500 shrink-0" />
                <span>{siteInfo?.work_time || INSTITUTE.workTime}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-brand-200/50 font-medium pt-8 gap-6">
          <p className="order-2 md:order-1 text-center md:text-left">
            © {currentYear} {t.instituteName}. {p.footer.allRights}.
          </p>

          <div className="order-1 md:order-2 flex items-center gap-6">
            <Link href="/faq" className="hover:text-accent-300 transition-colors">
              {p.titles.faq}
            </Link>
            <Link href="/contact" className="hover:text-accent-300 transition-colors">
              {t.nav.contact}
            </Link>

            {/*
              uz.uz reyting sanagichi — O'zbekiston veb-saytlari uchun standart.
              Banner tashqi manbadan yuklanadi, shuning uchun oddiy <img> ishlatiladi.
            */}
            <a
              href="http://www.uz/ru/res/visitor/index?id=47422"
              target="_blank"
              rel="noopener noreferrer"
              title="Топ рейтинг www.uz"
              className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://cnt0.www.uz/counter/collect?id=47422&pg=${encodeURIComponent(SITE_URL)}&&col=7DC53B&t=ffffff&p=DD444E`}
                width={88}
                height={31}
                alt="Топ рейтинг www.uz"
                loading="lazy"
                className="rounded-sm"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
