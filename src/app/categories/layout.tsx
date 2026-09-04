import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: "Turkumlar",
    template: `%s | ${SITE_NAME}`,
  },
  description: "Yangiliklar turkumlari bo'yicha materiallar.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
