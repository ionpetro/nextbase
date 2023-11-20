'use client';
import { Button } from '@/components/ui/Button';
import TrashIcon from 'lucide-react/dist/esm/icons/trash-2';
import { useToastMutation } from '@/hooks/useToastMutation';
import { deleteBlogPost } from '@/data/admin/internal-blog';

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
      variant="infoLink"
      aria-disabled={isLoading}
      className="text-red-500 dark:text-red-500 hover:text-red-600 hover:dark:text-red-400 p-0"
    >
      {<TrashIcon className="mr-2 h-5 w-5" />}
    </Button>
  );
}
