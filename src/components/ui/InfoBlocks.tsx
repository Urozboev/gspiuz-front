"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, FileText, FileDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatDate } from "@/lib/format";
import { useT } from "@/hooks/useT";
import type { DocumentItem } from "@/lib/types";
import Container from "./Container";

/** Bo'lim o'rami — oq yoki ochiq kulrang fonda, bir xil vertikal masofa bilan. */
export function Section({
  tone = "white",
  className = "",
  children,
}: {
  tone?: "white" | "mist" | "brand";
  className?: string;
  children: React.ReactNode;
}) {
  const bg =
    tone === "mist"
      ? "bg-mist-100 dark:bg-slate-950"
      : tone === "brand"
        ? "bg-brand-950"
        : "bg-white dark:bg-slate-900";

  return (
    <section className={`${bg} py-20 lg:py-28 transition-colors ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

export interface FeatureItem {
  icon?: LucideIcon;
  title: string;
  desc?: string;
  href?: string;
}

/** Ikonka + sarlavha + tavsifdan iborat kartochkalar to'ri. */
export function FeatureGrid({
  items,
  columns = 3,
  tone = "mist",
}: {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
  /** Kartochka foni: bo'lim foniga qarama-qarshi tanlanadi. */
  tone?: "mist" | "white";
}) {
  if (items.length === 0) return null;

  const cols =
    columns === 2
      ? "sm:grid-cols-2"
      : columns === 4
        ? "sm:grid-cols-2 lg:grid-cols-4"
        : "sm:grid-cols-2 lg:grid-cols-3";

  const surface =
    tone === "mist" ? "panel" : "bg-white dark:bg-slate-900";

  return (
    <div className={`reveal-stagger grid ${cols} gap-6`}>
      {items.map((item) => {
        const Icon = item.icon;
        const body = (
          <>
            {Icon && (
              <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300 group-hover:bg-brand-900 group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
              </span>
            )}
            <h3
              className={`text-xl font-semibold text-ink-900 dark:text-white leading-snug ${
                Icon ? "mt-7" : ""
              }`}
            >
              {item.title}
            </h3>
            {item.desc && (
              <p className="mt-4 text-base text-ink-600 dark:text-slate-400">
                {item.desc}
              </p>
            )}
            {item.href && (
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                <span className="h-px w-8 bg-accent-500 group-hover:w-12 transition-all" />
                <ArrowUpRight className="w-4 h-4" />
              </span>
            )}
          </>
        );

        const base = `group ${surface} rounded-xl p-8 flex flex-col`;

        // Tashqi manzillar yangi oynada ochiladi.
        const isExternal = item.href ? /^https?:\/\//.test(item.href) : false;

        if (!item.href) {
          return (
            <div key={item.title} className={base}>
              {body}
            </div>
          );
        }

        return isExternal ? (
          <a
            key={item.title}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`lift ${base}`}
          >
            {body}
          </a>
        ) : (
          <Link key={item.title} href={item.href} className={`lift ${base}`}>
            {body}
          </Link>
        );
      })}
    </div>
  );
}

/** Havolalar ro'yxati — bo'lim ichidagi ichki sahifalarga o'tish uchun. */
export function LinkList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link
            href={item.href}
            className="group flex items-center gap-5 py-6 border-t border-mist-200 dark:border-slate-800 hover:border-brand-900 dark:hover:border-brand-400 transition-colors"
          >
            <ChevronRight className="w-4 h-4 shrink-0 text-accent-500" />
            <span className="text-lg text-ink-900 dark:text-slate-100 group-hover:text-brand-900 dark:group-hover:text-brand-300 transition-colors">
              {item.label}
            </span>
            <ArrowUpRight className="w-5 h-5 text-ink-300 ml-auto shrink-0 group-hover:text-brand-900 dark:group-hover:text-brand-300 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Hujjatlar ro'yxati — yuklab olish yoki tashqi havola bilan. */
export function DocumentList({ items }: { items: DocumentItem[] }) {
  const { p, lang } = useT();

  if (items.length === 0) return null;

  return (
    <ul className="flex flex-col gap-3">
      {items.map((doc) => {
        const href = doc.file || doc.link;
        const inner = (
          <>
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300 group-hover:bg-brand-900 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </span>
            <span className="min-w-0 flex-grow">
              <span className="block text-lg text-ink-900 dark:text-slate-100 leading-snug">
                {doc.title}
              </span>
              {doc.date && (
                <span className="mt-1 block text-sm text-ink-400">
                  {formatDate(doc.date, lang)}
                </span>
              )}
            </span>
            {href && (
              <span className="hidden sm:inline-flex items-center gap-2 shrink-0 text-sm font-semibold text-brand-900 dark:text-brand-300">
                <FileDown className="w-4 h-4" />
                {p.common.download}
              </span>
            )}
          </>
        );

        const cls =
          "group bg-white dark:bg-slate-900 rounded-xl p-6 flex items-center gap-5 transition-colors hover:bg-mist-50 dark:hover:bg-slate-800/60";

        return (
          <li key={doc.id}>
            {href ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** To'q ko'k fonli aloqa bloki (telefon, manzil va h.k.). */
export function ContactStrip({
  rows,
  columns = 3,
}: {
  rows: { icon: LucideIcon; label: string; value: string; href?: string }[];
  /** Tor ustunlarda (masalan yon panelda) 1 ga tushiriladi. */
  columns?: 1 | 2 | 3;
}) {
  const cols =
    columns === 1
      ? "grid-cols-1"
      : columns === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${cols} gap-10`}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-start gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent-300">
            <row.icon className="w-5 h-5" />
          </span>
          <div>
            <p className="text-sm text-brand-200/60">{row.label}</p>
            {row.href ? (
              <a
                href={row.href}
                className="text-xl text-white hover:text-accent-300 transition-colors"
              >
                {row.value}
              </a>
            ) : (
              <p className="text-xl text-white">{row.value}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Kontent hali kiritilmagan bo'limlar uchun izoh. */
export function PendingNotice({ text }: { text: string }) {
  return (
    <p className="panel rounded-xl px-8 py-10 text-base text-ink-600 dark:text-slate-400">
      {text}
    </p>
  );
}

/**
 * Sahifaning asosiy matni (GET /pages/{slug} → body).
 *
 * Admin panelda "Sahifa matni" maydoniga yozilgan HTML shu yerda chiziladi.
 * Matn kiritilmagan bo'lsa hech narsa ko'rsatilmaydi — bo'sh bo'lim
 * chizishdan ko'ra uni butunlay yashirgan yaxshi.
 */
export function PageBody({ html }: { html?: string | null }) {
  if (!html || !html.trim()) return null;
  return (
    <Section>
      <div className="max-w-3xl article-content reveal">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Section>
  );
}
