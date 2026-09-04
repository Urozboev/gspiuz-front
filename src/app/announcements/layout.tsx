import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.announcements.title,
  description: sectionPages.uz.announcements.subtitle,
  alternates: { canonical: "/announcements" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
