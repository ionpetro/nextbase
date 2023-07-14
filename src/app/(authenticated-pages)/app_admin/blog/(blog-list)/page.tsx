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
} from '../actions';

import BlogList from './BlogList';
import { ManageAuthorsDialog } from './ManageAuthorsDialog';

export default async function BlogListPage() {
  const [authors, allBlogPosts, appAdmins] = await Promise.all([
    getAllAuthors(),
    getAllBlogPosts(),
    getAllAppAdmins(),
  ]);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <T.H2> Blog posts</T.H2>
          {authors.length ? (
            <Anchor href="/app_admin/blog/post/create">
              <Button variant="outline"> Create blog post</Button>
            </Anchor>
          ) : (
            <T.Subtle>
              You need to create an author profile before you can write a blog
              post
            </T.Subtle>
          )}
          {allBlogPosts.length ? (
            <BlogList deleteBlogPost={deleteBlogPost} blogs={allBlogPosts} />
          ) : (
            <T.Subtle>No blog posts yet.</T.Subtle>
          )}
        </div>
        <ManageAuthorsDialog
          appAdmins={appAdmins}
          authorProfiles={authors}
          updateAuthorProfile={updateAuthorProfile}
          deleteAuthorProfile={deleteAuthorProfile}
          createAuthorProfile={createAuthorProfile}
        />
      </div>
    </div>
  );
}
