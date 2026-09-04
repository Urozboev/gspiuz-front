/**
 * Server tomonidan backend API'ga murojaat.
 *
 * Brauzerdagi `apiFetch` Next rewrite-proxy orqali (`/api/...`) ishlaydi.
 * `generateMetadata` va `sitemap` esa serverda bajariladi va u yerda
 * nisbiy manzil ishlamaydi — shuning uchun to'g'ridan-to'g'ri backendga
 * murojaat qilinadi, maxfiy prefiks bilan.
 */
const BACKEND_URL = (process.env.BACKEND_URL ?? "http://127.0.0.1:8000").replace(
  /\/$/,
  "",
);
const PREFIX = (process.env.BACKEND_API_PREFIX ?? "api").replace(/^\/+|\/+$/g, "");

/** Javob keshda shuncha soniya saqlanadi — har so'rovda backend urilmasin. */
const REVALIDATE_SECONDS = 300;

/**
 * Backenddan JSON oladi.
 *
 * Xatolik bo'lsa `null` qaytaradi — metadata yoki sitemap uchun ma'lumot
 * yetib kelmasligi sahifani buzmasligi kerak. Backend o'chiq bo'lsa ham
 * sayt qurilishi va ochilishi davom etadi.
 */
export async function serverFetch<T>(
  endpoint: string,
  lang: string = "uz",
): Promise<T | null> {
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  try {
    const res = await fetch(`${BACKEND_URL}/${PREFIX}${path}`, {
      headers: { Accept: "application/json", "Accept-Language": lang },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** `{data: …}` o'ramini ochadi — backend ikkala ko'rinishda ham qaytaradi. */
export function unwrap<T>(res: unknown): T | null {
  if (!res || typeof res !== "object") return null;
  const obj = res as { data?: unknown };
  return (obj.data !== undefined ? obj.data : res) as T;
}
