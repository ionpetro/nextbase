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
import { Textarea } from '@/components/ui/Textarea';
import { Table } from '@/types';
import { toast } from 'react-hot-toast';
import { authorProfileSchema } from '@/utils/zod-schemas/internalBlog';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { useRouter } from 'next/navigation';
import Edit from 'lucide-react/dist/esm/icons/edit';
import { useToastMutation } from '@/hooks/useToastMutation';

type AuthorProfileFormType = z.infer<typeof authorProfileSchema>;
type UpdateAuthorPayload = Omit<
  Table<'internal_blog_author_profiles'>,
  'created_at' | 'updated_at'
>;

export const EditAuthorProfileDialog = ({
  profile,
  updateAuthorProfile,
  appAdmins,
}: {
  profile: UpdateAuthorPayload;
  appAdmins: Array<Table<'user_profiles'>>;
  updateAuthorProfile: (
    userId: string,
    data: UpdateAuthorPayload,
  ) => Promise<void>;
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, formState } = useForm<AuthorProfileFormType>({
    resolver: zodResolver(authorProfileSchema),
    defaultValues: {
      user_id: profile.user_id,
      display_name: profile.display_name,
      bio: profile.bio,
      avatar_url: profile.avatar_url,
      website_url: profile.website_url ?? undefined,
      twitter_handle: profile.twitter_handle ?? undefined,
      facebook_handle: profile.facebook_handle ?? undefined,
      linkedin_handle: profile.linkedin_handle ?? undefined,
      instagram_handle: profile.instagram_handle ?? undefined,
    },
  });

  const {
    mutate: updateAuthorProfileMutation,
    isLoading: isUpdatingAuthorProfile,
  } = useToastMutation<void, unknown, UpdateAuthorPayload>(
    async (payload) => {
      return updateAuthorProfile(profile.user_id, payload);
    },
    {
      loadingMessage: 'Updating author profile...',
      successMessage: 'Author profile updated!',
      errorMessage: 'Failed to update author profile',
      onSuccess: () => {
        setIsOpen(false);
        router.refresh();
      },
    },
  );

  const { isValid, isLoading } = formState;

  const onSubmit = (data: AuthorProfileFormType) => {
    void updateAuthorProfileMutation({
      ...profile,
      ...data,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(newIsOpen) => setIsOpen(newIsOpen)}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="shadow-none hover:none">
          <Edit className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Author Profile</DialogTitle>
          <DialogDescription>
            Update the details for this author profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="fields space-y-4 max-h-96 px-1 overflow-auto">
            <div className="space-y-2">
              <Label>User ID</Label>
              <Controller
                control={control}
                name="user_id"
                render={({ field }) => (
                  <Select
                    disabled
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      {appAdmins.map((admin) => (
                        <SelectItem key={admin.id} value={admin.id}>
                          {admin.full_name || `User ${admin.id}`}
                        </SelectItem>
                      ))}
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
          <Button
            disabled={!isValid || isUpdatingAuthorProfile}
            type="submit"
            className="w-full"
          >
            {isLoading || isUpdatingAuthorProfile
              ? 'Submitting...'
              : 'Update Profile'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
