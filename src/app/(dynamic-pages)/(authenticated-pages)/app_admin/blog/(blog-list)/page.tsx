import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import {
  createAuthorProfile,
  getAllAppAdmins,
  getAllAuthors,
  getAllBlogPosts,
  deleteAuthorProfile,
  updateAuthorProfile,
  deleteBlogPost,
  getAllBlogTags,
  createBlogTag,
  deleteBlogTag,
  updateBlogTag,
} from '../actions';

import BlogList from './BlogList';
import { ManageAuthorsDialog } from './ManageAuthorsDialog';
import { ManageBlogTagsDialog } from './ManageBlogTagsDialog';

export default async function BlogListPage() {
  const [authors, allBlogPosts, appAdmins, blogTags] = await Promise.all([
    getAllAuthors(),
    getAllBlogPosts(),
    getAllAppAdmins(),
    getAllBlogTags(),
  ]);
  return (
    <div className="space-y-4">
      <div className="">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <div className="flex-1">
                <T.H2 className="border-none"> Blog posts</T.H2>
              </div>
              <div className="space-x-2">
                {authors.length ? (
                  <Anchor href="/app_admin/blog/post/create">
                    <Button variant="default"> Create blog post</Button>
                  </Anchor>
                ) : null}
                <ManageAuthorsDialog
                  appAdmins={appAdmins}
                  authorProfiles={authors}
                  updateAuthorProfile={updateAuthorProfile}
                  deleteAuthorProfile={deleteAuthorProfile}
                  createAuthorProfile={createAuthorProfile}
                />
                <ManageBlogTagsDialog
                  blogTags={blogTags}
                  createBlogTag={createBlogTag}
                  deleteBlogTag={deleteBlogTag}
                  updateBlogTag={updateBlogTag}
                />
              </div>
            </div>

            {authors.length ? null : (
              <T.Subtle>
                You need to create an author profile before you can write a blog
                post
              </T.Subtle>
            )}
          </div>
          <div className="max-w-4xl">
            {allBlogPosts.length ? (
              <BlogList deleteBlogPost={deleteBlogPost} blogs={allBlogPosts} />
            ) : (
              <T.Subtle>No blog posts yet.</T.Subtle>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
