import type { Metadata } from "next";
import { extraPages } from "@/locales/sections";

export const metadata: Metadata = {
  title: extraPages.uz.eResources.title,
  description: extraPages.uz.eResources.subtitle,
  alternates: { canonical: "/e-resources" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
