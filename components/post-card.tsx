import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { Post, Song } from "@/types/content";

type Props = {
  post: Post;
  song?: Song;
};

export function PostCard({ post, song }: Props) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      aria-label={`${post.title} の記事を読む`}
      className="block rounded-2xl border border-white/10 bg-zinc-900/40 p-5 transition hover:border-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
    >
      <article>
        <p className="text-xs text-zinc-400">{formatDate(post.date)}</p>
        <h3 className="mt-2 text-xl text-zinc-100">{post.title}</h3>
        <p className="mt-3 text-sm leading-7 text-zinc-300">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-zinc-400">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-zinc-700 px-2 py-1">
              #{tag}
            </span>
          ))}
        </div>
        {song ? <p className="mt-4 text-sm text-zinc-400">関連楽曲: {song.title}</p> : null}
      </article>
    </Link>
  );
}
