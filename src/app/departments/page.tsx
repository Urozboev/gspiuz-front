"use client";

import { Building2 } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { sectionPages } from "@/locales/sections";
import type { StaffMember } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import EmployeeCard from "@/components/cards/EmployeeCard";
import { Spinner, ErrorState } from "@/components/ui/States";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/** Boshqarma va bo'limlar — mas'ul xodimlar ro'yxati bilan. */
export default function DepartmentsPage() {
  const { language } = useApp();
  // Sahifa matni admin paneldan keladi (GET /pages/departments).
  const { page } = usePageBlocks("departments");

  const dict = sectionPages[language];
  const { data, loading, error, notFound, refetch } =
    useApi<StaffMember[]>("/department");
  const staff = data ?? [];

  return (
    <>
      <PageHero
        title={dict.departments.title}
        subtitle={dict.departments.subtitle}
        crumbs={[{ label: dict.departments.title }]}
        icon={<Building2 className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      <Section tone="mist">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || staff.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((person) => (
              <EmployeeCard
                key={person.id}
                employee={person}
                href={person.slug ? `/leadership/${person.slug}` : undefined}
              />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
