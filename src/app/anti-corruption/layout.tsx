import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.antiCorruption.title,
  description: sectionPages.uz.antiCorruption.subtitle,
  alternates: { canonical: "/anti-corruption" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
