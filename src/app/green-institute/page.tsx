"use client";

import { Leaf } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { language } = useApp();
  const ex = extraPages[language];

  return (
    <SimpleSectionPage
      pageKey="greenInstitute"
      icon={Leaf}
      withDocuments={false}
      relatedLinks={[
        { label: ex.ecoStudents.title, href: "/eco-students" },
      ]}
    />
  );
}
