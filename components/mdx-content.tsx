import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

type Props = {
  source: string;
};

export async function MdxContent({ source }: Props) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
    },
  });

  return (
    <div
      className="
        max-w-none text-[15px] leading-7 text-zinc-200 sm:text-[16px]
        [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-zinc-100 sm:[&_h2]:mt-14 sm:[&_h2]:mb-5 sm:[&_h2]:text-2xl
        [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-medium [&_h3]:text-zinc-100 sm:[&_h3]:mt-10 sm:[&_h3]:mb-4 sm:[&_h3]:text-xl
        [&_p]:my-4 [&_p]:leading-7 [&_p]:text-zinc-200
        [&_strong]:font-semibold [&_strong]:text-zinc-50
        [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
        [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
        [&_blockquote]:my-7 [&_blockquote]:border-l-2 [&_blockquote]:border-zinc-700 [&_blockquote]:pl-4 [&_blockquote]:text-zinc-300
        [&_hr]:my-10 [&_hr]:border-zinc-800
        [&_details]:my-6 [&_details]:rounded-2xl [&_details]:border [&_details]:border-white/10
        [&_summary]:cursor-pointer [&_summary]:list-none [&_summary]:px-4 [&_summary]:py-3 [&_summary]:text-sm [&_summary]:font-medium [&_summary]:text-zinc-100 sm:[&_summary]:px-5 sm:[&_summary]:py-4
        [&_summary::-webkit-details-marker]:hidden
        [&_details[open]_summary]:border-b [&_details[open]_summary]:border-white/10
        [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-transparent [&_pre]:p-4 sm:[&_pre]:p-5
        [&_pre_code]:whitespace-pre-wrap [&_pre_code]:break-words [&_pre_code]:text-sm [&_pre_code]:leading-7 [&_pre_code]:text-zinc-100
        [&_code]:rounded [&_code]:bg-transparent [&_code]:px-0 [&_code]:py-0 [&_code]:text-[0.9em]
      "
    >
      {content}
    </div>
  );
}
