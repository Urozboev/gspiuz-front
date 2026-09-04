import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.requisites.title,
  description: sectionPages.uz.requisites.subtitle,
  alternates: { canonical: "/requisites" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
