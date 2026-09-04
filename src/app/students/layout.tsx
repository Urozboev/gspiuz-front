import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/config";

export const metadata: Metadata = {
  title: {
    default: "Talabalar",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Talabalar uchun ma'lumotlar: o'quv jarayoni, stipendiya, turar joy, to'garaklar va talaba hayoti.",
  alternates: { canonical: "/students" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
