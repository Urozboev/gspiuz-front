"use client";

import { ClipboardList } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="studyPlans"
      icon={ClipboardList}
      withDocuments={true}
      relatedLinks={[
        { label: ex.syllabus.title, href: "/syllabus" },
        { label: ex.studySchedule.title, href: "/study-schedule" },
      ]}
    />
  );
}
