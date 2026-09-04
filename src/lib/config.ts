/**
 * Loyiha bo'ylab ishlatiladigan asosiy konfiguratsiya qiymatlari.
 */

// API bazasi. Standart holatda Next rewrite-proxy orqali "/api".
export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "/api";

// Tashqi havolalar (institut tizimlari).
export const EXTERNAL_LINKS = {
  hemis: "https://hemis.gspi.uz",
  student: "https://student.gspi.uz",
  library: "https://unilibrary.uz",
  moodle: "https://moodle.gspi.uz",
} as const;

/**
 * Institutning rasmiy rekvizitlari.
 * Backend `/siteinfo` bo'sh bo'lganda zaxira qiymat sifatida ishlatiladi.
 */
export const INSTITUTE = {
  nameUz: "Guliston davlat pedagogika instituti",
  shortName: "GulDPI",
  foundedYear: 2022,
  phone: "+998 55 651 92 76",
  email: "info@gspi.uz",
  address:
    "120101, Sirdaryo viloyati, Guliston shahri, Talabalar ko'chasi, 49-uy",
  workTime: "Dushanba – Shanba, 08:30–13:00 / 14:00–18:00",
  telegram: "https://t.me/GulDPIUz",
} as const;

/**
 * Bosh sahifadagi "Tezkor havolalar" bloki.
 * Ro'yxat gspi.uz dagi amaldagi xizmatlar asosida tuzilgan.
 */
export const QUICK_LINKS = [
  {
    href: "/murojaat",
    external: false,
    label: {
      uz: "Rektorga murojaat",
      ru: "Обращение к ректору",
      en: "Appeal to the rector",
    },
  },
  {
    href: EXTERNAL_LINKS.hemis,
    external: true,
    label: { uz: "HEMIS", ru: "HEMIS", en: "HEMIS" },
  },
  {
    href: EXTERNAL_LINKS.student,
    external: true,
    label: {
      uz: "Talaba portali",
      ru: "Портал студента",
      en: "Student portal",
    },
  },
  {
    href: "/murojaat?type=tutor",
    external: false,
    label: {
      uz: "Tyutorga murojaat",
      ru: "Обращение к тьютору",
      en: "Appeal to the tutor",
    },
  },
  {
    href: EXTERNAL_LINKS.library,
    external: true,
    label: {
      uz: "Elektron kutubxona",
      ru: "Электронная библиотека",
      en: "Digital library",
    },
  },
  {
    href: "/murojaat?type=compliance",
    external: false,
    label: {
      uz: "Komplayensga murojaat",
      ru: "Обращение в комплаенс",
      en: "Compliance appeal",
    },
  },
] as const;

// localStorage kalitlari.
export const STORAGE_KEYS = {
  lang: "gspi_lang",
  contrast: "gspi_contrast",
  fontSize: "gspi_font_size",
} as const;

/** Saytning rasmiy nomi — sahifa sarlavhalari shabloni uchun. */
export const SITE_NAME = "Guliston davlat pedagogika instituti";

/**
 * Saytning ommaviy manzili — SEO metama'lumotlari, sitemap va robots.txt uchun.
 * Prod'da NEXT_PUBLIC_SITE_URL orqali boshqariladi.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://gspi.uz"
).replace(/\/$/, "");
