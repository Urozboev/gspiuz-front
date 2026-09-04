import type { Metadata } from "next";
import { pages } from "@/locales/pages";

export const metadata: Metadata = {
  title: pages.uz.common.appeal,
  description:
    "Rektor, tyutor va komplayens bo'limiga murojaat yuborish. Murojaatingiz ro'yxatga olinadi va qonunchilikda belgilangan muddatlarda ko'rib chiqiladi.",
  alternates: { canonical: "/murojaat" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
