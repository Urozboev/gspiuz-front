"use client";

import { Clock } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="informationHours"
      icon={Clock}
      withDocuments={true}
      relatedLinks={[
        { label: ex.spiritual.title, href: "/spiritual" },
      ]}
    />
  );
}
