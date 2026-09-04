import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.syllabus.title,
  description: extraPages.uz.syllabus.subtitle,
  alternates: { canonical: "/syllabus" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
