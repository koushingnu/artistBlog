export type Song = {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  youtubeUrl?: string;
  streamingUrl?: string;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags: string[];
  songSlug: string;
  youtubeUrl?: string;
  streamingUrl?: string;
  coverImage: string;
  published: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  content: string;
};
