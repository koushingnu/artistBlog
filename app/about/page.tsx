import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "アーティスト紹介とサイトの目的",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <h1 className="text-3xl text-zinc-100">About</h1>
      <p className="leading-8 text-zinc-300">
        {siteConfig.artistName}によるオリジナル楽曲の歌詞分析メディアです。言葉の背景にある物語や感情の運動を丁寧に言語化し、映像・音楽体験をより深く味わう入口をつくることを目的にしています。
      </p>
      <p className="leading-8 text-zinc-300">
        記事を読んだあと、MV視聴や配信リンクへ自然に遷移できるよう設計しています。楽曲単位で世界観を追えるので、初見でも作品の輪郭を掴みやすい構成です。
      </p>
      <div className="flex gap-4">
        <Link href={siteConfig.social.youtube} target="_blank" className="text-zinc-300 hover:text-white">
          YouTube
        </Link>
        <Link href={siteConfig.social.streaming} target="_blank" className="text-zinc-300 hover:text-white">
          Streaming
        </Link>
      </div>
    </div>
  );
}
