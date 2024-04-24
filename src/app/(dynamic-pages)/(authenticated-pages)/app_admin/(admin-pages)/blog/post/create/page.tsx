import { CreateBlogPostForm } from '@/components/blog/CreateBlogPostForm';
import { getAllBlogTags } from '@/data/admin/internal-blog';

export default async function BlogPostCreatePage() {
  const blogTags = await getAllBlogTags();
  return <CreateBlogPostForm tags={blogTags} />;
}
