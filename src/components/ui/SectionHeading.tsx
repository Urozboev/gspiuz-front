import React from "react";

interface SectionHeadingProps {
  /** Sarlavha ustidagi kichik yorliq (masalan, "Axborot xizmati"). */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

/**
 * Bo'lim sarlavhasi.
 * Etalon saytlardagi kabi yirik, o'rtacha qalinlikdagi va zich terilgan —
 * ustida oltin nuqta bilan ajratilgan kichik yorliq turadi.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`${isCenter ? "text-center mx-auto" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p
          className={`flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand-900 dark:text-brand-300 ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
          {eyebrow}
        </p>
      )}
      <h2
        className={`display-2 text-ink-900 dark:text-white ${eyebrow ? "mt-4" : ""}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-lg text-ink-600 dark:text-slate-400 ${
            isCenter ? "max-w-2xl mx-auto" : "max-w-2xl"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
