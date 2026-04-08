import type { Metadata } from "next";
import { SongCard } from "@/components/song-card";
import { getPostsBySongSlug } from "@/lib/posts";
import { getAllSongs } from "@/lib/songs";

export const metadata: Metadata = {
  title: "楽曲一覧",
  description: "楽曲ごとの情報と関連分析記事一覧",
};

export default function SongsPage() {
  const songs = getAllSongs();

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl text-zinc-100">楽曲一覧</h1>
        <p className="text-sm text-zinc-400">
          楽曲ページは「作品のハブ」です。MV・配信リンク・関連分析記事をまとめて確認できます。
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {songs.map((song) => (
          <SongCard key={song.slug} song={song} relatedPostCount={getPostsBySongSlug(song.slug).length} />
        ))}
      </div>
    </div>
  );
}
