'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Table, TableInsertPayload, TableUpdatePayload } from '@/types';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Trash from 'lucide-react/dist/esm/icons/trash';
import { AddBlogTagDialog } from './AddBlogTagDialog';
import { EditBlogTagDialog } from './EditBlogTagDialog';
import TagsIcon from 'lucide-react/dist/esm/icons/tag';
import { useToastMutation } from '@/hooks/useToastMutation';

export const ManageBlogTagsDialog = ({
  blogTags,
  updateBlogTag,
  deleteBlogTag,
  createBlogTag,
}: {
  blogTags: Array<Table<'internal_blog_post_tags'>>;
  updateBlogTag: (
    id: number,
    data: Partial<TableUpdatePayload<'internal_blog_post_tags'>>,
  ) => Promise<void>;
  deleteBlogTag: (id: number) => Promise<void>;
  createBlogTag: (
    data: Partial<TableInsertPayload<'internal_blog_post_tags'>>,
  ) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { mutate: deleteBlogTagMutation, isLoading: isDeletingBlogTag } =
    useToastMutation<void, unknown, number>(
      async (slug) => {
        return deleteBlogTag(slug);
      },
      {
        loadingMessage: 'Deleting blog tag...',
        successMessage: 'Blog tag deleted!',
        errorMessage: 'Failed to delete blog tag',
        onSuccess: () => {
          router.refresh();
        },
      },
    );

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <TagsIcon className="mr-2 w-5 h-5" />
          Manage blog tags
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <TagsIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
            <DialogTitle className="text-lg">Manage blog tags</DialogTitle>
            <DialogDescription className="text-base">
              View, edit, or delete blog tags.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            {blogTags.map((tag) => (
              <div
                className="flex space-x-1 items-center justify-between"
                key={tag.slug}
              >
                <p>{tag.name}</p>
                <div className="flex items-center gap-1">
                  <EditBlogTagDialog tag={tag} updateBlogTag={updateBlogTag} />
                  <Button
                    variant="ghost"
                    disabled={isDeletingBlogTag}
                    className="text-red-600 dark:text-red-400 hover:text-red-600  shadow-none hover:bg-red-100/50 dark:hover:bg-red-900/20"
                    onClick={() => {
                      deleteBlogTagMutation(tag.id);
                      setIsOpen(false);
                    }}
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <AddBlogTagDialog createBlogTag={createBlogTag} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
