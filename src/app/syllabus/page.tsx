"use client";

import { BookOpen } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="syllabus"
      icon={BookOpen}
      withDocuments={true}
      relatedLinks={[
        { label: ex.studyPlans.title, href: "/study-plans" },
        { label: ex.qualificationRequirements.title, href: "/qualification-requirements" },
      ]}
    />
  );
}
