import Link from "next/link";
import { CTAButtons } from "@/components/cta-buttons";
import { PostCard } from "@/components/post-card";
import { SongCard } from "@/components/song-card";
import { getAllPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";
import { getAllSongs } from "@/lib/songs";

export default function HomePage() {
  const allPosts = getAllPosts();
  const posts = allPosts.slice(0, 3);
  const songs = getAllSongs();
  const latestSong = songs[0];
  const featuredSongs = songs.slice(0, 3);

  return (
    <div className="space-y-16">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-zinc-900/40 p-8 md:p-12">
        <p className="text-xs tracking-[0.25em] text-zinc-400">LYRICS / FILM / EMOTION</p>
        <h1 className="max-w-3xl text-3xl leading-tight text-zinc-100 md:text-5xl">
          言葉の余韻を解き明かし、映像と音へ還すための作品メディア
        </h1>
        <p className="max-w-2xl text-sm leading-8 text-zinc-300 md:text-base">
          自作楽曲の歌詞を、文学的な手触りを残しながら丁寧に分析。言葉の背景を辿ることで、MV視聴や配信体験がより深くなる導線を設計しています。
        </p>
        {latestSong && (latestSong.youtubeUrl || latestSong.streamingUrl) ? (
          <CTAButtons youtubeUrl={latestSong.youtubeUrl} streamingUrl={latestSong.streamingUrl} />
        ) : null}
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl text-zinc-100">最新の記事（歌詞の解説）</h2>
            <p className="text-sm text-zinc-400">
              言葉の意味や背景を読むためのページ。読んだ後にMV・配信へ進めます。
            </p>
          </div>
          <Link href="/posts" className="text-sm text-zinc-400 hover:text-zinc-100">
            すべて見る
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const song = songs.find((item) => item.slug === post.songSlug);
            return <PostCard key={post.slug} post={post} song={song} />;
          })}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-2xl text-zinc-100">楽曲ピックアップ（作品ページ）</h2>
            <p className="text-sm text-zinc-400">
              MV・配信リンク・関連分析記事をまとめて見るためのページです。
            </p>
          </div>
          <Link href="/songs" className="text-sm text-zinc-400 hover:text-zinc-100">
            すべて見る
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredSongs.map((song) => (
            <SongCard key={song.slug} song={song} relatedPostCount={allPosts.filter((post) => post.songSlug === song.slug).length} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-white/10 p-6 md:grid-cols-3">
        <Link href="/songs" className="rounded-xl border border-zinc-800 p-4 hover:border-zinc-600">
          楽曲一覧を見る
        </Link>
        <Link href={siteConfig.social.youtube} target="_blank" className="rounded-xl border border-zinc-800 p-4 hover:border-zinc-600">
          YouTubeで視聴
        </Link>
        <Link href="/about" className="rounded-xl border border-zinc-800 p-4 hover:border-zinc-600">
          プロフィールを見る
        </Link>
      </section>
    </div>
  );
}
