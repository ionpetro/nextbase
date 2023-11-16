import { Anchor } from '@/components/Anchor';
import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import PenSquareIcon from 'lucide-react/dist/esm/icons/pen-tool';
import {
  createAuthorProfile,
  getAllAppAdmins,
  getAllAuthors,
  deleteAuthorProfile,
  updateAuthorProfile,
  getAllBlogTags,
  createBlogTag,
  deleteBlogTag,
  updateBlogTag,
} from '../actions';

import { ManageAuthorsDialog } from './ManageAuthorsDialog';
import { ManageBlogTagsDialog } from './ManageBlogTagsDialog';
import { Suspense } from 'react';
import { BlogList } from './BlogList';

async function ActionButtons() {
  const [authors, appAdmins, blogTags] = await Promise.all([
    getAllAuthors(),
    getAllAppAdmins(),
    getAllBlogTags(),
  ]);
  return (
    <div className="space-x-2 mb-6">
      {authors.length ? (
        <Anchor href="/app_admin/blog/post/create">
          <Button variant="default" className="text-sm">
            <PenSquareIcon className="mr-2 w-5 h-5" /> Create blog post
          </Button>
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
  );
}

async function NoAuthorShoutout() {
  const authors = await getAllAuthors();
  return (
    <>
      {authors.length ? null : (
        <T.Subtle>
          You need to create an author profile before you can write a blog post
        </T.Subtle>
      )}
    </>
  );
}

export default function BlogListPage() {
  return (
    <div className=" max-w-5xl space-y-4 ">
      <div className="">
        <div className="space-y-4 max-w-6xl bg-gray-100/50 dark:bg-slate-950/40 border  rounded-lg p-10 py-6 ">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <div className="flex-1 mt-4">
                <T.H2 className="border-none">Blog posts</T.H2>
              </div>
              <Suspense fallback={<T.P>Loading...</T.P>}>
                <ActionButtons />
              </Suspense>
            </div>
            <Suspense>
              <NoAuthorShoutout />
            </Suspense>
          </div>
          <div className="w-full">
            <Suspense fallback={<p>Loading...</p>}>
              <BlogList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
