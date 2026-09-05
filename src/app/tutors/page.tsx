"use client";

import { UserRound } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { sectionPages } from "@/locales/sections";
import { endpoints } from "@/lib/endpoints";
import type { StaffMember } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import EmployeeCard from "@/components/cards/EmployeeCard";
import { ErrorState, StaffGridSkeleton } from "@/components/ui/States";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/** Tyutorlar — backendning /tutors endpointidan (tyutor lavozimi bo'yicha filtrlangan). */
export default function TutorsPage() {
  const { language } = useApp();
  // Sahifa matni admin paneldan keladi (GET /pages/tutors).
  const { page } = usePageBlocks("tutors");

  const dict = sectionPages[language];
  const { data, loading, error, notFound, refetch } =
    useApi<StaffMember[]>(endpoints.tutors);
  const tutors = data ?? [];

  return (
    <>
      <PageHero
        title={dict.tutors.title}
        subtitle={dict.tutors.subtitle}
        crumbs={[{ label: dict.tutors.title }]}
        icon={<UserRound className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={page?.body} />

      <Section tone="mist">
        {loading ? (
          <StaffGridSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || tutors.length === 0 ? (
          <PendingNotice text={dict.pending} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((person) => (
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
