import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.tutors.title,
  description: sectionPages.uz.tutors.subtitle,
  alternates: { canonical: "/tutors" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
