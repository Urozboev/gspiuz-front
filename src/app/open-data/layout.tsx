import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.openData.title,
  description: sectionPages.uz.openData.subtitle,
  alternates: { canonical: "/open-data" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
