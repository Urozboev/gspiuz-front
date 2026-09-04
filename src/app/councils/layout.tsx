import type { Metadata } from "next";
import { sectionPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: sectionPages.uz.councils.title,
  description: sectionPages.uz.councils.subtitle,
  alternates: { canonical: "/councils" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
