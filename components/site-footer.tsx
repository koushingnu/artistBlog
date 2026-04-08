import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
        <p>{siteConfig.artistName} / {siteConfig.name}</p>
        <div className="flex gap-4">
          <Link href={siteConfig.social.youtube} target="_blank" className="hover:text-zinc-100">
            YouTube
          </Link>
          <Link href={siteConfig.social.streaming} target="_blank" className="hover:text-zinc-100">
            Streaming
          </Link>
        </div>
      </div>
    </footer>
  );
}
