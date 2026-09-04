import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import { serverFetch } from "@/lib/server-api";
import DynamicPageView from "@/components/page-layouts/DynamicPageView";
import type { DynamicPage } from "@/lib/types";

/**
 * Admin panelda yaratilgan sahifalar uchun umumiy marshrut.
 *
 * Menyuga yangi band qo'shilganda (masalan `/citizen_appeal`) frontendda
 * alohida papka yaratish shart emas — sahifa shu yerda ochiladi.
 * Kodda o'z papkasi bor manzillar (`/about`, `/news`, ...) Next.js'da
 * ustunlikka ega, shuning uchun bu marshrut ularga xalaqit bermaydi.
 */
export default async function CmsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await fetchPage(slug);

  // Bunday sahifa umuman yo'q — saytning 404 sahifasi ko'rsatiladi.
  if (!page) notFound();

  return (
    <DynamicPageView
      slug={slug}
      fallback={{
        title: page.title ?? slug,
        subtitle: page.subtitle ?? undefined,
      }}
      icon={<FileText className="w-6 h-6" />}
    />
  );
}

/** Sahifa mavjudligini serverda tekshiradi — 404 ni to'g'ri qaytarish uchun. */
async function fetchPage(slug: string): Promise<DynamicPage | null> {
  const res = await serverFetch<{ data?: DynamicPage } | DynamicPage>(
    `/pages/${slug}`,
  );
  if (!res) return null;
  const page = "data" in res ? res.data : (res as DynamicPage);
  return page && (page.title || page.slug) ? page : null;
}
