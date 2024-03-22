'use client';
import { CreateOrganizationForm } from '@/components/CreateOrganizationForm';
import {
  TermsOnboardingDialog,
  UserOnboardingDialog,
} from '@/components/UserOnboardingDialog';
import {
  createOrganization,
  setDefaultOrganization,
} from '@/data/user/organizations';
import {
  acceptTermsOfService,
  updateUserProfileNameAndAvatar,
  uploadPublicUserAvatar,
} from '@/data/user/user';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useState } from 'react';
import type { onBoardProps } from './ClientLayout';

export function UserOnboardingFlow({
  onboardingConditions,
  onSuccess,
}: {
  onboardingConditions: onBoardProps;
  onSuccess: () => void;
}) {
  const {
    userProfile,
    organizationId: defaultOrganizationId,
    terms,
  } = onboardingConditions;

  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    userProfile.avatar_url ?? undefined,
  );

  // terms mutation
  const {
    mutate: acceptTerms,
    data: termsData = terms,
    error: termsError,
    isLoading: isAcceptingTerms,
  } = useToastMutation(
    async () => {
      return await acceptTermsOfService(true);
    },
    {
      loadingMessage: 'Accepting terms...',
      successMessage: 'Terms accepted!',
      errorMessage(error) {
        if (error instanceof Error) {
          return `Failed to accept terms: ${error.message}`;
        }

        return 'Failed to accept terms';
      },
    },
  );

  // profile mutation
  const {
    mutate: updateProfile,
    data: profileData = userProfile,
    isLoading: isUpdatingProfile,
  } = useToastMutation(
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
      errorMessage(error, variables) {
        if (error instanceof Error) {
          return `Failed to update profile: ${error.message}`;
        }

        return 'Failed to update profile';
      },
    },
  );

  // avatar mutation
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
      },
    },
  );

  // organization mutation
  const { mutate: createOrg, isLoading } = useToastMutation(
    async (organizationTitle: string) => {
      const orgId = await createOrganization(organizationTitle);
      await setDefaultOrganization(orgId);
      return orgId;
    },
    {
      loadingMessage: 'Creating organization...',
      errorMessage(error) {
        if (error instanceof Error) {
          return `Failed to create organization: ${error.message}`;
        }

        return 'Failed to create organization';
      },
      successMessage: 'Organization created!',
      onSuccess: () => {
        onSuccess();
      },
    },
  );

  return (
    <>
      <TermsOnboardingDialog
        isOpen={termsData.length === 0}
        isLoading={isAcceptingTerms}
        onSubmit={() => {
          acceptTerms();
        }}
      />

      <UserOnboardingDialog
        isOpen={!profileData?.full_name && termsData.length > 0}
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

      <CreateOrganizationForm
        isDialogOpen={
          !defaultOrganizationId &&
          !!profileData?.full_name &&
          termsData.length > 0
        }
        onConfirm={(organizationTitle: string) => {
          createOrg(organizationTitle);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
