"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { MessageSquare, Phone, Mail, Clock, ShieldAlert, UserRound } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { INSTITUTE } from "@/lib/config";
import { appeal as appealDict } from "@/locales/sections";
import { usePageBlocks } from "@/hooks/usePageBlocks";
import type { AppealType } from "@/lib/types";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { Section, ContactStrip, PageBody } from "@/components/ui/InfoBlocks";
import AppealForm from "@/components/AppealForm";
import AppealStatusCheck from "@/components/AppealStatusCheck";

const APPEAL_TYPES = [
  {
    key: "rector" as const,
    icon: UserRound,
    title: "Rektorga murojaat",
    desc: "Institut faoliyatiga oid taklif, ariza va shikoyatlar rektor nomiga yuboriladi.",
  },
  {
    key: "tutor" as const,
    icon: MessageSquare,
    title: "Tyutorga murojaat",
    desc: "Talabalar turmushi, o'quv jarayoni va guruh masalalari bo'yicha tyutorga murojaat.",
  },
  {
    key: "compliance" as const,
    icon: ShieldAlert,
    title: "Komplayensga murojaat",
    desc: "Korrupsiya holatlari va manfaatlar to'qnashuvi bo'yicha komplayens-nazorat bo'limiga xabar berish.",
  },
];

/** URL'dagi `?type=` qiymatini tekshiradi. */
function resolveType(value: string | null): AppealType {
  return APPEAL_TYPES.some((t) => t.key === value)
    ? (value as AppealType)
    : "rector";
}

function MurojaatContent() {
  const { p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  const searchParams = useSearchParams();

  const dict = appealDict[language];
  const activeType = resolveType(searchParams.get("type"));

  /*
   * Murojaat turlari funksional (formaga ?type= beradi), shuning uchun ular
   * kodda qoladi. Sarlavha va tavsif esa admin paneldan olinadi — mavjud
   * bo'lsa tartib bo'yicha mos keladi.
   */
  const { blocks, page } = usePageBlocks("murojaat");

  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  const email = siteInfo?.email || INSTITUTE.email;
  const workTime = siteInfo?.work_time || INSTITUTE.workTime;

  return (
    <>
      <PageHero
        title={p.common.appeal}
        subtitle={dict.heroLead}
        crumbs={[{ label: p.common.appeal }]}
        icon={<MessageSquare className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelda "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {/* Murojaat turlari */}
      <Section>
        <div className="grid sm:grid-cols-3 gap-6">
          {APPEAL_TYPES.map((type, index) => {
            const isActive = type.key === activeType;
            const block = blocks[index];
            const title = block?.title || type.title;
            const desc = block?.desc || type.desc;
            return (
              <a
                key={type.key}
                href={`?type=${type.key}#forma`}
                className={`rounded-xl p-8 transition-colors ${
                  isActive
                    ? "bg-brand-900 text-white"
                    : "panel hover:bg-mist-200 dark:hover:bg-slate-800"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-white/15 text-accent-300"
                      : "bg-white dark:bg-slate-800 text-brand-900 dark:text-brand-300"
                  }`}
                >
                  <type.icon className="w-5 h-5" />
                </span>
                <h2
                  className={`mt-7 text-xl font-semibold ${
                    isActive ? "text-white" : "text-ink-900 dark:text-white"
                  }`}
                >
                  {title}
                </h2>
                <p
                  className={`mt-3 text-base ${
                    isActive ? "text-brand-100/75" : "text-ink-600 dark:text-slate-400"
                  }`}
                >
                  {desc}
                </p>
              </a>
            );
          })}
        </div>
      </Section>

      {/* Forma va aloqa */}
      <section
        id="forma"
        className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28 transition-colors scroll-mt-24"
      >
        <Container>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl p-8 sm:p-10">
              <h2 className="display-3 text-ink-900 dark:text-white">
                {dict.formTitle}
              </h2>
              <p className="mt-4 text-base text-ink-600 dark:text-slate-400">
                {dict.formLead}
              </p>
              <div className="mt-8">
                {/* Turi almashganda forma qayta yaratilsin */}
                <AppealForm key={activeType} defaultType={activeType} />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="bg-brand-900 text-white rounded-xl p-8 sm:p-10">
                <h2 className="display-3">Bevosita aloqa</h2>
                <div className="mt-8">
                  <ContactStrip
                    columns={1}
                    rows={[
                      {
                        icon: Phone,
                        label: p.common.phone,
                        value: phone,
                        href: `tel:${phone}`,
                      },
                      {
                        icon: Mail,
                        label: p.common.email,
                        value: email,
                        href: `mailto:${email}`,
                      },
                      { icon: Clock, label: p.common.workTime, value: workTime },
                    ]}
                  />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Holat tekshirish */}
      <Section tone="brand">
        <div className="max-w-3xl">
          <h2 className="display-3 text-white">{dict.checkTitle}</h2>
          <p className="mt-4 text-lg text-brand-100/70">{dict.checkLead}</p>
          <div className="mt-8">
            <AppealStatusCheck />
          </div>
        </div>
      </Section>
    </>
  );
}

export default function MurojaatPage() {
  return (
    <Suspense fallback={null}>
      <MurojaatContent />
    </Suspense>
  );
}
