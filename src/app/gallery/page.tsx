"use client";

import Link from "next/link";
import { Images, ArrowUpRight } from "lucide-react";
import { useApi } from "@/hooks/useApi";
import { useApp } from "@/context/AppContext";
import { useT } from "@/hooks/useT";
import { extraPages, sectionPages } from "@/locales/sections";
import { endpoints } from "@/lib/endpoints";
import { formatDate, pickImage } from "@/lib/format";
import type { Paginated, GalleryAlbum, GalleryPhoto } from "@/lib/types";
import PageHero from "@/components/ui/PageHero";
import { Section, PendingNotice, PageBody } from "@/components/ui/InfoBlocks";
import RemoteImage from "@/components/ui/RemoteImage";
import { Spinner } from "@/components/ui/States";
import { usePageBlocks } from "@/hooks/usePageBlocks";

/**
 * Fotogalereya.
 *
 * Ikki manba: albomlar (`/gallery`) va yangiliklarga biriktirilgan
 * rasmlarning umumiy lentasi (`/photos`).
 */
export default function GalleryPage() {
  const { lang } = useT();
  const { language } = useApp();
  // Sahifa matni admin paneldan keladi (GET /pages/gallery).
  const { page: cmsPage } = usePageBlocks("gallery");

  const page = extraPages[language].gallery;
  const sp = sectionPages[language];

  const { data: albumsRes, loading } = useApi<Paginated<GalleryAlbum>>(
    endpoints.gallery,
  );
  const { data: photosRes } = useApi<Paginated<GalleryPhoto>>(endpoints.photos);

  const albums = albumsRes?.data ?? [];
  const photos = photosRes?.data ?? [];
  const isEmpty = albums.length === 0 && photos.length === 0;

  return (
    <>
      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        crumbs={[{ label: page.title }]}
        icon={<Images className="w-6 h-6" />}
      />

      {/* Sahifa matni — admin panelning "Sahifa matni" maydonidan. */}
      <PageBody html={cmsPage?.body} />

      <Section tone="mist">
        {loading ? (
          <Spinner />
        ) : isEmpty ? (
          <PendingNotice text={sp.pending} />
        ) : (
          <>
            {/* Albomlar */}
            {albums.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <Link
                    key={album.id}
                    href={`/gallery/${album.id}`}
                    className="lift group bg-white dark:bg-slate-900 rounded-xl overflow-hidden flex flex-col"
                  >
                    <div className="relative h-60 w-full overflow-hidden bg-mist-200 dark:bg-slate-800">
                      <RemoteImage
                        src={pickImage(album.cover, "md")}
                        alt={album.title || ""}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {album.images_count > 0 && (
                        <span className="absolute bottom-4 right-4 bg-brand-950/85 text-white text-xs font-medium py-1.5 px-3 rounded-md backdrop-blur-sm tabular-nums">
                          {album.images_count}
                        </span>
                      )}
                    </div>
                    <div className="p-7 flex flex-col flex-grow">
                      <h2 className="font-display text-xl font-semibold text-ink-900 dark:text-white leading-snug">
                        {album.title}
                      </h2>
                      {album.date && (
                        <p className="mt-3 text-sm text-ink-400">
                          {formatDate(album.date, lang)}
                        </p>
                      )}
                      <span className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-900 dark:text-brand-300">
                        <span className="h-px w-8 bg-accent-500 group-hover:w-12 transition-all" />
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Yangiliklardagi rasmlar */}
            {photos.length > 0 && (
              <div className={albums.length > 0 ? "mt-20" : ""}>
                <h2 className="display-3 text-ink-900 dark:text-white mb-10">
                  Yangiliklardan
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo) => {
                    const image = (
                      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-mist-200 dark:bg-slate-800">
                        <RemoteImage
                          src={pickImage(photo, "md")}
                          alt={photo.post_title || ""}
                          className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    );
                    return photo.post_slug ? (
                      <Link
                        key={photo.id}
                        href={`/news/${photo.post_slug}`}
                        title={photo.post_title || ""}
                      >
                        {image}
                      </Link>
                    ) : (
                      <div key={photo.id} title={photo.post_title || ""}>
                        {image}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
}
