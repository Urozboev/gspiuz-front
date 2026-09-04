"use client";

import { use } from "react";
import { Network } from "lucide-react";
import { useT } from "@/hooks/useT";
import StaffView from "@/components/StaffView";

export default function ChairDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { p } = useT();
  return (
    <StaffView
      slug={slug}
      listEndpoint="/kafedralar"
      detailEndpoint={`/kafedralar/${slug}`}
      backHref="/kafedralar"
      backLabel={p.titles.chairs}
      crumbTitle={p.titles.chairs}
      icon={<Network className="w-7 h-7" />}
    />
  );
}
