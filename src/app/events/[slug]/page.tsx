"use client";

import { use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Tag,
  ArrowUpRight,
} from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { useApi } from "@/hooks/useApi";
import { endpoints } from "@/lib/endpoints";
import { formatDate, pickImage } from "@/lib/format";
import { events as dict } from "@/locales/sections";
import type { CalendarEvent, Paginated } from "@/lib/types";
import Container from "@/components/ui/Container";
import RemoteImage from "@/components/ui/RemoteImage";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";
import { EventRow } from "@/components/EventsCalendar";

/** Bitta tadbir sahifasi. */
export default function EventDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { p, lang } = useT();
  const { language } = useApp();
  const text = dict[language] ?? dict.uz;

  const {
    data: res,
    loading,
    error,
    notFound,
    refetch,
  } = useApi<{ data: CalendarEvent } | CalendarEvent>(endpoints.event(slug));

  // Backend ba'zi endpointlarda {data: …}, ba'zilarida to'g'ridan-to'g'ri obyekt beradi.
  const event =
    res && "data" in (res as { data?: unknown })
      ? (res as { data: CalendarEvent }).data
      : (res as CalendarEvent | undefined);

  const { data: allRes } = useApi<Paginated<CalendarEvent>>(endpoints.events);
  const todayKey = new Date().toISOString().slice(0, 10);
  const others = (allRes?.data ?? [])
    .filter((e) => e.slug !== slug && (e.end_date ?? e.date) >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  const cover = !event
    ? null
    : typeof event.image === "string"
      ? event.image
      : pickImage(event.image, "lg");

  // Ko'p kunlik tadbir bo'lsa sana oralig'i ko'rsatiladi.
  const dateLabel = event
    ? event.end_date && event.end_date !== event.date
      ? `${formatDate(event.date, lang)} — ${formatDate(event.end_date, lang)}`
      : formatDate(event.date, lang)
    : "";

  return (
    <div className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-28 transition-colors">
      <Container>
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:text-accent-500 mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          {text.title}
        </Link>

        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !event ? (
          <EmptyState
            title={p.common.notFound}
            description={p.common.notFoundDesc}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <article className="lg:col-span-8 bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-xl">
              {event.type && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 dark:bg-brand-950/40 text-brand-900 dark:text-brand-300 rounded text-sm">
                  <Tag className="w-3 h-3" />
                  {event.type}
                </span>
              )}

              <h1 className="mt-4 display-2 text-ink-900 dark:text-white">
                {event.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-2 text-base text-ink-600 dark:text-ink-400">
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-brand-900 dark:text-brand-300" />
                  {dateLabel}
                </span>
                {event.time && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-900 dark:text-brand-300" />
                    {event.time}
                  </span>
                )}
                {event.location && (
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-900 dark:text-brand-300" />
                    {event.location}
                  </span>
                )}
              </div>

              {cover && (
                <div className="mt-9 rounded-xl overflow-hidden">
                  <RemoteImage
                    src={cover}
                    alt={event.title ?? ""}
                    className="w-full object-cover"
                  />
                </div>
              )}

              {event.desc && (
                <div
                  className="article-content mt-9"
                  dangerouslySetInnerHTML={{ __html: event.desc }}
                />
              )}

              {event.url && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-10 inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-semibold text-base px-7 py-4 rounded-xl transition-colors"
                >
                  {p.common.more}
                  <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </article>

            {others.length > 0 && (
              <aside className="lg:col-span-4">
                <h2 className="text-xl font-semibold text-ink-900 dark:text-white">
                  {text.upcoming}
                </h2>
                <ul className="mt-6 flex flex-col gap-4">
                  {others.map((other) => (
                    <li key={other.id}>
                      <p className="mb-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                        {formatDate(other.date, lang)}
                      </p>
                      <EventRow event={other} />
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
