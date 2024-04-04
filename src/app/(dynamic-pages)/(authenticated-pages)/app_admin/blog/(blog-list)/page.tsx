import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import {
  getAllAppAdmins,
  getAllAuthors,
  getAllBlogTags
} from '@/data/admin/internal-blog';
import PenSquareIcon from 'lucide-react/dist/esm/icons/pen-tool';

import Link from 'next/link';
import { Suspense } from 'react';
import { BlogList } from './BlogList';
import { ManageAuthorsDialog } from './ManageAuthorsDialog';
import { ManageBlogTagsDialog } from './ManageBlogTagsDialog';

async function ActionButtons() {
  const [authors, appAdmins, blogTags] = await Promise.all([
    getAllAuthors(),
    getAllAppAdmins(),
    getAllBlogTags(),
  ]);
  return (
    <div className="space-x-2 mb-6">
      <ManageAuthorsDialog appAdmins={appAdmins} authorProfiles={authors} />
      <ManageBlogTagsDialog blogTags={blogTags} />
      {/* {authors.length ? ( */}
      <Link href="/app_admin/blog/post/create">
        <Button variant="default">
          <PenSquareIcon className="w-6 h-6 mr-2" /> Create blog post
        </Button>
      </Link>
      {/* ) : null} */}
    </div>
  );
}

// async function NoAuthorShoutout() {
//   const authors = await getAllAuthors();
//   return (
//     <>
//       {authors.length ? null : (
//         <T.Subtle>
//           You need to create an author profile before you can write a blog post
//         </T.Subtle>
//       )}
//     </>
//   );
// }

export default function BlogListPage() {
  return (
    <div className=" max-w-5xl space-y-4 ">
      <div className="">
        <div className="space-y-4 max-w-6xl">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <div className="flex-1 mt-4">
                <T.H2 className="border-none">Blog posts</T.H2>
              </div>
              <Suspense fallback={<T.P>Loading...</T.P>}>
                <ActionButtons />
              </Suspense>
            </div>
            {/* <Suspense>
              <NoAuthorShoutout />
            </Suspense> */}
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
