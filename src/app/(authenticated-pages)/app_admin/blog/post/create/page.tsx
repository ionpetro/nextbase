import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import Link from 'next/link';
import { BiLeftArrowAlt } from 'react-icons/bi';
import { createBlogPost, getAllAuthors } from '../../actions';
import { BlogForm } from '../../BlogForm';

export default async function CreateBlogPostPage() {
  const [authors] = await Promise.all([getAllAuthors()]);
  return (
    <div className="space-y-4">
      <Link href="/app_admin/blog">
        <Button variant="infoLink" className="flex items-center justify-center">
          <BiLeftArrowAlt /> <span>Back to blog</span>
        </Button>
      </Link>
      <T.H3>Create Blog Post</T.H3>
      <BlogForm authors={authors} mode="create" onSubmit={createBlogPost} />
    </div>
  );
}
