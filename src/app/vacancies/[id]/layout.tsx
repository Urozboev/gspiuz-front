import type { Metadata } from "next";
import { buildDetailMetadata } from "@/lib/detail-metadata";

/** Yozuvning o'z sarlavhasi va tavsifi — qidiruv va ulashish uchun. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return buildDetailMetadata({
    endpoint: `/vacancies/${id}`,
    canonical: `/vacancies/${id}`,
    fallback: "Vakansiya",
    type: "website",
  });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
