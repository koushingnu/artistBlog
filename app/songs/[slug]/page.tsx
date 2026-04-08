import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTAButtons } from "@/components/cta-buttons";
import { PostCard } from "@/components/post-card";
import { YoutubeEmbed } from "@/components/youtube-embed";
import { getPostsBySongSlug } from "@/lib/posts";
import { getAllSongs, getSongBySlug } from "@/lib/songs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllSongs().map((song) => ({ slug: song.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    return {};
  }

  return {
    title: song.title,
    description: song.description,
    openGraph: {
      title: song.title,
      description: song.description,
      images: song.coverImage ? [{ url: song.coverImage }] : undefined,
    },
  };
}

export default async function SongDetailPage({ params }: Props) {
  const { slug } = await params;
  const song = getSongBySlug(slug);
  if (!song) {
    notFound();
  }

  const posts = getPostsBySongSlug(song.slug);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <section className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 md:p-8">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="aspect-square overflow-hidden rounded-xl bg-zinc-800">
            <Image src={song.coverImage} alt={song.title} width={640} height={640} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl text-zinc-100">{song.title}</h1>
            <p className="text-sm leading-8 text-zinc-300">{song.description}</p>
            <CTAButtons youtubeUrl={song.youtubeUrl} streamingUrl={song.streamingUrl} />
          </div>
        </div>
      </section>

      <YoutubeEmbed url={song.youtubeUrl} title={`${song.title} MV`} />

      <section className="space-y-4">
        <h2 className="text-2xl text-zinc-100">この楽曲の分析記事</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} song={song} />
          ))}
          {posts.length === 0 ? <p className="text-zinc-400">まだ記事はありません。</p> : null}
        </div>
      </section>
    </div>
  );
}
