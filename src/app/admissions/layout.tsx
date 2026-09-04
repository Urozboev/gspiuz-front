import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";
import { admissions } from "@/locales/sections";

const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: {
    default: `${admissions.uz.title} ${year}`,
    // Bolalari (masalan /news/video) ham sayt nomini olsin.
    template: `%s | ${SITE_NAME}`,
  },
  description: admissions.uz.subtitle,
  alternates: { canonical: "/admissions" },
  openGraph: {
    title: `${admissions.uz.title} ${year} — Guliston davlat pedagogika instituti`,
    description: admissions.uz.subtitle,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
