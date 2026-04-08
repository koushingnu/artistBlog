import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { Post, PostFrontmatter } from "@/types/content";

const postsDirectory = path.join(process.cwd(), "content/posts");

function getPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getAllPosts(includeUnpublished = false): Post[] {
  const posts = getPostSlugs().map((slug) => getPostBySlug(slug)).filter(Boolean) as Post[];
  const filtered = includeUnpublished ? posts : posts.filter((post) => post.published);

  return filtered.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PostFrontmatter;

  return {
    slug,
    content,
    ...frontmatter,
  };
}

export function getPostsBySongSlug(songSlug: string): Post[] {
  return getAllPosts().filter((post) => post.songSlug === songSlug);
}

export function getRelatedPosts(currentSlug: string, songSlug: string, limit = 3): Post[] {
  return getAllPosts()
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => Number(b.songSlug === songSlug) - Number(a.songSlug === songSlug))
    .slice(0, limit);
}
