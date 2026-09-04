"use client";

import { useApi } from "@/hooks/useApi";
import { endpoints } from "@/lib/endpoints";
import { iconFromName } from "@/lib/icons";
import type { DynamicPage, PageCard } from "@/lib/types";
import type { FeatureItem } from "@/components/ui/InfoBlocks";

/**
 * Sahifaning admin paneldan boshqariladigan bloklarini oladi.
 *
 * `group` berilsa, faqat o'sha guruhdagi bloklar qaytariladi.
 * Kontent hali kiritilmagan bo'lsa, bo'sh massiv qaytadi — chaqiruvchi
 * bo'limni yashirishi yoki o'z zaxira matnini ko'rsatishi mumkin.
 */
export function usePageBlocks(slug: string, group?: string) {
  const { data, loading } = useApi<{ data: DynamicPage }>(endpoints.page(slug));

  const all = data?.data?.blocks ?? [];
  const blocks = group ? all.filter((b) => b.group === group) : all;

  return { blocks, page: data?.data, loading };
}

/**
 * Backend blokini `FeatureGrid` kutgan shaklga aylantiradi.
 * Ikonka nomi komponentga almashtiriladi.
 */
export function blockToFeature(block: PageCard): FeatureItem {
  return {
    icon: iconFromName(block.icon),
    title: block.title ?? "",
    desc: block.desc ?? undefined,
    href: block.link ?? undefined,
  };
}
