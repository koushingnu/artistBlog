import Link from "next/link";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/posts", label: "記事" },
  { href: "/songs", label: "楽曲" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="text-xs tracking-[0.2em] text-zinc-100 sm:text-sm">
          {siteConfig.name}
        </Link>
        <nav className="flex w-full items-center justify-between gap-4 text-sm text-zinc-300 sm:w-auto sm:justify-start sm:gap-5">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
