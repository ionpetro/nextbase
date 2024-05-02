"use client";
import { LucideIcon } from "@/components/LucideIcon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBlogTag } from "@/data/admin/internal-blog";
import { useToastMutation } from "@/hooks/useToastMutation";
import type { Table } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddBlogTagDialog } from "./AddBlogTagDialog";
import { EditBlogTagDialog } from "./EditBlogTagDialog";

export const ManageBlogTagsDialog = ({
  blogTags,
}: {
  blogTags: Array<Table<"internal_blog_post_tags">>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { mutate: deleteBlogTagMutation, isLoading: isDeletingBlogTag } =
    useToastMutation<void, unknown, number>(
      async (slug) => {
        return deleteBlogTag(slug);
      },
      {
        loadingMessage: "Deleting blog tag...",
        successMessage: "Blog tag deleted!",
        errorMessage: "Failed to delete blog tag",
        onSuccess: () => {
          router.refresh();
        },
      },
    );

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-start text-start">
          <LucideIcon name="Tag" className="mr-2 w-5 h-5" />
          Manage blog tags
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="bg-gray-200/50 dark:bg-gray-700/40 p-3 rounded-lg w-fit">
            <LucideIcon name="Tag" className="size-4" />
          </div>
          <div className="mb-4 p-1">
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
                className="flex justify-between items-center space-x-1"
                key={tag.slug}
              >
                <p>{tag.name}</p>
                <div className="flex items-center gap-1">
                  <EditBlogTagDialog tag={tag} />
                  <Button
                    variant="ghost"
                    disabled={isDeletingBlogTag}
                    className="hover:bg-red-100/50 dark:hover:bg-red-900/20 shadow-none text-red-600 hover:text-red-600 dark:text-red-400"
                    onClick={() => {
                      deleteBlogTagMutation(tag.id);
                      setIsOpen(false);
                    }}
                  >
                    <LucideIcon name="Trash" className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <AddBlogTagDialog />
        </div>
      </DialogContent>
    </Dialog>
  );
};
