import type { Metadata } from "next";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: pages.uz.titles.structure,
  description: pages.uz.footer.aboutText,
  alternates: { canonical: "/structure" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
