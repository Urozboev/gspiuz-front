import type { Metadata } from "next";
import { buildDetailMetadata } from "@/lib/detail-metadata";

/** Yozuvning o'z sarlavhasi va tavsifi — qidiruv va ulashish uchun. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return buildDetailMetadata({
    endpoint: `/leaderships/${slug}`,
    canonical: `/leadership/${slug}`,
    fallback: "Rahbariyat",
    type: "website",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
