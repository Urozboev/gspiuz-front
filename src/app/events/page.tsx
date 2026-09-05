"use client";

import { CalendarDays } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { endpoints } from "@/lib/endpoints";
import { formatDate } from "@/lib/format";
import { events as dict, sectionPages } from "@/locales/sections";
import type { CalendarEvent, Paginated } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice } from "@/components/ui/InfoBlocks";
import EventsCalendar, { EventRow } from "@/components/EventsCalendar";
import { ErrorState, ListSkeleton } from "@/components/ui/States";

/** Tadbirlar kalendari — oylik to'r va yaqin tadbirlar ro'yxati. */
export default function EventsPage() {
  const { lang } = useT();
  const { language } = useApp();
  const text = dict[language] ?? dict.uz;
  const sp = sectionPages[language];

  const { data, loading, error, notFound, refetch } =
    useApi<Paginated<CalendarEvent>>(endpoints.events);
  const items = data?.data ?? [];

  // Bugundan keyingi tadbirlar, sana bo'yicha o'sish tartibida.
  const todayKey = new Date().toISOString().slice(0, 10);
  const upcoming = items
    .filter((e) => (e.end_date ?? e.date) >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <>
      <PageHero
        title={text.title}
        subtitle={text.subtitle}
        crumbs={[{ label: text.title }]}
        icon={<CalendarDays className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <ListSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || items.length === 0 ? (
          <PendingNotice text={sp.pending} />
        ) : (
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <EventsCalendar items={items} />
            </div>

            <aside className="lg:col-span-5">
              <h2 className="display-3 text-ink-900 dark:text-white">
                {text.upcoming}
              </h2>

              {upcoming.length === 0 ? (
                <p className="mt-8 text-base text-ink-400">{text.noEvents}</p>
              ) : (
                <ul className="mt-8 flex flex-col gap-4">
                  {upcoming.map((event) => (
                    <li key={event.id}>
                      <p className="mb-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                        {formatDate(event.date, lang)}
                      </p>
                      <EventRow event={event} />
                    </li>
                  ))}
                </ul>
              )}
            </aside>
          </div>
        )}
      </Section>
    </>
  );
}
