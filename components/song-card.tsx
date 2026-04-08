import Link from "next/link";
import Image from "next/image";
import { Song } from "@/types/content";

type Props = {
  song: Song;
  relatedPostCount: number;
};

export function SongCard({ song, relatedPostCount }: Props) {
  return (
    <Link
      href={`/songs/${song.slug}`}
      aria-label={`${song.title} の楽曲ページを見る`}
      className="block rounded-2xl border border-white/10 bg-zinc-900/40 p-5 transition hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
    >
      <article>
        <div className="aspect-square w-full overflow-hidden rounded-xl bg-zinc-800">
          <Image src={song.coverImage} alt={song.title} width={640} height={640} className="h-full w-full object-cover" />
        </div>
        <h3 className="mt-4 text-xl text-zinc-100">{song.title}</h3>
        <p className="mt-2 text-sm leading-7 text-zinc-300">{song.description}</p>
        <p className="mt-3 text-xs text-zinc-400">分析記事 {relatedPostCount} 件</p>
      </article>
    </Link>
  );
}
