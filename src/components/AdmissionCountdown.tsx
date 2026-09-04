"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, ArrowRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { countdown as dict } from "@/locales/sections";
import Container from "@/components/ui/Container";

/** Qolgan vaqt — kun/soat/daqiqa/soniya. */
interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function remainingUntil(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** `YYYY-MM-DD` sanani kun oxiriga (23:59:59) qo'yib millisekundga aylantiradi. */
function endOfDay(date: string | null | undefined): number | null {
  if (!date) return null;
  const parsed = new Date(`${date}T23:59:59`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
}

/** `YYYY-MM-DD` sanani kun boshiga qo'yadi. */
function startOfDay(date: string | null | undefined): number | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00`);
  return Number.isNaN(parsed.getTime()) ? null : parsed.getTime();
}

/**
 * Hujjat qabuli hisoblagichi.
 *
 * Sanalar `siteinfo` dan keladi (`admission_starts_at`, `admission_ends_at`).
 * Sana kiritilmagan yoki muddat tugagan bo'lsa blok ko'rinmaydi.
 */
export default function AdmissionCountdown() {
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  const text = dict[language] ?? dict.uz;

  const startsAt = startOfDay(siteInfo?.admission_starts_at);
  const endsAt = endOfDay(siteInfo?.admission_ends_at);

  /*
   * Hisob faqat brauzerda yuritiladi — serverda va klientda vaqt farq qilishi
   * hidratsiya nomuvofiqligiga olib keladi. `mounted` shuning uchun kerak.
   */
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || (!startsAt && !endsAt)) return null;

  // Qaysi bosqichda ekanini aniqlaymiz.
  const beforeStart = startsAt !== null && now < startsAt;
  const ended = endsAt !== null && now > endsAt;
  const target = beforeStart ? startsAt : endsAt;

  if (ended || target === null) {
    // Muddat tugagan bo'lsa blokni ko'rsatmaymiz — eskirgan ma'lumot foydasiz.
    return null;
  }

  const left = remainingUntil(target);
  const units: { value: number; label: string }[] = [
    { value: left.days, label: text.days },
    { value: left.hours, label: text.hours },
    { value: left.minutes, label: text.minutes },
    { value: left.seconds, label: text.seconds },
  ];

  const title = beforeStart ? text.beforeTitle : text.duringTitle;
  const lead = beforeStart ? text.beforeLead : text.duringLead;
  const href = siteInfo?.admission_url || "/admissions";

  return (
    <section className="bg-brand-900 py-14 lg:py-16">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-10">
          <div className="max-w-md">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
              <CalendarClock className="w-4 h-4" />
              {title}
            </p>
            <p className="mt-5 text-lg text-brand-100/75">{lead}</p>
            <Link
              href={href}
              className="group mt-6 inline-flex items-center gap-2 text-base font-semibold text-white hover:text-accent-300 transition-colors"
            >
              {text.more}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:ml-auto grid grid-cols-4 gap-3 sm:gap-4">
            {units.map((unit) => (
              <div
                key={unit.label}
                className="bg-white/10 rounded-xl px-4 py-5 sm:px-7 sm:py-6 text-center backdrop-blur-sm"
              >
                <p className="font-display text-3xl sm:text-5xl font-semibold text-white leading-none tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-brand-200/70">
                  {unit.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
