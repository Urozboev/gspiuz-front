import type { Metadata } from "next";
import { serverFetch, unwrap } from "@/lib/server-api";
import { stripHtml, truncate, firstImage } from "@/lib/format";
import { SITE_NAME } from "@/lib/config";
import type { Post } from "@/lib/types";

/**
 * Yangilik sahifasining o'z sarlavhasi va tavsifi.
 *
 * Bularsiz barcha yangiliklar qidiruv natijalarida bir xil sarlavha bilan
 * chiqadi va ijtimoiy tarmoqlarda ulashilganda rasm ko'rinmaydi.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = unwrap<Post>(await serverFetch(`/news/${slug}`));

  if (!post?.title) return { title: "Yangilik" };

  const description = truncate(stripHtml(post.desc || post.subtitle), 160);
  const image = firstImage(post.images, "lg");

  return {
    title: post.title,
    description,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: post.title,
      description,
      url: `/news/${slug}`,
      publishedTime: post.date ?? undefined,
      images: image ? [{ url: image, alt: post.title }] : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
