'use client';
import { Button } from '@/components/ui/button';
import { deleteBlogPost } from '@/data/admin/internal-blog';
import { useSAToastMutation } from '@/hooks/useSAToastMutation';
import TrashIcon from 'lucide-react/dist/esm/icons/trash-2';

export function DeleteBlogPost({ blogPostId }: { blogPostId: string }) {
  const { mutate, isLoading } = useSAToastMutation(
    async () => {
      return deleteBlogPost(blogPostId);
    },
    {
      loadingMessage: 'Deleting blog post...',
      successMessage: 'Blog post deleted!',
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to delete blog post ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to delete blog post';
        }
      },
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
