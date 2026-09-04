import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.research.title,
  description: sectionPages.uz.research.subtitle,
  alternates: { canonical: "/research" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
