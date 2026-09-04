import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.informationHours.title,
  description: extraPages.uz.informationHours.subtitle,
  alternates: { canonical: "/information-hours" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
