"use client";

import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { INSTITUTE } from "@/lib/config";
import { appeal as appealDict } from "@/locales/sections";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  const { t, p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  const dict = appealDict[language];

  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  const email = siteInfo?.email || INSTITUTE.email;
  const address = siteInfo?.address || INSTITUTE.address;
  const workTime = siteInfo?.work_time || INSTITUTE.workTime;
  const map = siteInfo?.map;

  const infoCards = [
    { icon: MapPin, label: p.common.address, value: address },
    { icon: Phone, label: p.common.phone, value: phone, href: `tel:${phone}` },
    { icon: Mail, label: p.common.email, value: email, href: `mailto:${email}` },
    { icon: Clock, label: p.common.workTime, value: workTime },
  ];

  return (
    <>
      <PageHero
        title={p.titles.contact}
        subtitle="Institut bilan bog'lanish uchun rekvizitlar, joylashuv va aloqa formasi."
        crumbs={[{ label: p.titles.contact }]}
        icon={<Phone className="w-6 h-6" />}
      />

      {/* Aloqa ma'lumotlari */}
      <Section>
        <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card) => (
            <div key={card.label} className="panel rounded-xl p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-brand-900 dark:text-brand-300">
                <card.icon className="w-5 h-5" />
              </span>
              <p className="mt-7 text-sm text-ink-400">{card.label}</p>
              {card.href ? (
                <a
                  href={card.href}
                  className="mt-2 block text-lg text-ink-900 dark:text-slate-100 hover:text-brand-900 dark:hover:text-brand-300 transition-colors"
                >
                  {card.value}
                </a>
              ) : (
                <p className="mt-2 text-lg text-ink-900 dark:text-slate-100">
                  {card.value}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Forma va xarita */}
      <Section tone="mist">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-10 reveal-left">
            <h2 className="display-3 text-ink-900 dark:text-white">
              {t.contactPage.feedbackTitle}
            </h2>
            <p className="mt-4 text-base text-ink-600 dark:text-slate-400">
              Umumiy savollar uchun shu formadan foydalaning. Rasmiy murojaat
              yubormoqchi bo&apos;lsangiz, murojaatlar bo&apos;limiga o&apos;ting.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <div className="lg:col-span-6 reveal-right">
            {map ? (
              <div
                className="h-full min-h-[26rem] rounded-xl overflow-hidden [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:min-h-[26rem] [&_iframe]:border-0"
                // Xarita iframe kodi admin paneldan keladi (siteinfo.map).
                dangerouslySetInnerHTML={{ __html: map }}
              />
            ) : (
              <div className="h-full min-h-[26rem] rounded-xl bg-white dark:bg-slate-900 flex flex-col items-center justify-center text-center p-10">
                <MapPin className="w-8 h-8 text-ink-300" />
                <p className="mt-5 text-base text-ink-600 dark:text-slate-400 max-w-xs">
                  {address}
                </p>
                <a
                  href={`https://yandex.uz/maps/?text=${encodeURIComponent(address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 transition-colors"
                >
                  {p.common.openMap}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Rasmiy murojaat */}
      <Section tone="brand">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-accent-300">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="mt-7 display-3 text-white">{dict.formTitle}</h2>
            <p className="mt-5 text-lg text-brand-100/70">
              Rasmiy murojaatlar ro&apos;yxatga olinadi, ariza raqami beriladi va
              qonunchilikda belgilangan muddatlarda ko&apos;rib chiqiladi.
            </p>
          </div>
          <Link
            href="/murojaat"
            className="group shrink-0 inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-400 text-white font-semibold px-9 py-4.5 rounded-lg transition-colors"
          >
            {p.common.appeal}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>
    </>
  );
}
