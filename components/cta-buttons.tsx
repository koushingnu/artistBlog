import Link from "next/link";

type Props = {
  youtubeUrl?: string;
  streamingUrl?: string;
};

export function CTAButtons({ youtubeUrl, streamingUrl }: Props) {
  if (!youtubeUrl && !streamingUrl) {
    return (
      <p className="text-sm text-zinc-400">
        視聴リンクは準備中です。公開までお待ちください。
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {youtubeUrl ? (
        <Link
          href={youtubeUrl}
          target="_blank"
          className="rounded-full bg-zinc-100 px-5 py-2 text-sm text-zinc-900 transition hover:bg-white"
        >
          映像で見る
        </Link>
      ) : null}
      {streamingUrl ? (
        <Link
          href={streamingUrl}
          target="_blank"
          className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-100 transition hover:border-zinc-500"
        >
          配信で聴く
        </Link>
      ) : null}
    </div>
  );
}
