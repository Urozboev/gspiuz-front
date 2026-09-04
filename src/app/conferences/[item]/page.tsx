"use client";

import { use } from "react";
import { useApp } from "@/context/AppContext";
import { extraPages } from "@/locales/sections";
import DynamicPageItemView from "@/components/page-layouts/DynamicPageItemView";

/** Konferensiya sahifasi — `/conferences` kartochkasining to'liq matni. */
export default function ConferenceItemPage({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item } = use(params);
  const { language } = useApp();

  return (
    <DynamicPageItemView
      pageSlug="conferences"
      itemSlug={item}
      parentTitle={extraPages[language].conferences.title}
    />
  );
}
