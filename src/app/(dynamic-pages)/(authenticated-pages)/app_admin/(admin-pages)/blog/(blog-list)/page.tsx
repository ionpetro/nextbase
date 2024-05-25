import { T } from "@/components/ui/Typography";
import {
  getAllAppAdmins,
  getAllAuthors,
  getAllBlogPosts,
  getAllBlogTags,
  getBlogPostsTotalPages,
} from "@/data/admin/internal-blog";

import { Button } from "@/components/Button";
import { Search } from "@/components/Search";
import BlogViews from "@/components/blog/BlogViews";
import { Label } from "@/components/ui/label";
import type { Tables } from "@/lib/database.types";
import { PenSquareIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { BlogFacetedFilters } from "./BlogFilters";
import { ManageAuthorsDialog } from "./ManageAuthorsDialog";
import { ManageBlogTagsDialog } from "./ManageBlogTagsDialog";

import { z } from "zod";
import { sortSchema } from "./schema";

import { Pagination } from '@/components/Pagination';
import { Skeleton } from "@/components/ui/skeleton";
import { SmallBlogPostList } from "./RecentlyList";

async function ActionButtons() {
  const [authors, appAdmins, blogTags] = await Promise.all([
    getAllAuthors(),
    getAllAppAdmins(),
    getAllBlogTags(),
  ]);
  return (
    <div className="content-start gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
      <div className="flex flex-col gap-4">
        <ManageAuthorsDialog appAdmins={appAdmins} authorProfiles={authors} />
      </div>
      <p className="text-muted-foreground text-xs">Hint :  Attach a blog post to an author so that they are all visible in that author's dedicated page publicly</p>
      <ManageBlogTagsDialog blogTags={blogTags} />

      {/* {authors.length ? ( */}
      <Link href="/app_admin/blog/post/create">
        <Button variant="default" className="justify-start w-full">
          <PenSquareIcon className="mr-2 size-4" /> Create blog post
        </Button>
      </Link>
      {/* ) : null} */}
    </div>
  );
}

export type BlogPostWithTags = Tables<"internal_blog_posts"> & {
  author: Tables<"internal_blog_author_profiles"> | null;
  tags: Tables<"internal_blog_post_tags">[];
};

const blogFiltersSchema = z
  .object({
    page: z.coerce.number().int().positive().optional(),
    query: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    status: z.enum(["draft", "published"]).optional(),
  })
  .merge(z.object({ sort: sortSchema }));

export type BlogFiltersSchema = z.infer<typeof blogFiltersSchema>;

export default async function BlogListPage({ searchParams }: { searchParams: unknown }) {
  const filters = blogFiltersSchema.parse(searchParams);
  const blogs: BlogPostWithTags[] = await getAllBlogPosts({ ...filters });
  const tags = await getAllBlogTags();
  const totalPages = await getBlogPostsTotalPages(filters);


  return (
    <div className="gap-12 space-y-4 grid grid-cols-1 lg:grid-cols-6 w-full">
      <div className="space-y-2 col-span-1 lg:col-span-4 row-start-2 lg:row-start-1">
        <div className="flex justify-between items-baseline">
          <div className="flex-1 mt-4">
            <T.H2 className="border-none">All posts</T.H2>
          </div>
        </div>
        <Suspense fallback={<Skeleton className="w-16 h-6" />}>
          <div className="flex flex-col gap-4 lg:w-1/3">
            <Search placeholder="Search posts... " />
            <BlogFacetedFilters tags={tags.map(tag => tag.name)} />
          </div>

          {blogs.length > 0 ? <BlogViews blogs={blogs} /> : <T.Subtle>No blog posts yet!</T.Subtle>}
        </Suspense>
        <Pagination totalPages={totalPages} />
      </div>

      <div className="space-y-8 col-span-1 lg:col-span-2 row-start-1">
        <div className="space-y-4">
          <Label className="text-md">Blog settings</Label>
          <Suspense fallback={<Skeleton className="w-16 h-6" />}>
            <ActionButtons />
          </Suspense>
        </div>
        <div className="lg:flex flex-col gap-4 hidden">
          <div className="space-y-4">
            <Label className="text-md">Recently published</Label>
            <Suspense fallback={<Skeleton className="w-16 h-6" />}>
              <SmallBlogPostList typeList={"published"} />
            </Suspense>
          </div>
          <div className="space-y-4">
            <Label className="text-md">Drafted posts</Label>
            <Suspense fallback={<Skeleton className="w-16 h-6" />}>
              <SmallBlogPostList typeList={"draft"} />
            </Suspense>
          </div>
        </div>

      </div>

    </div>

  );
}
