import fs from "node:fs";
import path from "node:path";
import { Song } from "@/types/content";

const songsDirectory = path.join(process.cwd(), "content/songs");

export function getAllSongs(): Song[] {
  const files = fs
    .readdirSync(songsDirectory)
    .filter((file) => file.endsWith(".json"));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(songsDirectory, file), "utf-8");
      return JSON.parse(raw) as Song;
    })
    .sort((a, b) => a.title.localeCompare(b.title, "ja"));
}

export function getSongBySlug(slug: string): Song | undefined {
  return getAllSongs().find((song) => song.slug === slug);
}
