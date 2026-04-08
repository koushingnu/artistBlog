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
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-sm tracking-[0.2em] text-zinc-100">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-5 text-sm text-zinc-300">
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
