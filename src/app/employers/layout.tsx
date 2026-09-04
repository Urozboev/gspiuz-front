import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.employers.title,
  description: extraPages.uz.employers.subtitle,
  alternates: { canonical: "/employers" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
