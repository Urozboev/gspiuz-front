import type { Metadata } from "next";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: pages.uz.titles.contact,
  description: pages.uz.footer.aboutText,
  alternates: { canonical: "/contact" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
