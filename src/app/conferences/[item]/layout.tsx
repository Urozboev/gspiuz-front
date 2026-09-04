import type { Metadata } from "next";
import { buildDetailMetadata } from "@/lib/detail-metadata";

/** Yozuvning o'z sarlavhasi va tavsifi — qidiruv va ulashish uchun. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ item: string }>;
}): Promise<Metadata> {
  const { item } = await params;
  return buildDetailMetadata({
    endpoint: `/pages/conferences/${item}`,
    canonical: `/conferences/${item}`,
    fallback: "Konferensiya",
    type: "article",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
