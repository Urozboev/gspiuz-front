"use client";

import { Presentation } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { sectionPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { p } = useT();
  const { language } = useApp();
  const sp = sectionPages[language];

  return (
    <SimpleSectionPage
      pageKey="conferences"
      icon={Presentation}
      withDocuments={true}
      relatedLinks={[
        { label: sp.research.title, href: "/research" },
        { label: p.titles.journals, href: "/journals" },
      ]}
    />
  );
}
