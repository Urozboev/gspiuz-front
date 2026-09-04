"use client";

import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  /** Animatsiya davomiyligi (soniya). Ko'p element bo'lsa kattaroq qo'ying. */
  durationSec?: number;
  className?: string;
  gapClassName?: string;
}

/**
 * Cheksiz (seamless) gorizontal slider. Kontentni ikki marta takrorlab,
 * uzluksiz aylanma effekt beradi. Hover'da to'xtaydi.
 */
export default function Marquee({
  children,
  durationSec = 35,
  className = "",
  gapClassName = "gap-12",
}: MarqueeProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Chetlarda yumshoq o'tish (fade) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-white dark:from-slate-900 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-white dark:from-slate-900 to-transparent" />
      <div
        className="marquee-track"
        style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
      >
        <div className={`flex items-center ${gapClassName} pr-12`}>{children}</div>
        <div className={`flex items-center ${gapClassName} pr-12`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
