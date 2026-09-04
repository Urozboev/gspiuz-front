"use client";

import { Library } from "lucide-react";
import { useT } from "@/hooks/useT";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { p } = useT();

  return (
    <SimpleSectionPage
      pageKey="eResources"
      icon={Library}
      withDocuments={false}
      relatedLinks={[
        { label: p.titles.journals, href: "/journals" },
      ]}
    />
  );
}
