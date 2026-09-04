"use client";

import { useEffect, useState } from "react";

/** Rasmlar almashish oralig'i. */
const SLIDE_MS = 7000;

/** Yangi rasmga o'tish davomiyligi. */
const FADE_MS = 1000;

/** Fon rasmi. `srcSet` faqat mahalliy zaxira rasm uchun beriladi. */
export interface HeroImage {
  src: string;
  srcSet?: string;
  sizes?: string;
}

/**
 * Bosh sahifa hero'sining fon rasmlari.
 *
 * Rasmlar admin paneldagi bannerlardan keladi. Bir nechta bo'lsa
 * ular sekin almashib turadi. Chap tomonda matn o'qilishi uchun
 * ko'k qatlam qo'yiladi, o'ngga borgan sari u ochiladi va rasm ko'rinadi.
 */
export default function HeroBackground({
  images,
  alt,
}: {
  images: HeroImage[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;

    // Harakatni kamaytirish yoqilgan bo'lsa rasmlarni almashtirmaymiz.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      SLIDE_MS,
    );
    return () => clearInterval(timer);
  }, [images.length, paused]);

  return (
    <>
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {images.map((image, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.src}
            src={image.src}
            srcSet={image.srcSet}
            sizes={image.sizes}
            alt={i === 0 ? alt : ""}
            /* Birinchi rasm sahifa ochilishida darhol kerak. */
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className="absolute inset-0 h-full w-full object-cover object-center transition-opacity ease-in-out"
            style={{
              opacity: i === active ? 1 : 0,
              transitionDuration: `${FADE_MS}ms`,
            }}
          />
        ))}

        {/*
         * Chapdan o'ngga ochiladigan ko'k qatlam. Matn turgan chap yarmi
         * to'liq qoplangan, o'ngga borgan sari ochilib rasm ko'rinadi.
         * Mobilda matn butun kenglikni egallagani uchun alohida, qalinroq
         * qatlam ishlatiladi (`lg` dan pastda).
         */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to right, #0a1547 0%, rgb(10 21 71 / 0.94) 55%, rgb(10 21 71 / 0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, #0a1547 0%, #0a1547 32%, rgb(10 21 71 / 0.82) 52%, rgb(10 21 71 / 0.28) 78%, rgb(15 30 107 / 0.12) 100%)",
          }}
        />

        {/* Past chekkani biroz qoraytirish — keyingi bo'limga silliq o'tish uchun. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-950 to-transparent" />
      </div>

      {/* Nuqtali indikator — rasm bir nechta bo'lgandagina. */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 lg:right-10 z-20 flex items-center gap-1">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              aria-label={`${i + 1}`}
              aria-current={i === active}
              onClick={() => {
                setActive(i);
                // Qo'lda tanlangach avtomatik almashishni to'xtatamiz.
                setPaused(true);
              }}
              className="group flex h-11 items-center px-2"
            >
              <span
                className={`block h-2 rounded-full transition-all ${
                  i === active
                    ? "w-7 bg-accent-400"
                    : "w-2 bg-white/35 group-hover:bg-white/70"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
