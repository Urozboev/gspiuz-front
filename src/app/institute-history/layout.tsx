import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.instituteHistory.title,
  description: extraPages.uz.instituteHistory.subtitle,
  alternates: { canonical: "/institute-history" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
