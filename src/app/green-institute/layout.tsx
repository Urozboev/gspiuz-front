import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.greenInstitute.title,
  description: extraPages.uz.greenInstitute.subtitle,
  alternates: { canonical: "/green-institute" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
