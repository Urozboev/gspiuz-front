import type { Metadata } from "next";
import { events } from "@/locales/sections";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: events.uz.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: events.uz.subtitle,
  alternates: { canonical: "/events" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
