import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.spiritual.title,
  description: extraPages.uz.spiritual.subtitle,
  alternates: { canonical: "/spiritual" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
