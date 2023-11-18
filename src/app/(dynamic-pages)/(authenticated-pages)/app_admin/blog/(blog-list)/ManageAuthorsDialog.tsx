'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Table, TableUpdatePayload } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AddAuthorProfileDialog } from './AddAuthorProfileDialog';
import { EditAuthorProfileDialog } from './EditAuthorProfileDialog';
import Trash from 'lucide-react/dist/esm/icons/trash';
import UsersIcon from 'lucide-react/dist/esm/icons/users';
import { T } from '@/components/ui/Typography';
import { useToastMutation } from '@/hooks/useToastMutation';

type AuthorProfile = Table<'internal_blog_author_profiles'>;

export const ManageAuthorsDialog = ({
  appAdmins,
  authorProfiles,
  updateAuthorProfile,
  deleteAuthorProfile,
  createAuthorProfile,
}: {
  appAdmins: Array<Table<'user_profiles'>>;
  authorProfiles: Array<Table<'internal_blog_author_profiles'>>;
  updateAuthorProfile: (
    userId: string,
    data: Partial<TableUpdatePayload<'internal_blog_author_profiles'>>,
  ) => Promise<void>;
  deleteAuthorProfile: (userId: string) => Promise<void>;
  createAuthorProfile: (data: AuthorProfile) => Promise<void>;
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
      loadingMessage: 'Deleting author profile...',
      successMessage: 'Author profile deleted!',
      errorMessage: 'Failed to delete author profile',
      onSuccess: () => {
        router.refresh();
      },
    },
  );

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <UsersIcon className="mr-2 w-5 h-5" />
          Manage author profiles
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 rounded-lg">
            <UsersIcon className="w-6 h-6" />
          </div>
          <div className="p-1 mb-4">
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
                className="flex space-x-1 items-center justify-between"
                key={profile.user_id}
              >
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-300/50 border dark:bg-gray-700/40 flex items-center justify-center">
                    <T.P className="font-semibold text-gray-800 dark:text-gray-400 uppercase">
                      {profile.display_name ? profile.display_name[0] : ''}
                    </T.P>
                  </div>

                  <T.P>{profile.display_name}</T.P>
                </div>

                <div className="flex items-center">
                  <EditAuthorProfileDialog
                    appAdmins={appAdmins}
                    profile={profile}
                    updateAuthorProfile={updateAuthorProfile}
                  />
                  <Button
                    variant="ghost"
                    className="text-red-600 dark:text-red-400 hover:text-red-600  shadow-none hover:bg-red-100/50 dark:hover:bg-red-900/20"
                    onClick={() => {
                      deleteAuthorProfileMutation(profile.user_id);
                    }}
                  >
                    <Trash className="h-5 w-5" />
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
            createAuthorProfile={createAuthorProfile}
            appAdmins={appAdmins}
            authorProfiles={authorProfiles}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
