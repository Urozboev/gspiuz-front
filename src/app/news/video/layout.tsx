import type { Metadata } from "next";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: pages.uz.titles.videoNews,
  description: pages.uz.subtitles.videoNews,
  alternates: { canonical: "/news/video" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
