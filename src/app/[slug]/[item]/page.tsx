import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/server-api";
import DynamicPageItemView from "@/components/page-layouts/DynamicPageItemView";
import type { DynamicPage, DynamicPageItem } from "@/lib/types";

/**
 * `layout: "cards"` sahifasidagi kartochkaning o'z sahifasi.
 *
 * Manzil `/{sahifa}/{kartochka}` ko'rinishida bo'ladi va admin panelda
 * kartochka qo'shilishi bilan ishlay boshlaydi — kodda papka ochish
 * shart emas.
 */
export default async function CmsPageItem({
  params,
}: {
  params: Promise<{ slug: string; item: string }>;
}) {
  const { slug, item } = await params;

  // Ikkalasini birga so'raymiz: element va uni o'z ichiga olgan sahifa.
  const [itemData, parent] = await Promise.all([
    fetchOne<DynamicPageItem>(`/pages/${slug}/${item}`),
    fetchOne<DynamicPage>(`/pages/${slug}`),
  ]);

  if (!itemData) notFound();

  return (
    <DynamicPageItemView
      pageSlug={slug}
      itemSlug={item}
      parentTitle={parent?.title ?? slug}
    />
  );
}

/** Yozuvni serverda o'qiydi — 404 ni to'g'ri qaytarish uchun. */
async function fetchOne<T extends { slug?: string; title?: string | null }>(
  endpoint: string,
): Promise<T | null> {
  const res = await serverFetch<{ data?: T } | T>(endpoint);
  if (!res) return null;
  const value = "data" in res ? (res.data as T | undefined) : (res as T);
  return value && (value.title || value.slug) ? value : null;
}
