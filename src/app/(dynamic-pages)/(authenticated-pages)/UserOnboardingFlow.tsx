'use client';
import { UserOnboardingDialog } from '@/components/UserOnboardingDialog';
import {
  updateUserProfileNameAndAvatar,
  uploadPublicUserAvatar,
} from '@/data/user/user';
import { useToastMutation } from '@/hooks/useToastMutation';
import { Table } from '@/types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function UserOnboardingFlow({
  userProfile,
  onSuccess,
}: {
  userProfile: Table<'user_profiles'>;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    userProfile.avatar_url ?? undefined,
  );
  const { mutate: updateProfile, isLoading: isUpdatingProfile } =
    useToastMutation(
      async ({
        fullName,
        avatarUrl,
      }: {
        fullName: string;
        avatarUrl?: string;
      }) => {
        return await updateUserProfileNameAndAvatar({ fullName, avatarUrl });
      },
      {
        loadingMessage: 'Updating profile...',
        successMessage: 'Profile updated!',
        errorMessage: 'Error updating profile',
        onSuccess: () => {
          onSuccess();
          router.refresh();
        },
      },
    );

  const { mutate: uploadFile, isLoading: isUploading } = useToastMutation(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);

      return uploadPublicUserAvatar(formData, file.name, {
        upsert: true,
      });
    },
    {
      loadingMessage: 'Uploading avatar...',
      successMessage: 'Avatar uploaded!',
      errorMessage: 'Error uploading avatar',
      onSuccess: (newAvatarURL) => {
        setAvatarUrl(newAvatarURL);
        router.refresh();
      },
    },
  );

  return (
    <UserOnboardingDialog
      isOpen
      onSubmit={(fullName: string) => {
        updateProfile({
          fullName,
          avatarUrl,
        });
      }}
      onFileUpload={(file: File) => {
        uploadFile(file);
      }}
      profileAvatarUrl={avatarUrl}
      isUploading={isUploading}
      isLoading={isUpdatingProfile ?? isUploading}
    />
  );
}
