import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import Link from 'next/link';
import { createBlogPost, getAllAuthors, getAllBlogTags } from '../../actions';
import { BlogForm } from '../../BlogForm';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import Overline from '@/components/presentational/tailwind/Text/Overline';

export default async function CreateBlogPostPage() {
  const [authors, tags] = await Promise.all([
    getAllAuthors(),
    getAllBlogTags(),
  ]);
  return (
    <div className="space-y-4">
      <Link href="/app_admin/blog">
        <div className="flex space-x-2 items-center group">
          <ChevronLeft className="relative text-gray-500 h-4 w-4 hover:-translate-x-10 group-hover:text-gray-800 group-hover:dark:text-gray-400 dark:text-gray-600" />
          <Overline className="text-gray-500 group-hover:text-gray-800 dark:text-gray-600 group-hover:dark:text-gray-400">
            Back to blog
          </Overline>
        </div>
      </Link>
      <T.H3>Create Blog Post</T.H3>
      <BlogForm
        tags={tags}
        authors={authors}
        mode="create"
        onSubmit={createBlogPost}
      />
    </div>
  );
}
