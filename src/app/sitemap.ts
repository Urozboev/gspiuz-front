import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { serverFetch } from "@/lib/server-api";

/**
 * Sayt xaritasi.
 *
 * Statik sahifalar quyida sanab o'tiladi, dinamik sahifalar (yangilik,
 * tadbir, fakultet, kafedra, jurnal, vakansiya, rahbariyat) backenddan
 * olinadi. Backend javob bermasa faqat statik ro'yxat qaytariladi —
 * sayt xaritasi baribir yaroqli bo'lib qoladi.
 */
const ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/institute-history", priority: 0.5, changeFrequency: "yearly" },
  { path: "/leadership", priority: 0.7, changeFrequency: "monthly" },
  { path: "/structure", priority: 0.6, changeFrequency: "monthly" },
  { path: "/departments", priority: 0.6, changeFrequency: "monthly" },
  { path: "/councils", priority: 0.4, changeFrequency: "monthly" },
  { path: "/requisites", priority: 0.4, changeFrequency: "yearly" },
  { path: "/open-data", priority: 0.6, changeFrequency: "monthly" },
  { path: "/documents", priority: 0.6, changeFrequency: "weekly" },
  { path: "/partners", priority: 0.5, changeFrequency: "monthly" },

  { path: "/faculties", priority: 0.8, changeFrequency: "monthly" },
  { path: "/kafedralar", priority: 0.7, changeFrequency: "monthly" },
  { path: "/educational-programs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/study-plans", priority: 0.5, changeFrequency: "monthly" },
  { path: "/study-schedule", priority: 0.6, changeFrequency: "weekly" },
  { path: "/syllabus", priority: 0.5, changeFrequency: "monthly" },
  { path: "/qualification-requirements", priority: 0.5, changeFrequency: "yearly" },
  { path: "/e-resources", priority: 0.5, changeFrequency: "monthly" },
  { path: "/tutors", priority: 0.4, changeFrequency: "monthly" },

  { path: "/news", priority: 0.9, changeFrequency: "daily" },
  { path: "/announcements", priority: 0.8, changeFrequency: "daily" },
  { path: "/news/video", priority: 0.5, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.4, changeFrequency: "weekly" },
  { path: "/events", priority: 0.5, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },

  { path: "/research", priority: 0.7, changeFrequency: "monthly" },
  { path: "/journals", priority: 0.6, changeFrequency: "monthly" },
  { path: "/conferences", priority: 0.6, changeFrequency: "weekly" },
  { path: "/international", priority: 0.6, changeFrequency: "monthly" },
  { path: "/spiritual", priority: 0.4, changeFrequency: "monthly" },
  { path: "/green-institute", priority: 0.4, changeFrequency: "monthly" },
  { path: "/anti-corruption", priority: 0.6, changeFrequency: "monthly" },

  { path: "/students", priority: 0.7, changeFrequency: "monthly" },
  { path: "/dormitory", priority: 0.6, changeFrequency: "monthly" },
  { path: "/talented-students", priority: 0.5, changeFrequency: "monthly" },
  { path: "/eco-students", priority: 0.4, changeFrequency: "monthly" },
  { path: "/information-hours", priority: 0.4, changeFrequency: "weekly" },
  { path: "/career", priority: 0.5, changeFrequency: "monthly" },
  { path: "/employers", priority: 0.4, changeFrequency: "monthly" },
  { path: "/vacancies", priority: 0.6, changeFrequency: "weekly" },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly" },

  { path: "/admissions", priority: 1, changeFrequency: "daily" },
  { path: "/murojaat", priority: 0.8, changeFrequency: "monthly" },
];

/** Backend ro'yxat javoblarining umumiy ko'rinishi. */
interface ListItem {
  slug?: string | null;
  id?: number | string | null;
  date?: string | null;
  updated_at?: string | null;
}

/**
 * Bitta ro'yxat endpointidan sayt xaritasi yozuvlarini yig'adi.
 *
 * `slug` bo'lmasa `id` ishlatiladi; ikkalasi ham bo'lmasa yozuv
 * tashlab ketiladi — manzilsiz sahifa xaritada keraksiz.
 */
async function collect(
  endpoint: string,
  prefix: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  useId = false,
): Promise<MetadataRoute.Sitemap> {
  const res = await serverFetch<{ data?: ListItem[] } | ListItem[]>(
    `${endpoint}?per_page=200`,
  );
  const items = Array.isArray(res) ? res : (res?.data ?? []);
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    const key = useId ? item.id : (item.slug ?? item.id);
    if (key === null || key === undefined || key === "") return [];
    return [
      {
        url: `${SITE_URL}${prefix}/${key}`,
        lastModified: item.updated_at
          ? new Date(item.updated_at)
          : item.date
            ? new Date(item.date)
            : new Date(),
        changeFrequency,
        priority,
      },
    ];
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  // Backend o'chiq bo'lsa ham xarita qurilishi kerak — xatolar yutiladi.
  const dynamicGroups = await Promise.all([
    collect("/news", "/news", 0.7, "monthly"),
    collect("/events", "/events", 0.6, "monthly"),
    collect("/fakultet", "/faculties", 0.7, "monthly"),
    collect("/kafedralar", "/kafedralar", 0.6, "monthly"),
    collect("/journals", "/journals", 0.5, "monthly"),
    collect("/leaderships", "/leadership", 0.5, "monthly"),
    collect("/vacancies", "/vacancies", 0.5, "weekly", true),
    collect("/educational-programs", "/educational-programs", 0.6, "monthly", true),
  ]);

  return [...staticRoutes, ...dynamicGroups.flat()];
}
