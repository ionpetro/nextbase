'use client';
import { LucideIcon } from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import { deleteBlogPost } from '@/data/admin/internal-blog';
import { useToastMutation } from '@/hooks/useToastMutation';

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
      <LucideIcon name="Trash" className="w-6 h-6" />
    </Button>
  );
}
