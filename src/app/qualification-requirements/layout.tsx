import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.qualificationRequirements.title,
  description: extraPages.uz.qualificationRequirements.subtitle,
  alternates: { canonical: "/qualification-requirements" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
