import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.departments.title,
  description: sectionPages.uz.departments.subtitle,
  alternates: { canonical: "/departments" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
