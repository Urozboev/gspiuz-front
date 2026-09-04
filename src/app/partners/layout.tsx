import type { Metadata } from "next";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: pages.uz.titles.partners,
  description: pages.uz.subtitles.partners,
  alternates: { canonical: "/partners" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
