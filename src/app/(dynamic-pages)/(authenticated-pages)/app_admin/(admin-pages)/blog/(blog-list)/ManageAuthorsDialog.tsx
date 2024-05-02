"use client";
import { LucideIcon } from "@/components/LucideIcon";
import { T } from "@/components/ui/Typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAuthorProfile } from "@/data/admin/internal-blog";
import { useToastMutation } from "@/hooks/useToastMutation";
import type { Table } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddAuthorProfileDialog } from "./AddAuthorProfileDialog";
import { EditAuthorProfileDialog } from "./EditAuthorProfileDialog";

type AuthorProfile = Table<"internal_blog_author_profiles">;

export const ManageAuthorsDialog = ({
  appAdmins,
  authorProfiles,
}: {
  appAdmins: Array<Table<"user_profiles">>;
  authorProfiles: Array<Table<"internal_blog_author_profiles">>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {
    mutate: deleteAuthorProfileMutation,
    isLoading: isDeletingAuthorProfile,
  } = useToastMutation<void, unknown, string>(
    async (id) => {
      return deleteAuthorProfile(id);
    },
    {
      loadingMessage: "Deleting author profile...",
      successMessage: "Author profile deleted!",
      errorMessage: "Failed to delete author profile",
      onSuccess: () => {
        router.refresh();
      },
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline" className="justify-start">
          <LucideIcon name="Users" className="mr-2 size-4" />
          Manage author profiles
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="bg-gray-200/50 dark:bg-gray-700/40 p-3 rounded-lg w-fit">
            <LucideIcon name="Users" className="w-6 h-6" />
          </div>
          <div className="mb-4 p-1">
            <DialogTitle className="text-lg">
              Manage author profiles
            </DialogTitle>
            <DialogDescription className="text-base">
              View, edit, or delete author profiles.
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2 mb-4">
            {authorProfiles.map((profile) => (
              <div
                className="flex justify-between items-center space-x-1"
                key={profile.user_id}
              >
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-gray-300/50 dark:bg-gray-700/40 border rounded-full w-10 h-10">
                    <T.P className="font-semibold text-gray-800 dark:text-gray-400 uppercase">
                      {profile.display_name ? profile.display_name[0] : ""}
                    </T.P>
                  </div>

                  <T.P>{profile.display_name}</T.P>
                </div>

                <div className="flex items-center">
                  <EditAuthorProfileDialog
                    appAdmins={appAdmins}
                    profile={profile}
                  />
                  <Button
                    variant="ghost"
                    className="hover:bg-red-100/50 dark:hover:bg-red-900/20 shadow-none text-red-600 hover:text-red-600 dark:text-red-400"
                    onClick={() => {
                      deleteAuthorProfileMutation(profile.user_id);
                    }}
                  >
                    <LucideIcon name="Trash" className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
          <AddAuthorProfileDialog
            appAdmins={appAdmins}
            authorProfiles={authorProfiles}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
