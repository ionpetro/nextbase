'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Button } from '@/components/ui/Button';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Textarea } from '@/components/ui/Textarea';
import { Table } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { authorProfileSchema } from '@/utils/zod-schemas/internalBlog';
import { useRouter } from 'next/navigation';

type AuthorProfileFormType = z.infer<typeof authorProfileSchema>;
type CreateAuthorPayload = Omit<
  Table<'internal_blog_author_profiles'>,
  'created_at' | 'updated_at'
>;
export const AddAuthorProfileDialog = ({
  appAdmins,
  createAuthorProfile,
  authorProfiles,
}: {
  appAdmins: Array<Table<'user_profiles'>>;
  authorProfiles: Array<Table<'internal_blog_author_profiles'>>;
  createAuthorProfile: (data: CreateAuthorPayload) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, formState, reset } =
    useForm<AuthorProfileFormType>({
      resolver: zodResolver(authorProfileSchema),
    });

  const {
    mutate: createAuthorProfileMutation,
    isLoading: isCreatingAuthorProfile,
  } = useMutation<void, unknown, CreateAuthorPayload>(
    async (payload) => {
      return createAuthorProfile(payload);
    },
    {
      onSuccess: () => {
        router.refresh();
        toast.success('Successfully created author profile');
        setIsOpen(false);
        reset();
      },
      onError: () => {
        toast.error('Failed to create author profile');
      },
    }
  );

  const { isValid, isLoading } = formState;

  const onSubmit = (data: AuthorProfileFormType) => {
    void createAuthorProfileMutation({
      user_id: data.user_id,
      display_name: data.display_name,
      bio: data.bio,
      avatar_url: data.avatar_url,
      website_url: data.website_url ?? null,
      twitter_handle: data.twitter_handle ?? null,
      facebook_handle: data.facebook_handle ?? null,
      linkedin_handle: data.linkedin_handle ?? null,
      instagram_handle: data.instagram_handle ?? null,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="outline">Add author profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Author Profile</DialogTitle>
          <DialogDescription>
            Fill in the details for the new author profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className="fields space-y-4 max-h-96 px-1 overflow-auto">
            <div className="space-y-2">
              <Label>User ID</Label>
              <Controller
                control={control}
                name="user_id"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {appAdmins.map((admin) => {
                        const disabled = authorProfiles.some(
                          (profile) => profile.user_id === admin.id
                        );
                        return (
                          <SelectItem key={admin.id} value={admin.id}>
                            {admin.full_name || `User ${admin.id}`}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Display Name</Label>
              <Controller
                control={control}
                name="display_name"
                render={({ field }) => (
                  <Input {...field} placeholder="Display Name" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <Textarea {...field} placeholder="Bio" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Avatar URL</Label>
              <Controller
                control={control}
                name="avatar_url"
                render={({ field }) => (
                  <Input {...field} placeholder="Avatar URL" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Website URL</Label>
              <Controller
                control={control}
                name="website_url"
                render={({ field }) => (
                  <Input {...field} placeholder="Website URL" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Twitter Handle</Label>
              <Controller
                control={control}
                name="twitter_handle"
                render={({ field }) => (
                  <Input {...field} placeholder="Twitter Handle" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Facebook Handle</Label>
              <Controller
                control={control}
                name="facebook_handle"
                render={({ field }) => (
                  <Input {...field} placeholder="Facebook Handle" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn Handle</Label>
              <Controller
                control={control}
                name="linkedin_handle"
                render={({ field }) => (
                  <Input {...field} placeholder="LinkedIn Handle" />
                )}
              />
            </div>
            <div className="space-y-2">
              <Label>Instagram Handle</Label>
              <Controller
                control={control}
                name="instagram_handle"
                render={({ field }) => (
                  <Input {...field} placeholder="Instagram Handle" />
                )}
              />
            </div>
          </div>
          <Button disabled={!isValid || isCreatingAuthorProfile} type="submit">
            {isLoading || isCreatingAuthorProfile
              ? 'Submitting...'
              : 'Submit Profile'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};