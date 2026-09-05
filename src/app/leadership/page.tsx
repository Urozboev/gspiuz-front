"use client";

import { Users } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { LeadershipGroup, Employee } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import EmployeeCard from "@/components/cards/EmployeeCard";
import { EmptyState, ErrorState, StaffGridSkeleton } from "@/components/ui/States";

export default function LeadershipPage() {
  const { p } = useT();
  const { data, loading, error, notFound, refetch } = useApi<LeadershipGroup[]>("/leaderships");
  const groups = data ?? [];

  const hrefFor = (emp: Employee) => (emp.slug ? `/leadership/${emp.slug}` : undefined);

  return (
    <>
      <PageHero
        title={p.titles.leadership}
        subtitle={p.subtitles.leadership}
        crumbs={[{ label: p.titles.leadership }]}
        icon={<Users className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <StaffGridSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-20">
            {groups.map((group) => {
              const leaders = group.manage_employ ?? [];
              const professors = group.professor_employ ?? [];
              const all = [...leaders, ...professors];
              if (all.length === 0) return null;

              const [first, ...rest] = all;
              return (
                <div key={group.id}>
                  {group.name && (
                    <h2 className="display-3 text-ink-900 dark:text-white mb-8">
                      {group.name}
                    </h2>
                  )}

                  {/* Birinchi rahbar — kattaroq */}
                  {first && (
                    <div className="mb-6 max-w-3xl">
                      <EmployeeCard employee={first} href={hrefFor(first)} featured />
                    </div>
                  )}

                  {rest.length > 0 && (
                    <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {rest.map((emp) => (
                        <EmployeeCard key={emp.id} employee={emp} href={hrefFor(emp)} />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
