import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import {
  createAuthorProfile,
  getAllAppAdmins,
  getAllAuthors,
  getAllBlogPosts,
} from '../actions';

import { AddAuthorProfileDialog } from './AddAuthorProfileDialog';
import AuthorsList from './AuthorList';
import BlogList from './BlogList';

export default async function BlogListPage() {
  const [authors, allBlogPosts, appAdmins] = await Promise.all([
    getAllAuthors(),
    getAllBlogPosts(),
    getAllAppAdmins(),
  ]);
  return (
    <div className="space-y-4">
      <div className="author-list">
        {authors.length ? (
          <AuthorsList authors={authors} />
        ) : (
          <T.Subtle>
            No authors yet. Please create author profiles before you write blog
            posts
          </T.Subtle>
        )}
      </div>
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
            <BlogList blogs={allBlogPosts} />
          ) : (
            <T.Subtle>No blog posts yet.</T.Subtle>
          )}
        </div>
        <AddAuthorProfileDialog
          createAuthorProfile={createAuthorProfile}
          appAdmins={appAdmins}
        />
      </div>
    </div>
  );
}
