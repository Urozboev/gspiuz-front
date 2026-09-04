"use client";

import { CalendarDays } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="studySchedule"
      icon={CalendarDays}
      withDocuments={true}
      relatedLinks={[
        { label: ex.studyPlans.title, href: "/study-plans" },
      ]}
    />
  );
}
