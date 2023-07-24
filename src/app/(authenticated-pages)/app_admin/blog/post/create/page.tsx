import { Button } from '@/components/ui/Button';
import { T } from '@/components/ui/Typography';
import Link from 'next/link';
import LeftArrowIcon from 'lucide-react/dist/esm/icons/arrow-left';
import { createBlogPost, getAllAuthors, getAllBlogTags } from '../../actions';
import { BlogForm } from '../../BlogForm';

export default async function CreateBlogPostPage() {
  const [authors, tags] = await Promise.all([getAllAuthors(), getAllBlogTags()]);
  return (
    <div className="space-y-4">
      <Link href="/app_admin/blog">
        <Button variant="infoLink" className="flex items-center justify-center">
          <LeftArrowIcon /> <span>Back to blog</span>
        </Button>
      </Link>
      <T.H3>Create Blog Post</T.H3>
      <BlogForm tags={tags} authors={authors} mode="create" onSubmit={createBlogPost} />
    </div>
  );
}
