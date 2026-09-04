"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";

interface RemoteImageProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  /** Rasm yo'q bo'lganda ko'rsatiladigan ikonka o'lchami. */
  iconClassName?: string;
}

/**
 * Backenddan kelgan (dinamik domen) rasmlar uchun komponent.
 * next/image emas — chunki backend domeni o'zgaruvchan. Yuklanish skeleti va
 * xatolik holatini o'zi boshqaradi.
 */
export default function RemoteImage({
  src,
  alt,
  className = "",
  iconClassName = "w-8 h-8",
}: RemoteImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div
        className={`flex items-center justify-center bg-mist-200 dark:bg-slate-800 text-ink-300 dark:text-slate-600 ${className}`}
        aria-label={alt}
      >
        <ImageOff className={iconClassName} />
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div
          className={`absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-800 ${className}`}
        />
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
      />
    </>
  );
}
