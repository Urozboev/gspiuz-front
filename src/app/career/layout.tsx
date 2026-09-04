import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.career.title,
  description: extraPages.uz.career.subtitle,
  alternates: { canonical: "/career" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
