import type { Metadata } from "next";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: pages.uz.titles.documents,
  description: pages.uz.subtitles.documents,
  alternates: { canonical: "/documents" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
