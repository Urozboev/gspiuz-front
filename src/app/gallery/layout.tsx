import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: {
    default: extraPages.uz.gallery.title,
    // Bolalari (masalan /news/video) ham sayt nomini olsin.
    template: `%s | ${SITE_NAME}`,
  },
  description: extraPages.uz.gallery.subtitle,
  alternates: { canonical: "/gallery" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
