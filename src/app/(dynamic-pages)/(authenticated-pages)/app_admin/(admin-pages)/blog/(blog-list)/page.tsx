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
import { SmallBlogPostList } from "./RecentlyList";

async function ActionButtons() {
  const [authors, appAdmins, blogTags] = await Promise.all([
    getAllAuthors(),
    getAllAppAdmins(),
    getAllBlogTags(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 content-start">
      <div className="flex flex-col gap-4">
        <ManageAuthorsDialog appAdmins={appAdmins} authorProfiles={authors} />
      </div>
      <p className="text-xs text-muted-foreground">Hint :  Attach a blog post to an author so that they are all visible in that author's dedicated page publicly</p>
      <ManageBlogTagsDialog blogTags={blogTags} />

      {/* {authors.length ? ( */}
      <Link href="/app_admin/blog/post/create">
        <Button variant="default" className="w-full justify-start">
          <PenSquareIcon className="size-4 mr-2" /> Create blog post
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
  const blogs: BlogPostWithTags[] = await getAllBlogPosts(filters);
  const tags = await getAllBlogTags();
  const totalPages = await getBlogPostsTotalPages(filters);

  const draftedList = await getAllBlogPosts({ status: "draft" });
  const recentlyList = await getAllBlogPosts({ page: 1, sort: "desc" });
  return (
    <div className="space-y-4 w-full grid grid-cols-1 lg:grid-cols-6 gap-12">
      <div className="space-y-2 lg:row-start-1 row-start-2 lg:col-span-4 col-span-1">
        <div className="flex justify-between items-baseline">
          <div className="flex-1 mt-4">
            <T.H2 className="border-none">All posts</T.H2>
          </div>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="flex flex-col gap-4 lg:w-1/3">
            <Search placeholder="Search posts... " />
            <BlogFacetedFilters tags={tags.map(tag => tag.name)} />
          </div>

          {blogs.length > 0 ? <BlogViews blogs={blogs} /> : <T.Subtle>No blog posts yet!</T.Subtle>}
        </Suspense>
        <div className="border-t py-2">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
      <Suspense fallback={<T.P>Loading...</T.P>}>
        <div className="space-y-8 col-span-1 lg:col-span-2 row-start-1">
          <div className="space-y-4">
            <Label className="text-md">Blog settings</Label>
            <ActionButtons />
          </div>
          <div className="hidden lg:block">
            {recentlyList.length > 0 && <div className="space-y-4">
              <Label className="text-md">Recently published</Label>
              <SmallBlogPostList blogs={recentlyList} />
            </div>}
            {draftedList.length > 0 && <div className="space-y-4">
              <Label className="text-md">Drafted posts</Label>
              <SmallBlogPostList blogs={draftedList} />
            </div>}
          </div>

        </div>

      </Suspense>
    </div>

  );
}
