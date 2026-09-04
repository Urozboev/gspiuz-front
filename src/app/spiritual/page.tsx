"use client";

import { HeartHandshake } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { t } = useT();
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="spiritual"
      icon={HeartHandshake}
      withDocuments={false}
      relatedLinks={[
        { label: t.studentsPage.title, href: "/students" },
        { label: ex.informationHours.title, href: "/information-hours" },
      ]}
    />
  );
}
