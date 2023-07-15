'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Trash } from 'lucide-react';

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
    data: Partial<TableUpdatePayload<'internal_blog_author_profiles'>>
  ) => Promise<void>;
  deleteAuthorProfile: (userId: string) => Promise<void>;
  createAuthorProfile: (data: AuthorProfile) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const {
    mutate: deleteAuthorProfileMutation,
    isLoading: isDeletingAuthorProfile,
  } = useMutation<void, unknown, string>(
    async (id) => {
      return deleteAuthorProfile(id);
    },
    {
      onSuccess: () => {
        toast.success('Successfully deleted author profile');
        router.refresh();
      },
      onError: () => {
        toast.error('Failed to delete author profile');
      },
    }
  );

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">Manage author profiles</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Author Profiles</DialogTitle>
          <DialogDescription>
            View, edit, or delete author profiles.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            {authorProfiles.map((profile) => (
              <div
                className="flex space-x-1 items-center justify-between"
                key={profile.user_id}
              >
                <p>{profile.display_name}</p>
                <div className="flex items-center gap-1">
                  <EditAuthorProfileDialog
                    appAdmins={appAdmins}
                    profile={profile}
                    updateAuthorProfile={updateAuthorProfile}
                  />
                  <Button
                    variant="ghost"
                    onClick={() => {
                      deleteAuthorProfileMutation(profile.user_id);
                      setIsOpen(false);
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <AddAuthorProfileDialog
            createAuthorProfile={createAuthorProfile}
            appAdmins={appAdmins}
            authorProfiles={authorProfiles}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
