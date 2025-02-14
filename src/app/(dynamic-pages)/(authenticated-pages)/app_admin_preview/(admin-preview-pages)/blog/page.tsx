import { PageHeading } from '@/components/PageHeading';
import { Button } from '@/components/ui/button';
import { PenSquare } from 'lucide-react';
import { BlogListPreview } from '../../../app_admin/(admin-pages)/blog/(blog-list)/BlogListPreview';

export default function AdminBlogList() {
  return (
    <div className="space-y-4 max-w-[1296px]">
      <PageHeading
        title="Blog posts"
        subTitle="Create blog posts and share them publicly with your users."
        actions={
          <div className="space-x-2 flex items-center">
            <Button variant="default" className="text-sm">
              <PenSquare className="mr-2 w-5 h-5" /> Create blog post
            </Button>
            <Button variant="default" className="text-sm">
              Manage Authors
            </Button>
            <Button variant="default" className="text-sm">
              Manage Tags
            </Button>
          </div>
        }
      ></PageHeading>
      <BlogListPreview />
    </div>
  );
}
