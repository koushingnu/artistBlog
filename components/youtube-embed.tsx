import { getYoutubeEmbedUrl } from "@/lib/utils";
import Link from "next/link";

type Props = {
  url?: string;
  title: string;
};

export function YoutubeEmbed({ url, title }: Props) {
  if (!url) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
        <p className="text-sm text-zinc-400">YouTubeリンクは準備中です。</p>
      </div>
    );
  }

  const embedUrl = getYoutubeEmbedUrl(url);

  if (!embedUrl) {
    return (
      <div className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6">
        <p className="text-sm text-zinc-300">このURLは埋め込みに未対応です。YouTubeで直接再生してください。</p>
        <Link href={url} target="_blank" className="mt-3 inline-block text-sm text-zinc-100 underline underline-offset-4">
          YouTubeで開く
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10">
      <div className="aspect-video w-full">
        <iframe
          className="h-full w-full"
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  );
}
