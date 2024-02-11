'use client';
import { Button } from '@/components/ui/button';
import { deleteBlogPost } from '@/data/admin/internal-blog';
import { useToastMutation } from '@/hooks/useToastMutation';
import TrashIcon from 'lucide-react/dist/esm/icons/trash-2';

export function DeleteBlogPost({ blogPostId }: { blogPostId: string }) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return deleteBlogPost(blogPostId);
    },
    {
      loadingMessage: 'Deleting blog post...',
      successMessage: 'Blog post deleted!',
      errorMessage: 'Failed to delete blog post',
    },
  );

  return (
    <Button
      type="button"
      onClick={() => {
        mutate();
      }}
      size="icon"
      variant="ghost"
      aria-disabled={isLoading}
    >
      <TrashIcon className="h-6 w-6" />
    </Button>
  );
}
