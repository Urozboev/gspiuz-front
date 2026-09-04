import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.studyPlans.title,
  description: extraPages.uz.studyPlans.subtitle,
  alternates: { canonical: "/study-plans" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
