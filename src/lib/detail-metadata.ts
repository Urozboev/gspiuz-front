import type { Metadata } from "next";
import { serverFetch, unwrap } from "@/lib/server-api";
import {
  stripHtml,
  truncate,
  pickImage,
  firstImage,
  localized,
} from "@/lib/format";
import { SITE_NAME } from "@/lib/config";
import type { ImageSet } from "@/lib/types";

/** Backend matn maydonlari satr yoki `{uz, ru, en}` obyekti bo'lishi mumkin. */
type Text = string | Record<string, string> | null | undefined;

/**
 * Backend yozuvlarining umumiy ko'rinishi.
 *
 * Har bir endpoint maydonlarni biroz boshqacha ataydi (`title` / `name` /
 * `full_name`, xodimlarda esa ism uch bo'lakka bo'lingan), shuning uchun
 * metadata yig'ishda hammasi tekshiriladi.
 */
interface DetailRecord {
  slug?: string | null;
  /* Admin panelda qo'lda yozilgan SEO maydonlari — bo'lsa ular ustun. */
  meta_title?: Text;
  meta_description?: Text;
  title?: Text;
  name?: Text;
  full_name?: Text;
  first_name?: Text;
  last_name?: Text;
  surname?: Text;
  subtitle?: Text;
  position?: Text;
  desc?: Text;
  body?: Text;
  text?: Text;
  date?: string | null;
  image?: ImageSet | string | null;
  images?: (ImageSet | string)[] | ImageSet | string | null;
}

/** Matn maydonini o'zbekcha ko'rinishga keltiradi. */
function plain(value: Text): string {
  return localized(value ?? null, "uz").trim();
}

function titleOf(rec: DetailRecord): string | null {
  const direct =
    plain(rec.meta_title) ||
    plain(rec.title) ||
    plain(rec.name) ||
    plain(rec.full_name);
  if (direct) return direct;

  // Xodimlar: familiya + ism + otasining ismi.
  const parts = [rec.last_name, rec.first_name, rec.surname]
    .map(plain)
    .filter(Boolean);
  return parts.length ? parts.join(" ") : null;
}

function descriptionOf(rec: DetailRecord): string | undefined {
  const manual = plain(rec.meta_description);
  if (manual) return truncate(manual, 160);

  const raw =
    plain(rec.desc) ||
    plain(rec.body) ||
    plain(rec.text) ||
    plain(rec.subtitle) ||
    plain(rec.position);
  return truncate(stripHtml(raw), 160) || undefined;
}

function imageOf(rec: DetailRecord): string | undefined {
  if (typeof rec.image === "string") return rec.image;
  if (rec.image) return pickImage(rec.image, "lg") || undefined;

  if (Array.isArray(rec.images)) {
    const first = rec.images[0];
    if (typeof first === "string") return first;
    return firstImage(rec.images as ImageSet[], "lg") || undefined;
  }
  if (typeof rec.images === "string") return rec.images;
  if (rec.images) return pickImage(rec.images, "lg") || undefined;

  return undefined;
}

/**
 * Detal sahifasi uchun metadata yig'adi.
 *
 * Yozuv topilmasa (backend o'chiq yoki manzil noto'g'ri) zaxira sarlavha
 * qaytariladi — sahifa baribir ochiladi, faqat SEO ma'lumoti kambag'alroq
 * bo'ladi.
 *
 * @param endpoint      Yozuv manzili, masalan `/events/tadbir-slug`.
 * @param wrapKey       Yozuv ichki kalitga o'ralgan bo'lsa — masalan
 *                      `/categories/{slug}` uchun `"category"`.
 * @param listEndpoint  Ba'zi endpointlar (masalan `/fakultet/{slug}`) faqat
 *                      bog'liq yozuvlarni qaytaradi, nomni bermaydi. Shunday
 *                      hollarda nom ro'yxatdan slug bo'yicha topiladi.
 * @param slug          Ro'yxatdan qidirish uchun kalit.
 * @param canonical     Saytdagi manzil.
 * @param fallback      Yozuv topilmaganda ishlatiladigan sarlavha.
 * @param type          Open Graph turi — yangilik va tadbirlar uchun `article`.
 */
export async function buildDetailMetadata({
  endpoint,
  wrapKey,
  listEndpoint,
  slug,
  canonical,
  fallback,
  type = "website",
}: {
  endpoint: string;
  /** Yozuv ichki kalitga o'ralgan bo'lsa, o'sha kalit nomi. */
  wrapKey?: string;
  listEndpoint?: string;
  slug?: string;
  canonical: string;
  fallback: string;
  type?: "website" | "article";
}): Promise<Metadata> {
  let rec = unwrap<DetailRecord>(await serverFetch(endpoint));

  /*
   * Ba'zi endpointlar yozuvni ichki kalitga o'raydi — masalan
   * `/categories/{slug}` `{category, posts}` qaytaradi. Sarlavha
   * tashqi qavatda topilmasa, `wrapKey` ko'rsatilgan ichki obyekt olinadi.
   */
  if (wrapKey && rec && !titleOf(rec)) {
    const inner = (rec as unknown as Record<string, unknown>)[wrapKey];
    if (inner && typeof inner === "object") rec = inner as DetailRecord;
  }

  let title = rec ? titleOf(rec) : null;

  // Yozuvning o'zida nom bo'lmasa, ro'yxatdan slug bo'yicha qidiramiz.
  if (!title && listEndpoint && slug) {
    const list = unwrap<DetailRecord[]>(await serverFetch(listEndpoint));
    const found = Array.isArray(list)
      ? list.find((item) => item.slug === slug)
      : null;
    if (found) {
      rec = { ...found, ...(rec ?? {}) };
      title = titleOf(found);
    }
  }

  if (!title) {
    return { title: fallback, alternates: { canonical } };
  }

  const description = rec ? descriptionOf(rec) : undefined;
  const image = rec ? imageOf(rec) : undefined;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type,
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      ...(type === "article" && rec?.date ? { publishedTime: rec.date } : {}),
      images: image ? [{ url: image, alt: title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
