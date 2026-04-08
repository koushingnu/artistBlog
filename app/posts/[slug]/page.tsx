import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CTAButtons } from "@/components/cta-buttons";
import { MdxContent } from "@/components/mdx-content";
import { PostCard } from "@/components/post-card";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { getSongBySlug } from "@/lib/songs";
import { formatDate } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {};
  }
  const song = getSongBySlug(post.songSlug);
  const ogImage = post.coverImage || song?.coverImage;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: ogImage ? [{ url: ogImage }] : undefined,
      type: "article",
    },
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !post.published) {
    notFound();
  }

  const song = getSongBySlug(post.songSlug);
  const relatedPosts = getRelatedPosts(post.slug, post.songSlug);
  const visualImage = post.coverImage || song?.coverImage;
  const youtubeUrl = song?.youtubeUrl ?? post.youtubeUrl;
  const streamingUrl = song?.streamingUrl ?? post.streamingUrl;

  return (
    <article className="mx-auto max-w-3xl space-y-8 sm:space-y-10">
      <header className="space-y-4">
        <p className="text-xs text-zinc-400">{formatDate(post.date)}</p>
        <h1 className="text-2xl leading-tight text-zinc-100 sm:text-3xl md:text-4xl">{post.title}</h1>
        <p className="text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">{post.description}</p>
        <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-zinc-700 px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {visualImage ? (
        <section className="overflow-hidden rounded-2xl border border-white/10">
          <Image
            src={visualImage}
            alt={`${post.title} のキービジュアル`}
            width={1400}
            height={788}
            className="h-auto w-full object-cover"
            priority
          />
        </section>
      ) : null}

      <section className="space-y-4 rounded-2xl border border-white/10 p-4 sm:p-6">
        <h2 className="text-xl text-zinc-100">この楽曲をもっと深く</h2>
        <CTAButtons youtubeUrl={youtubeUrl} streamingUrl={streamingUrl} />
      </section>

      <YoutubeEmbed url={youtubeUrl} title={`${post.title} MV`} />
      <MdxContent source={post.content} />

      <section className="space-y-4 rounded-2xl border border-white/10 p-4 sm:p-6">
        <h2 className="text-xl text-zinc-100">この楽曲をもっと深く</h2>
        <CTAButtons youtubeUrl={youtubeUrl} streamingUrl={streamingUrl} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl text-zinc-100">関連記事</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {relatedPosts.map((relatedPost) => (
            <PostCard key={relatedPost.slug} post={relatedPost} />
          ))}
        </div>
      </section>
    </article>
  );
}
