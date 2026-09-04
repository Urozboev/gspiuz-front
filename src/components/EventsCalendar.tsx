"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin, Clock, ArrowUpRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { events as dict } from "@/locales/sections";
import type { CalendarEvent } from "@/lib/types";

/** Sanani `YYYY-MM-DD` ko'rinishiga keltiradi (mahalliy vaqt bo'yicha). */
function toKey(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/**
 * Tadbir qaysi kunlarda davom etishini qaytaradi.
 * Ko'p kunlik tadbir kalendarda har bir kuni belgilanadi.
 */
function eventDays(event: CalendarEvent): string[] {
  const start = new Date(`${event.date}T00:00:00`);
  if (Number.isNaN(start.getTime())) return [];

  const endRaw = event.end_date ? new Date(`${event.end_date}T00:00:00`) : start;
  const end = Number.isNaN(endRaw.getTime()) ? start : endRaw;

  const days: string[] = [];
  const cursor = new Date(start);
  // Juda uzun oraliqlardan himoya — ko'pi bilan 60 kun.
  let guard = 0;
  while (cursor <= end && guard < 60) {
    days.push(toKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
    guard += 1;
  }
  return days;
}

/**
 * Oylik kalendar to'ri.
 *
 * Tadbir bo'lgan kunlar belgilanadi, kun bosilganda o'sha kundagi
 * tadbirlar ro'yxati pastda ko'rinadi.
 */
export default function EventsCalendar({ items }: { items: CalendarEvent[] }) {
  const { language } = useApp();
  const text = dict[language] ?? dict.uz;

  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState<string | null>(null);

  /** Kun → o'sha kundagi tadbirlar. */
  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of items) {
      for (const day of eventDays(event)) {
        const list = map.get(day) ?? [];
        list.push(event);
        map.set(day, list);
      }
    }
    return map;
  }, [items]);

  /** Oy to'ri — dushanbadan boshlanadi, oldingi/keyingi oy kunlari bilan to'ldiriladi. */
  const grid = useMemo(() => {
    const year = cursor.getFullYear();
    const month = cursor.getMonth();
    const first = new Date(year, month, 1);

    // getDay(): yakshanba = 0. Dushanbani birinchi qilamiz.
    const offset = (first.getDay() + 6) % 7;
    const startDate = new Date(year, month, 1 - offset);

    return Array.from({ length: 42 }, (_, i) => {
      const date = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i,
      );
      return {
        key: toKey(date),
        day: date.getDate(),
        inMonth: date.getMonth() === month,
        isToday: toKey(date) === toKey(today),
      };
    });
  }, [cursor, today]);

  const selectedEvents = selected ? (byDay.get(selected) ?? []) : [];

  const shiftMonth = (delta: number) => {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + delta, 1));
    setSelected(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-6 sm:p-8">
      {/* Oy boshqaruvi */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-xl font-semibold text-ink-900 dark:text-white">
          {text.months[cursor.getMonth()]} {cursor.getFullYear()}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            aria-label={text.months[(cursor.getMonth() + 11) % 12]}
            className="h-10 w-10 rounded-lg panel text-brand-900 dark:text-brand-300 hover:bg-mist-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            aria-label={text.months[(cursor.getMonth() + 1) % 12]}
            className="h-10 w-10 rounded-lg panel text-brand-900 dark:text-brand-300 hover:bg-mist-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hafta kunlari */}
      <div className="mt-7 grid grid-cols-7 gap-1 text-center">
        {text.weekdays.map((day) => (
          <span key={day} className="py-2 text-sm text-ink-400">
            {day}
          </span>
        ))}
      </div>

      {/* Kunlar */}
      <div className="mt-1 grid grid-cols-7 gap-1">
        {grid.map((cell) => {
          const count = byDay.get(cell.key)?.length ?? 0;
          const isSelected = selected === cell.key;
          const hasEvents = count > 0;

          return (
            <button
              key={cell.key}
              type="button"
              disabled={!hasEvents}
              onClick={() => setSelected(isSelected ? null : cell.key)}
              aria-label={cell.key}
              aria-pressed={isSelected}
              className={`relative aspect-square rounded-lg flex flex-col items-center justify-center text-base transition-colors ${
                isSelected
                  ? "bg-brand-900 text-white"
                  : hasEvents
                    ? "bg-brand-900/8 dark:bg-brand-400/15 text-brand-900 dark:text-brand-300 hover:bg-brand-900/15"
                    : cell.inMonth
                      ? "text-ink-600 dark:text-slate-400"
                      : "text-ink-300 dark:text-slate-700"
              } ${cell.isToday && !isSelected ? "ring-2 ring-accent-500 ring-inset" : ""} ${
                hasEvents ? "" : "cursor-default"
              }`}
            >
              <span className="tabular-nums">{cell.day}</span>
              {hasEvents && (
                <span
                  className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                    isSelected ? "bg-accent-300" : "bg-accent-500"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tanlangan kundagi tadbirlar */}
      {selected && (
        <div className="mt-8 pt-8 border-t border-mist-200 dark:border-slate-800">
          {selectedEvents.length === 0 ? (
            <p className="text-base text-ink-400">{text.noEventsOnDay}</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {selectedEvents.map((event) => (
                <li key={`${selected}-${event.id}`}>
                  <EventRow event={event} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

/** Bitta tadbir qatori — kalendarda va "yaqin tadbirlar" ro'yxatida ishlatiladi. */
export function EventRow({ event }: { event: CalendarEvent }) {
  // Tashqi havola berilmagan bo'lsa, tadbirning o'z sahifasiga o'tamiz.
  const href = event.url || (event.slug ? `/events/${event.slug}` : null);

  const body = (
    <>
      <div className="min-w-0 flex-grow">
        <p className="text-lg text-ink-900 dark:text-slate-100 leading-snug">
          {event.title}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-ink-400">
          {event.time && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {event.time}
            </span>
          )}
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {event.location}
            </span>
          )}
        </div>
      </div>
      {href && (
        <ArrowUpRight className="w-5 h-5 shrink-0 text-ink-300 group-hover:text-brand-900 dark:group-hover:text-brand-300 group-hover:-translate-y-0.5 transition-all" />
      )}
    </>
  );

  const cls = "group flex items-start gap-5 panel rounded-lg p-5 transition-colors";

  return href ? (
    <Link href={href} className={`${cls} hover:bg-mist-200 dark:hover:bg-slate-700`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}
