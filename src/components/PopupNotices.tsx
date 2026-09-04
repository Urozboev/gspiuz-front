"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { pickImage, normalizeMediaUrl } from "@/lib/format";
import type { ImageSet, PopupNotice } from "@/lib/types";
import RemoteImage from "@/components/ui/RemoteImage";

/** Yopilgan xabarlar shu kalit ostida saqlanadi. */
const STORAGE_KEY = "gspi_seen_popups";

/** Sahifa chizilib bo'lgach ochiladi — kontent yuklanishini to'smaydi. */
const OPEN_DELAY_MS = 1200;

/*
 * Backend sekin javob bersa xabar foydalanuvchi o'qishni boshlagandan keyin
 * ochilib, xalaqit berardi. Shu muddatdan kech kelgan javob e'tiborsiz qoldiriladi.
 */
const MAX_OPEN_AFTER_MS = 8000;

/** Rasm maydoni ImageSet yoki oddiy satr bo'lishi mumkin. */
function noticeImage(image: PopupNotice["image"]): string | null {
  if (!image) return null;
  if (typeof image === "string") return normalizeMediaUrl(image);
  return pickImage(image as ImageSet, "lg");
}

/**
 * Bugun uchun ko'rilgan xabarlar ro'yxatini o'qiydi.
 * Sana o'zgarganda ro'yxat tozalanadi — ertasi kuni xabar yana ko'rsatiladi.
 */
function readSeen(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { date: string; ids: number[] };
    const today = new Date().toISOString().slice(0, 10);
    return parsed.date === today ? parsed.ids : [];
  } catch {
    return [];
  }
}

function markSeen(ids: number[]) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date: new Date().toISOString().slice(0, 10), ids }),
    );
  } catch {
    /* localStorage yopiq bo'lishi mumkin — bu holda xabar har safar ko'rinadi */
  }
}

/**
 * Saytga kirilganda ochiladigan xabarlar oynasi.
 *
 * Kontent admin paneldan boshqariladi. Bir nechta xabar bo'lsa,
 * ular slider ko'rinishida almashadi. Yopilgan xabarlar shu kun davomida
 * qayta ko'rsatilmaydi.
 */
export default function PopupNotices() {
  const { p } = useT();

  // Xabarlar `bootstrap` bilan birga keladi — alohida so'rov yuborilmaydi.
  const { popups } = useSiteInfo();
  // useMemo — aks holda har renderda yangi havola effektlarni qayta ishga tushiradi.
  const notices = useMemo(() => popups ?? [], [popups]);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Sahifa ochilgan payt — kechikkan javobni aniqlash uchun.
  const mountedAt = useRef(0);
  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  // Ko'rilmagan xabarlar bo'lsa, biroz kechikib ochamiz.
  useEffect(() => {
    if (notices.length === 0) return;
    const seen = readSeen();
    const unseen = notices.filter((n) => !seen.includes(n.id));
    if (unseen.length === 0) return;
    if (mountedAt.current && Date.now() - mountedAt.current > MAX_OPEN_AFTER_MS) {
      return;
    }

    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [notices]);

  const close = useCallback(() => {
    setOpen(false);
    markSeen(notices.map((n) => n.id));
  }, [notices]);

  // Esc bilan yopish va ochiq turganda sahifa skrollini to'xtatish.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % notices.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + notices.length) % notices.length);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close, notices.length]);

  if (!open || notices.length === 0) return null;

  const notice = notices[index];
  const image = noticeImage(notice.image);
  const isExternal = notice.url ? /^https?:\/\//.test(notice.url) : false;
  const hasSlider = notices.length > 1;

  //  matn bo'lsa tugma yozuvi sifatida, aks holda standart matn.
  const actionLabel =
    typeof notice.action === "string" && notice.action.trim()
      ? notice.action.trim()
      : p.common.readMore;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={notice.title ?? ""}
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto overscroll-contain p-4 sm:p-6"
    >
      {/* Fon — bosilganda yopiladi */}
      <button
        type="button"
        aria-label={p.common.back}
        onClick={close}
        className="absolute inset-0 bg-brand-950/70 backdrop-blur-sm animate-fade-in-up"
      />

      {/*
        Oyna ekrandan baland bo'lsa ichi suriladi — aks holda past ekranli
        qurilmalarda yopish tugmasiga ham, tugmalarga ham yetib bo'lmaydi.
        `my-auto` — bo'sh joy yetarli bo'lsa oyna markazda turadi.
      */}
      <div className="relative my-auto flex w-full max-w-2xl flex-col max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-3rem)] bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl animate-fade-in-up">
        <button
          type="button"
          onClick={close}
          aria-label={p.common.back}
          className="absolute top-3 right-3 z-20 h-11 w-11 rounded-full bg-brand-950/70 text-white hover:bg-brand-950 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {image && (
          <div className="relative h-40 max-h-[30vh] sm:h-72 sm:max-h-[35vh] w-full shrink-0 bg-mist-200 dark:bg-slate-800">
            <RemoteImage
              src={image}
              alt={notice.title ?? ""}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="min-h-0 flex-grow overflow-y-auto p-6 sm:p-10">
          {notice.title && (
            <h2 className="display-3 text-ink-900 dark:text-white">{notice.title}</h2>
          )}

          {notice.desc && (
            <div
              className="article-content mt-5"
              // Matn admin panel muharriridan keladi.
              dangerouslySetInnerHTML={{ __html: notice.desc }}
            />
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {notice.url &&
              (isExternal ? (
                <a
                  href={notice.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="group inline-flex items-center gap-3 bg-brand-900 hover:bg-brand-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                >
                  {actionLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              ) : (
                <Link
                  href={notice.url}
                  onClick={close}
                  className="group inline-flex items-center gap-3 bg-brand-900 hover:bg-brand-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
                >
                  {actionLabel}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}

            {/* Slider boshqaruvi */}
            {hasSlider && (
              <div className="ml-auto flex items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setIndex((i) => (i - 1 + notices.length) % notices.length)
                  }
                  aria-label="Oldingi"
                  className="h-10 w-10 rounded-lg panel text-brand-900 dark:text-brand-300 hover:bg-mist-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1.5">
                  {notices.map((item, i) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`${i + 1}`}
                      aria-current={i === index}
                      className={`h-2 rounded-full transition-all ${
                        i === index
                          ? "w-6 bg-brand-900 dark:bg-brand-300"
                          : "w-2 bg-ink-300 dark:bg-slate-600 hover:bg-ink-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % notices.length)}
                  aria-label="Keyingi"
                  className="h-10 w-10 rounded-lg panel text-brand-900 dark:text-brand-300 hover:bg-mist-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
