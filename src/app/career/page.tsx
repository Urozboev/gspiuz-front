"use client";

import { Briefcase } from "lucide-react";
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
      pageKey="career"
      icon={Briefcase}
      withDocuments={false}
      relatedLinks={[
        { label: p.titles.vacancies, href: "/vacancies" },
        { label: ex.employers.title, href: "/employers" },
      ]}
    />
  );
}
