"use client";

import { use } from "react";
import { Layers } from "lucide-react";
import { useT } from "@/hooks/useT";
import StaffView from "@/components/StaffView";

export default function FacultyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { p } = useT();
  return (
    <StaffView
      slug={slug}
      listEndpoint="/fakultet"
      detailEndpoint={`/fakultet/${slug}`}
      backHref="/faculties"
      backLabel={p.titles.faculties}
      crumbTitle={p.titles.faculties}
      icon={<Layers className="w-7 h-7" />}
    />
  );
}
