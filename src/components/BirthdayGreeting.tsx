"use client";

import { useState } from "react";
import { Cake, ChevronDown } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp, type Language } from "@/context/AppContext";
import { endpoints } from "@/lib/endpoints";
import { normalizeMediaUrl } from "@/lib/format";
import type { BirthdayPerson } from "@/lib/types";
import Container from "@/components/ui/Container";
import RemoteImage from "@/components/ui/RemoteImage";

interface BirthdayText {
  eyebrow: string;
  one: string;
  many: string;
  /** Yoshni tilga mos yozadi (rus tilida son shakli o'zgaradi). */
  age: (n: number) => string;
  /** Yashirilgan xodimlarni ochish tugmasi. */
  showMore: (n: number) => string;
}

const TEXT: Record<Language, BirthdayText> = {
  uz: {
    eyebrow: "Bugungi tabrik",
    one: "Tug'ilgan kuningiz muborak!",
    many: "Tug'ilgan kunlaringiz muborak!",
    age: (n) => `${n} yosh`,
    showMore: (n) => `Yana ${n} nafar xodim`,
  },
  ru: {
    eyebrow: "Поздравление дня",
    one: "С днём рождения!",
    many: "С днём рождения!",
    age: (n) => `${n} ${russianYears(n)}`,
    showMore: (n) => `Ещё ${n} сотрудников`,
  },
  en: {
    eyebrow: "Today's greeting",
    one: "Happy birthday!",
    many: "Happy birthday!",
    age: (n) => `${n} years`,
    showMore: (n) => `${n} more staff`,
  },
};

/** Rus tilida "год / года / лет" shaklini tanlaydi. */
function russianYears(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 14) return "лет";
  switch (n % 10) {
    case 1:
      return "год";
    case 2:
    case 3:
    case 4:
      return "года";
    default:
      return "лет";
  }
}

/*
 * Bir kunda ko'p xodimning tug'ilgan kuni bo'lishi mumkin (ayniqsa katta
 * institutda). Shuncha kartani birdan chizsak bo'lim sahifani egallab
 * ketadi — shuning uchun avval shuncha ko'rsatiladi, qolgani tugma bilan.
 */
const VISIBLE_LIMIT = 6;

/**
 * Bugun tug'ilgan kuni bo'lgan xodimlar tabrigi.
 *
 * Ma'lumot `employs.birthday` maydonidan avtomatik olinadi — qo'lda
 * qo'shish shart emas. Bugun hech kimning tug'ilgan kuni bo'lmasa,
 * blok umuman ko'rinmaydi.
 */
export default function BirthdayGreeting() {
  const { language } = useApp();
  const text = TEXT[language] ?? TEXT.uz;
  const [expanded, setExpanded] = useState(false);

  const { data } = useApi<{ data: BirthdayPerson[] }>(endpoints.birthdays);
  const people = data?.data ?? [];

  if (people.length === 0) return null;

  const hidden = Math.max(0, people.length - VISIBLE_LIMIT);
  const visible = expanded ? people : people.slice(0, VISIBLE_LIMIT);

  /*
   * Bitta odam bo'lsa sarlavha va karta yonma-yon chiroyli turadi.
   * Ko'p bo'lsa sarlavha tepaga chiqib, kartalar to'r bo'lib joylashadi —
   * aks holda ular bir qatorga sig'may ketadi.
   */
  const single = people.length === 1;

  return (
    <section className="bg-brand-900 py-14 lg:py-16">
      <Container>
        <div
          className={
            single
              ? "flex flex-col lg:flex-row lg:items-center gap-10"
              : "flex flex-col gap-10"
          }
        >
          <div className="shrink-0">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-300">
              <span className="h-px w-10 bg-accent-500" />
              {text.eyebrow}
            </p>
            <h2 className="mt-5 display-3 text-white flex items-center gap-4">
              <Cake className="w-8 h-8 text-accent-300 shrink-0" />
              {single ? text.one : text.many}
            </h2>
          </div>

          <div className={single ? "lg:ml-auto" : ""}>
            <ul
              className={
                single
                  ? "flex"
                  : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              }
            >
              {visible.map((person) => (
                <li
                  key={person.id}
                  className="flex items-center gap-4 bg-white/10 rounded-xl p-4 pr-7 backdrop-blur-sm"
                >
                  <span className="h-14 w-14 shrink-0 rounded-lg overflow-hidden bg-white/15">
                    <RemoteImage
                      src={normalizeMediaUrl(person.photo)}
                      alt={person.full_name ?? ""}
                      className="h-full w-full object-cover object-top"
                      iconClassName="w-5 h-5"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-white leading-snug">
                      {person.full_name}
                    </p>
                    <p className="mt-0.5 text-sm text-brand-200/70 truncate">
                      {[
                        person.position,
                        person.age ? text.age(person.age) : null,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {hidden > 0 && !expanded && (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="group mt-6 inline-flex items-center gap-2 text-base font-semibold text-accent-300 hover:text-white transition-colors"
              >
                {text.showMore(hidden)}
                <ChevronDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
