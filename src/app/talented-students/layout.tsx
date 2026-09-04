import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.talented.title,
  description: sectionPages.uz.talented.subtitle,
  alternates: { canonical: "/talented-students" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
