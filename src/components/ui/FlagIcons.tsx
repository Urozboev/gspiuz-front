import React from "react";
import type { Language } from "@/context/AppContext";

/**
 * Til tanlash uchun bayroqlar — inline SVG.
 * Tashqi rasm yuklanmaydi, har qanday o'lchamda tiniq chiqadi.
 */
type FlagProps = { className?: string };

/** O'zbekiston: ko'k–oq–yashil, qizil ajratuvchi, yarim oy va 12 yulduz. */
export function UzFlag({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <rect width="30" height="6.2" fill="#0099b5" />
      <rect y="13.8" width="30" height="6.2" fill="#1eb53a" />
      <rect y="6" width="30" height="0.6" fill="#ce1126" />
      <rect y="13.4" width="30" height="0.6" fill="#ce1126" />
      <g fill="#fff">
        <circle cx="5.6" cy="3.1" r="2.1" />
        <circle cx="6.6" cy="3.1" r="2.1" fill="#0099b5" />
        {/* Yulduzlar — uch qatorda 3 + 4 + 5 */}
        <g>
          <circle cx="10.2" cy="1.5" r="0.36" />
          <circle cx="12.2" cy="1.5" r="0.36" />
          <circle cx="14.2" cy="1.5" r="0.36" />
          <circle cx="9.2" cy="3.1" r="0.36" />
          <circle cx="11.2" cy="3.1" r="0.36" />
          <circle cx="13.2" cy="3.1" r="0.36" />
          <circle cx="15.2" cy="3.1" r="0.36" />
          <circle cx="10.2" cy="4.7" r="0.36" />
          <circle cx="12.2" cy="4.7" r="0.36" />
          <circle cx="14.2" cy="4.7" r="0.36" />
          <circle cx="8.2" cy="4.7" r="0.36" />
          <circle cx="16.2" cy="3.1" r="0.36" />
        </g>
      </g>
    </svg>
  );
}

/** Rossiya: oq–ko'k–qizil. */
export function RuFlag({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#fff" />
      <rect y="6.67" width="30" height="6.66" fill="#0039a6" />
      <rect y="13.33" width="30" height="6.67" fill="#d52b1e" />
    </svg>
  );
}

/** Buyuk Britaniya: Union Jack. */
export function EnFlag({ className = "w-5 h-3.5" }: FlagProps) {
  return (
    <svg viewBox="0 0 30 20" className={className} aria-hidden="true">
      <rect width="30" height="20" fill="#012169" />
      {/* Diagonal oq va qizil chiziqlar */}
      <path d="M0 0 30 20M30 0 0 20" stroke="#fff" strokeWidth="4" />
      <path
        d="M0 0 30 20M30 0 0 20"
        stroke="#c8102e"
        strokeWidth="2.4"
        clipPath="url(#uk-clip)"
      />
      <clipPath id="uk-clip">
        <path d="M15 10 30 10 30 20zM15 10 15 20 0 20zM15 10 0 10 0 0zM15 10 15 0 30 0z" />
      </clipPath>
      {/* To'g'ri xoch */}
      <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6.6" />
      <path d="M15 0v20M0 10h30" stroke="#c8102e" strokeWidth="4" />
    </svg>
  );
}

/** Til kodi bo'yicha bayroqni tanlaydi. */
export function LanguageFlag({
  lang,
  className,
}: {
  lang: Language;
  className?: string;
}) {
  if (lang === "ru") return <RuFlag className={className} />;
  if (lang === "en") return <EnFlag className={className} />;
  return <UzFlag className={className} />;
}
