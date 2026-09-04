import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: {
    default: pages.uz.titles.journals,
    // Bolalari (masalan /news/video) ham sayt nomini olsin.
    template: `%s | ${SITE_NAME}`,
  },
  description: pages.uz.subtitles.journals,
  alternates: { canonical: "/journals" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
