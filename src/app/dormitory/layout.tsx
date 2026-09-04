import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.dormitory.title,
  description: sectionPages.uz.dormitory.subtitle,
  alternates: { canonical: "/dormitory" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
