"use client";

import { use } from "react";
import Link from "next/link";
import { Images, ArrowLeft } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { extraPages } from "@/locales/sections";
import { endpoints } from "@/lib/endpoints";
import { formatDate, pickImage } from "@/lib/format";
import type { GalleryAlbum } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section } from "@/components/ui/InfoBlocks";
import RemoteImage from "@/components/ui/RemoteImage";
import { EmptyState, ErrorState, CardGridSkeleton } from "@/components/ui/States";

/** Bitta fotoalbom — barcha rasmlari bilan. */
export default function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { p, lang } = useT();
  const { language } = useApp();
  const gallery = extraPages[language].gallery;

  const { data, loading, error, notFound, refetch } = useApi<{ data: GalleryAlbum }>(
    endpoints.galleryAlbum(id),
  );
  const album = data?.data;
  const images = album?.images ?? [];

  return (
    <>
      <PageHero
        title={album?.title || gallery.title}
        subtitle={album?.desc || undefined}
        crumbs={[{ label: gallery.title, href: "/gallery" }, { label: album?.title || "" }]}
        icon={<Images className="w-6 h-6" />}
      />

      <Section tone="mist">
        {loading ? (
          <CardGridSkeleton />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || !album ? (
          <EmptyState />
        ) : (
          <>
            {album.date && (
              <p className="text-base text-ink-400 mb-10">
                {formatDate(album.date, lang)}
              </p>
            )}

            {images.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image) => (
                  <a
                    key={image.id}
                    href={pickImage(image, "lg") ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-4/3 rounded-xl overflow-hidden bg-mist-200 dark:bg-slate-800 block"
                  >
                    <RemoteImage
                      src={pickImage(image, "md")}
                      alt={album.title || ""}
                      className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <EmptyState />
            )}

            <div className="mt-14">
              <Link
                href="/gallery"
                className="group inline-flex items-center gap-2 text-base font-semibold text-brand-900 dark:text-brand-300"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {p.common.back}
              </Link>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
