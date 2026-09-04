import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: {
    default: pages.uz.titles.news,
    // Bolalari (masalan /news/video) ham sayt nomini olsin.
    template: `%s | ${SITE_NAME}`,
  },
  description: pages.uz.subtitles.news,
  alternates: { canonical: "/news" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
