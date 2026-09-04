"use client";

import { Handshake, ExternalLink } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Paginated, Partner } from "@/lib/types";
import { pickImage } from "@/lib/format";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import RemoteImage from "@/components/ui/RemoteImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { Spinner, EmptyState, ErrorState } from "@/components/ui/States";

export default function PartnersPage() {
  const { p } = useT();
  const { data, loading, error, notFound, refetch } = useApi<Paginated<Partner>>("/partners");
  const { data: linksRes } = useApi<Paginated<Partner>>("/partner-link");
  const partners = data?.data ?? [];
  const links = linksRes?.data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.partners}
        subtitle={p.subtitles.partners}
        crumbs={[{ label: p.titles.partners }]}
        icon={<Handshake className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || partners.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {partners.map((partner) => {
              const logo = pickImage(partner.photo, "md");
              const card = (
                <div className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-accent-500 rounded-lg p-6 h-32 flex items-center justify-center transition-all">
                  <RemoteImage
                    src={logo}
                    alt={partner.title || "Hamkor"}
                    className="max-h-16 max-w-full object-contain grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all"
                    iconClassName="w-8 h-8"
                  />
                </div>
              );
              return partner.link ? (
                <a key={partner.id} href={partner.link} target="_blank" rel="noopener noreferrer" title={partner.title || ""}>
                  {card}
                </a>
              ) : (
                <div key={partner.id} title={partner.title || ""}>{card}</div>
              );
            })}
          </div>
        )}

        {/* Foydali havolalar (partner-link) */}
        {links.length > 0 && (
          <div className="mt-16">
            <SectionHeading title="Foydali havolalar" className="mb-8" />
            <div className="reveal-stagger grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 hover:border-accent-500 rounded-lg p-5 flex items-center gap-4 transition-all"
                >
                  <div className="h-12 w-12 shrink-0 rounded-xl overflow-hidden bg-mist-200 dark:bg-slate-800 flex items-center justify-center">
                    <RemoteImage src={pickImage(link.photo, "sm")} alt={link.title || ""} className="h-full w-full object-contain p-1" iconClassName="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm text-ink-900 dark:text-slate-100 flex-grow group-hover:text-brand-900 dark:group-hover:text-brand-300 line-clamp-2">
                    {link.title}
                  </span>
                  <ExternalLink className="w-4 h-4 text-ink-400 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}
      </Section>
    </>
  );
}
