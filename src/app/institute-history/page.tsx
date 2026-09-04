"use client";

import { History } from "lucide-react";
import { useT } from "@/hooks/useT";
import SimpleSectionPage from "@/components/SimpleSectionPage";

export default function Page() {
  const { t, p } = useT();

  return (
    <SimpleSectionPage
      pageKey="instituteHistory"
      icon={History}
      withDocuments={false}
      relatedLinks={[
        { label: p.titles.about, href: "/about" },
        { label: t.nav.structure, href: "/structure" },
      ]}
    />
  );
}
