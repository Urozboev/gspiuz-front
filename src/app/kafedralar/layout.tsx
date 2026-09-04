import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: {
    default: pages.uz.titles.chairs,
    // Bolalari (masalan /news/video) ham sayt nomini olsin.
    template: `%s | ${SITE_NAME}`,
  },
  description: pages.uz.subtitles.chairs,
  alternates: { canonical: "/kafedralar" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
