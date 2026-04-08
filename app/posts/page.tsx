import type { Metadata } from "next";
import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/posts";
import { getAllSongs } from "@/lib/songs";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "歌詞分析記事の一覧ページ",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const songs = getAllSongs();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl text-zinc-100">歌詞分析記事</h1>
        <p className="text-sm text-zinc-400">
          記事ページは「歌詞の意味を読む場所」です。各カードから楽曲ページやMVに進めます。
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} song={songs.find((song) => song.slug === post.songSlug)} />
        ))}
      </div>
    </div>
  );
}
