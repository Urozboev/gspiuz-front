"use client";

import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import RemoteImage from "@/components/ui/RemoteImage";
import { formatDate, pickImage, normalizeMediaUrl, stripHtml, truncate } from "@/lib/format";
import { useT } from "@/hooks/useT";
import type { ImageSet, PageCard } from "@/lib/types";

/** Rasm maydoni ImageSet yoki oddiy satr bo'lishi mumkin. */
function cardImage(image: PageCard["image"]): string | null {
  if (!image) return null;
  if (typeof image === "string") return normalizeMediaUrl(image);
  return pickImage(image as ImageSet, "md");
}

/**
 * `layout: "cards"` — yangiliklarga o'xshash kartochkalar to'ri.
 * Har bir kartochka bosilganda o'z sahifasiga o'tadi: `/{pageSlug}/{card.slug}`.
 */
export default function PageCardGrid({
  pageSlug,
  cards,
}: {
  pageSlug: string;
  cards: PageCard[];
}) {
  const { lang } = useT();

  if (cards.length === 0) return null;

  return (
    <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => {
        const image = cardImage(card.image);
        const summary = card.desc ? truncate(stripHtml(card.desc), 140) : null;

        return (
          <Link
            key={card.slug}
            href={`/${pageSlug}/${card.slug}`}
            className="lift group bg-white dark:bg-slate-900 rounded-xl overflow-hidden flex flex-col"
          >
            {image && (
              <div className="relative h-52 w-full overflow-hidden bg-mist-200 dark:bg-slate-800">
                <RemoteImage
                  src={image}
                  alt={card.title || ""}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="p-7 flex flex-col flex-grow">
              {card.date && (
                <span className="flex items-center gap-2 text-xs text-ink-400">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {formatDate(card.date, lang)}
                </span>
              )}

              <h3 className="mt-3 font-display text-lg font-semibold text-ink-900 dark:text-white leading-snug line-clamp-2">
                {card.title}
              </h3>

              {summary && (
                <p className="mt-4 text-base text-ink-600 dark:text-slate-400 line-clamp-3">
                  {summary}
                </p>
              )}

              <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                <span className="h-px w-8 bg-accent-500 group-hover:w-12 transition-all" />
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
