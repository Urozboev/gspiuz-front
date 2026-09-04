import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.studySchedule.title,
  description: extraPages.uz.studySchedule.subtitle,
  alternates: { canonical: "/study-schedule" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
