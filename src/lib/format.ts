import type { ImageSet } from "./types";
import type { Language } from "@/context/AppContext";

/** Rasm to'plamidan eng mosini tanlaydi (lg → md → sm). */
/**
 * Backend rasm manzillarini o'z domenimizga bog'lab beradi.
 *
 * Laravel `url()` yordamida to'liq manzil qaytaradi (masalan
 * `http://127.0.0.1:8000/upload/...`). Bunday manzil brauzerda faqat dev'da
 * ishlaydi. Shuning uchun `/upload/...` qismini ajratib olamiz — uni Next
 * rewrite-proxy backendga uzatadi va sayt qaysi domenda turishidan qat'i nazar
 * rasm ochiladi.
 */
export function normalizeMediaUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(/\/upload\/.*/);
  return match ? match[0] : url;
}

export function pickImage(
  img: ImageSet | null | undefined,
  size: "lg" | "md" | "sm" = "lg",
): string | null {
  if (!img) return null;
  if (size === "lg") return normalizeMediaUrl(img.lg || img.md || img.sm);
  if (size === "md") return normalizeMediaUrl(img.md || img.lg || img.sm);
  return normalizeMediaUrl(img.sm || img.md || img.lg);
}

/** Postlar massividan birinchi rasmni oladi. */
export function firstImage(
  images: ImageSet[] | null | undefined,
  size: "lg" | "md" | "sm" = "lg",
): string | null {
  if (!images || images.length === 0) return null;
  return pickImage(images[0], size);
}

const LOCALES: Record<Language, string> = {
  uz: "uz-UZ",
  ru: "ru-RU",
  en: "en-US",
};

/*
 * Brauzerlarning bir qismida "uz-UZ" uchun oy nomlari yo'q va Intl
 * "2026 M08 3" ko'rinishidagi natija qaytaradi. Shuning uchun o'zbekcha
 * oy nomlarini o'zimiz beramiz.
 */
const UZ_MONTHS = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avgust",
  "sentabr",
  "oktabr",
  "noyabr",
  "dekabr",
];

/** Sanani o'qishga qulay formatga keltiradi (masalan, 15-iyun, 2026). */
export function formatDate(
  date: string | null | undefined,
  lang: Language = "uz",
): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  if (lang === "uz") {
    return `${d.getDate()}-${UZ_MONTHS[d.getMonth()]}, ${d.getFullYear()}`;
  }
  try {
    return d.toLocaleDateString(LOCALES[lang], {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return date;
  }
}

/** HTML teglarini olib tashlab, sof matn qaytaradi (qisqartmalar uchun). */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Matnni belgilangan uzunlikda qisqartiradi. */
export function truncate(text: string | null | undefined, length = 160): string {
  const clean = stripHtml(text);
  if (clean.length <= length) return clean;
  return clean.slice(0, length).trimEnd() + "…";
}

/** YouTube havolasidan video ID'sini ajratib oladi. */
export function youtubeId(url: string | null | undefined): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match ? match[1] : null;
}

/**
 * Ba'zi backend maydonlari obyekt ({uz,ru,en}), ba'zilari oddiy matn qaytaradi.
 * Ikkalasini ham xavfsiz tarzda joriy tildagi matnga aylantiradi.
 */
export function localized(
  value: Record<string, unknown> | string | null | undefined,
  lang: Language = "uz",
): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object") return String(value);

  /*
   * Tarjima obyekti odatda {uz, ru, en} ko'rinishida bo'ladi, lekin ba'zi
   * endpointlar bog'liq yozuvni ({id, name}) shu maydonga soladi. Shuning
   * uchun avval til kalitlari, so'ng `name`/`title` tekshiriladi va faqat
   * satr qiymat qaytariladi — aks holda chaqiruvchi tomonda `.trim()` kabi
   * amallar xato beradi.
   */
  const candidates = [
    value[lang],
    value.uz,
    value.name,
    value.title,
    ...Object.values(value),
  ];
  const found = candidates.find((v) => typeof v === "string" && v.trim());
  return typeof found === "string" ? found : "";
}

/**
 * Xom modeldan kelgan fayl nomidan rasm URL'ini quradi.
 * To'liq URL kelsa, u ham o'z domenimizga bog'lab beriladi.
 */
export function uploadUrl(
  file: string | null | undefined,
  folder = "images",
): string | null {
  if (!file) return null;
  if (file.startsWith("http") || file.startsWith("/upload")) {
    return normalizeMediaUrl(file);
  }
  return `/upload/${folder}/${file}`;
}

/** To'liq ism shakllantiradi (ism + familiya). */
export function fullName(
  first?: string | null,
  last?: string | null,
  surname?: string | null,
): string {
  return [last, first, surname].filter(Boolean).join(" ").trim();
}

/** Raqamni guruhlab formatlaydi (12450 → 12 450). */
export function formatNumber(
  value: string | number | null | undefined,
): string {
  if (value === null || value === undefined || value === "") return "—";
  const num = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(num)) return String(value);
  return num.toLocaleString("ru-RU").replace(/,/g, " ");
}

/**
 * Uzun sarlavhani ikki qatorga bo'ladi.
 *
 * Bosh sahifa hero'sida institut nomi ikki qatorda turishi kerak
 * ("Guliston davlat" / "pedagogika instituti"). Bo'linish so'zlar soni
 * bo'yicha o'rtadan qilinadi — shu sababli qoida uch tilda ham ishlaydi.
 * Ikki yoki undan kam so'z bo'lsa sarlavha bo'linmaydi.
 */
export function splitHeadline(title: string): string[] {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length < 3) return words.length ? [words.join(" ")] : [];
  const cut = Math.ceil(words.length / 2);
  return [words.slice(0, cut).join(" "), words.slice(cut).join(" ")];
}
