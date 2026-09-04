"use client";

import { Home, Phone, MapPin } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { useSiteInfo } from "@/context/SiteInfoContext";
import { INSTITUTE } from "@/lib/config";
import { sectionPages } from "@/locales/sections";
import { usePageBlocks, blockToFeature } from "@/hooks/usePageBlocks";
import PageHero from "@/components/ui/PageHero";
import { Section, FeatureGrid, ContactStrip, PageBody } from "@/components/ui/InfoBlocks";

/** Talabalar turar joyi — joylashish tartibi va shartlari. */
export default function DormitoryPage() {
  const { p } = useT();
  const { language } = useApp();
  const { siteInfo } = useSiteInfo();
  const dict = sectionPages[language];

  const phone = siteInfo?.phone_number || INSTITUTE.phone;
  const address = siteInfo?.address || INSTITUTE.address;

  // Bloklar admin paneldan keladi (GET /pages/dormitory).
  const { blocks, page } = usePageBlocks("dormitory");
  const info = blocks.map(blockToFeature);

  return (
    <>
      <PageHero
        title={dict.dormitory.title}
        subtitle={dict.dormitory.subtitle}
        crumbs={[{ label: dict.dormitory.title }]}
        icon={<Home className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelda "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      {info.length > 0 && (
        <Section>
          <FeatureGrid items={info} columns={4} tone="mist" />
        </Section>
      )}

      <Section tone="brand">
        <h2 className="display-3 text-white mb-12">{dict.labels.contact}</h2>
        <ContactStrip
          rows={[
            { icon: Phone, label: p.common.phone, value: phone, href: `tel:${phone}` },
            { icon: MapPin, label: p.common.address, value: address },
          ]}
        />
      </Section>
    </>
  );
}
