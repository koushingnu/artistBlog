export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function getYoutubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/i,
  );
  const id = match?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
