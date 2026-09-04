"use client";

import { FileCheck } from "lucide-react";
import { useT } from "@/hooks/useT";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { p } = useT();

  return (
    <SimpleSectionPage
      pageKey="qualificationRequirements"
      icon={FileCheck}
      withDocuments={true}
      relatedLinks={[
        { label: p.titles.programs, href: "/educational-programs" },
      ]}
    />
  );
}
