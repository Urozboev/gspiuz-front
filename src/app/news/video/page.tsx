"use client";

import { useState } from "react";
import { PlayCircle, X, Calendar } from "lucide-react";
import { useT } from "@/hooks/useT";
import { useApi } from "@/hooks/useApi";
import type { Paginated, Post } from "@/lib/types";
import { firstImage, formatDate, youtubeId } from "@/lib/format";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import { CardGridSkeleton, EmptyState, ErrorState } from "@/components/ui/States";

export default function VideoNewsPage() {
  const { p, lang } = useT();
  const [page, setPage] = useState(1);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const { data, loading, error, notFound, refetch } = useApi<Paginated<Post>>(
    "/video_news",
    { page },
  );
  const posts = data?.data ?? [];

  return (
    <>
      <PageHero
        title={p.titles.videoNews}
        subtitle={p.subtitles.videoNews}
        crumbs={[{ label: p.titles.news, href: "/news" }, { label: p.titles.videoNews }]}
        icon={<PlayCircle className="w-7 h-7" />}
      />

      <Container className="py-20 lg:py-28">
        {loading ? (
          <CardGridSkeleton count={6} />
        ) : error ? (
          <ErrorState onRetry={refetch} />
        ) : notFound || posts.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => {
                const vid = youtubeId(post.video_link);
                const thumb = vid
                  ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg`
                  : firstImage(post.images, "md");
                return (
                  <button
                    key={post.id}
                    onClick={() => vid && setActiveVideo(vid)}
                    className="group text-left bg-white dark:bg-slate-900 border border-mist-200 dark:border-slate-800 rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      {thumb ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={thumb} alt={post.title || ""} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="h-full w-full bg-slate-200 dark:bg-slate-800" />
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <PlayCircle className="w-14 h-14 text-white/90 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-ink-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date, lang)}
                      </span>
                      <h3 className="font-semibold text-sm text-ink-900 dark:text-white leading-snug mt-2 line-clamp-2">
                        {post.title}
                      </h3>
                    </div>
                  </button>
                );
              })}
            </div>
            {data && (
              <Pagination
                currentPage={data.current_page}
                lastPage={data.last_page}
                onChange={(np) => {
                  setPage(np);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}
          </>
        )}
      </Container>

      {/* Video modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-5 right-5 text-white/80 hover:text-white"
            onClick={() => setActiveVideo(null)}
            aria-label="Yopish"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
