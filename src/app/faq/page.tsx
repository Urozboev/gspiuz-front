"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, Plus, MessageSquare, ArrowRight } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Paginated, Faq } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import { Section, PendingNotice } from "@/components/ui/InfoBlocks";
import { useApp } from "@/context/AppContext";
import { sectionPages } from "@/locales/sections";
import { Spinner, ErrorState } from "@/components/ui/States";

export default function FaqPage() {
  const { p } = useT();
  const { language } = useApp();
  const sp = sectionPages[language];

  const [open, setOpen] = useState<number | null>(null);
  const { data, loading, error, notFound, refetch } = useApi<Paginated<Faq>>("/faq");
  const items = data?.data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.faq}
        subtitle={p.subtitles.faq}
        crumbs={[{ label: p.titles.faq }]}
        icon={<HelpCircle className="w-6 h-6" />}
      />

      <Container className="py-20 lg:py-28 max-w-4xl">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || items.length === 0 ? (
          <PendingNotice text={sp.pending} />
        ) : (
          <ul className="flex flex-col gap-3">
            {items.map((item) => {
              const isOpen = open === item.id;
              return (
                <li
                  key={item.id}
                  className="panel rounded-xl overflow-hidden transition-colors"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-6 px-8 py-7 text-left"
                    >
                      <span className="text-lg font-medium text-ink-900 dark:text-white leading-snug">
                        {item.question}
                      </span>
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white dark:bg-slate-800 text-brand-900 dark:text-brand-300 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                  </h3>
                  {/* Javob grid-template-rows orqali silliq ochiladi */}
                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-8 pb-8 text-base text-ink-600 dark:text-slate-400">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Container>

      {/* Javob topilmadimi */}
      <Section tone="brand">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl">
            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/10 text-accent-300">
              <MessageSquare className="w-5 h-5" />
            </span>
            <h2 className="mt-7 display-3 text-white">
              Javobini topa olmadingizmi?
            </h2>
            <p className="mt-5 text-lg text-brand-100/70">
              Savolingizni murojaat sifatida yuboring — ariza raqami beriladi va
              belgilangan muddatda javob olasiz.
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
