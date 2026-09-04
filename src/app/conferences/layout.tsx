import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: {
    default: extraPages.uz.conferences.title,
    // Bolalari (masalan /news/video) ham sayt nomini olsin.
    template: `%s | ${SITE_NAME}`,
  },
  description: extraPages.uz.conferences.subtitle,
  alternates: { canonical: "/conferences" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
