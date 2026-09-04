"use client";

import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { endpoints } from "@/lib/endpoints";
import { formatDate } from "@/lib/format";
import { events as dict } from "@/locales/sections";
import type { CalendarEvent, Paginated } from "@/lib/types";
import Container from "@/components/ui/Container";
import { EventRow } from "@/components/EventsCalendar";

/** Bosh sahifadagi "yaqin tadbirlar" bloki. Tadbir bo'lmasa ko'rinmaydi. */
export default function UpcomingEvents() {
  const { lang } = useT();
  const { language } = useApp();
  const text = dict[language] ?? dict.uz;

  const { data } = useApi<Paginated<CalendarEvent>>(endpoints.events);
  const items = data?.data ?? [];

  const todayKey = new Date().toISOString().slice(0, 10);
  const upcoming = items
    .filter((e) => (e.end_date ?? e.date) >= todayKey)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  if (upcoming.length === 0) return null;

  return (
    <section className="bg-mist-100 dark:bg-slate-950 py-20 lg:py-24 transition-colors">
      <Container>
        <div className="flex items-end justify-between gap-8 flex-wrap reveal">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-900 dark:text-brand-300">
              <CalendarDays className="w-4 h-4" />
              {text.title}
            </p>
            <h2 className="mt-4 display-2 text-ink-900 dark:text-white">
              {text.upcoming}
            </h2>
          </div>

          <Link
            href="/events"
            className="hidden sm:inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300 hover:gap-3.5 transition-all"
          >
            {text.allEvents}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <ul className="mt-12 reveal-stagger grid sm:grid-cols-2 gap-4">
          {upcoming.map((event) => (
            <li key={event.id}>
              <p className="mb-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                {formatDate(event.date, lang)}
              </p>
              <EventRow event={event} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
