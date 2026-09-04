import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.ecoStudents.title,
  description: extraPages.uz.ecoStudents.subtitle,
  alternates: { canonical: "/eco-students" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
