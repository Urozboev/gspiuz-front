"use client";

import { Sprout } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="ecoStudents"
      icon={Sprout}
      withDocuments={false}
      relatedLinks={[
        { label: ex.greenInstitute.title, href: "/green-institute" },
      ]}
    />
  );
}
