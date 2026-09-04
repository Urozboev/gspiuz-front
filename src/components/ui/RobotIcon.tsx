import React from "react";

/**
 * AI yordamchi uchun robot belgisi.
 *
 * Tashqi rasm o'rniga inline SVG: hajmi kichik, har qanday o'lchamda tiniq
 * chiqadi va gradientlar hisobiga yassi ikonkadan ko'ra hajmliroq ko'rinadi.
 */
export default function RobotIcon({
  className = "",
  idPrefix = "robot",
}: {
  className?: string;
  /** Bitta sahifada bir nechta nusxa bo'lsa, gradient id'lari to'qnashmasligi uchun. */
  idPrefix?: string;
}) {
  const head = `${idPrefix}-head`;
  const visor = `${idPrefix}-visor`;
  const shine = `${idPrefix}-shine`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={head} x1="18" y1="12" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="0.55" stopColor="#e8edf9" />
          <stop offset="1" stopColor="#c3cee6" />
        </linearGradient>
        <linearGradient id={visor} x1="20" y1="24" x2="44" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2f6fed" />
          <stop offset="1" stopColor="#0f1e6b" />
        </linearGradient>
        <linearGradient id={shine} x1="22" y1="16" x2="34" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Antenna */}
      <path d="M32 8v6" stroke="#9dbaf6" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="6" r="3" fill="#2f6fed" />
      <circle cx="31" cy="5" r="1" fill="#ffffff" opacity="0.85" />

      {/* Quloqchalar */}
      <rect x="8" y="30" width="5" height="12" rx="2.5" fill="#c3cee6" />
      <rect x="51" y="30" width="5" height="12" rx="2.5" fill="#c3cee6" />

      {/* Bosh */}
      <rect x="13" y="14" width="38" height="36" rx="12" fill={`url(#${head})`} />

      {/* Vizor */}
      <rect x="19" y="22" width="26" height="17" rx="8.5" fill={`url(#${visor})`} />

      {/* Ko'zlar */}
      <circle cx="26.5" cy="30.5" r="3.2" fill="#ffffff" />
      <circle cx="37.5" cy="30.5" r="3.2" fill="#ffffff" />
      <circle cx="27.2" cy="31.2" r="1.4" fill="#0f1e6b" />
      <circle cx="38.2" cy="31.2" r="1.4" fill="#0f1e6b" />

      {/* Tabassum */}
      <path
        d="M27 44.5c1.6 1.4 3.3 2.1 5 2.1s3.4-.7 5-2.1"
        stroke="#8894ad"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Yorug'lik dog'i — hajm hissi uchun */}
      <path
        d="M19 20c2-3 6-5 10-5.5-5 2.5-8.5 6.5-9.5 11-1-1.5-1.3-3.6-.5-5.5z"
        fill={`url(#${shine})`}
      />
    </svg>
  );
}
