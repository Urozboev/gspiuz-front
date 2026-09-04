import type { Metadata } from "next";
import { buildDetailMetadata } from "@/lib/detail-metadata";
import { SITE_NAME } from "@/lib/config";

/**
 * Admin panelda yaratilgan sahifaning o'z sarlavhasi va tavsifi.
 * Sayt nomi ildiz layout'idagi shablon orqali qo'shiladi.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildDetailMetadata({
    endpoint: `/pages/${slug}`,
    canonical: `/${slug}`,
    fallback: SITE_NAME,
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
