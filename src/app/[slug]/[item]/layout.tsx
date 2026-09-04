import type { Metadata } from "next";
import { buildDetailMetadata } from "@/lib/detail-metadata";
import { SITE_NAME } from "@/lib/config";

/** Kartochka sahifasining o'z sarlavhasi va tavsifi. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; item: string }>;
}): Promise<Metadata> {
  const { slug, item } = await params;
  return buildDetailMetadata({
    endpoint: `/pages/${slug}/${item}`,
    canonical: `/${slug}/${item}`,
    fallback: SITE_NAME,
    type: "article",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
