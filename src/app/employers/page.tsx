"use client";

import { Handshake } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { p } = useT();
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="employers"
      icon={Handshake}
      withDocuments={false}
      relatedLinks={[
        { label: p.titles.vacancies, href: "/vacancies" },
        { label: ex.career.title, href: "/career" },
      ]}
    />
  );
}
