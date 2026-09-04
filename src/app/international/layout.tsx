import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.international.title,
  description: sectionPages.uz.international.subtitle,
  alternates: { canonical: "/international" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
