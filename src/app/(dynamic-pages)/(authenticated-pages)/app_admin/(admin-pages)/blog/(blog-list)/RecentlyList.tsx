import Image from "next/image";
import Link from "next/link";
import type { BlogPostWithTags } from "./page";

type Props = {
  blogs: BlogPostWithTags[];
};

export const SmallBlogPostList = ({ blogs }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {blogs.map((blog) => (
        <Link href={`/blog/${blog.id}`} key={blog.id} className="grid grid-cols-3 gap-4 place-content-center border-input border rounded-lg p-2 hover:bg-accent transition-colors duration-200 ease-in-out">
          <div className="relative size-14 lg:size-18 xl:size-20 rounded-lg col-span-1">
            <Image src={blog.cover_image ?? ""} alt={blog.title} fill className="object-cover rounded-lg" />
          </div>

          <div className="col-span-2">
            <h3 className="text-md font-bold">{blog.title}</h3>
            <p className="text-muted-foreground text-sm">{blog.summary.slice(0, 30)}...</p>
          </div>

        </Link>
      ))}
    </div>
  );
};

