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
import { useSAToastMutation } from '@/hooks/useSAToastMutation';
import { useState } from 'react';
import type { onBoardProps } from './ClientLayout';

export function UserOnboardingFlow({
  onboardingConditions,
  onSuccess,
}: {
  onboardingConditions: onBoardProps;
  onSuccess: () => void;
}) {
  const { userProfile, defaultOrganizationId, terms } = onboardingConditions;
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    userProfile.avatar_url ?? undefined,
  );

  // terms mutation
  const {
    mutate: acceptTerms,
    data: termsData = { status: "success", data: { accepted_terms: terms?.accepted_terms } },
    error: termsError,
    isLoading: isAcceptingTerms,
  } = useSAToastMutation(
    async () => {
      return await acceptTermsOfService(true);
    },
    {
      loadingMessage: 'Accepting terms...',
      successMessage: 'Terms accepted!',
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to accept terms ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to accept terms';
        }
      },
    },
  );

  // profile mutation
  const {
    mutate: updateProfile,
    data: profileData = { status: "success", data: userProfile },
    isLoading: isUpdatingProfile,
  } = useSAToastMutation(
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
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to update profile ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to update profile';
        }
      },
    },
  );

  // avatar mutation
  const { mutate: uploadFile, isLoading: isUploading } = useSAToastMutation(
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
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to upload avatar ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to upload avatar';
        }
      },
      onSuccess: (response) => {
        if (response.status === "success") {
          setAvatarUrl(response.data);
        }
      },
    },
  );

  // organization mutation
  const { mutate: createOrg, isLoading } = useSAToastMutation(
    async (organizationTitle: string) => {
      return await createOrganization(organizationTitle);
    },
    {
      loadingMessage: 'Creating organization...',
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to create organization ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to create organization';
        }
      },
      successMessage: 'Organization created!',
      onSuccess: (response) => {
        response.status === "success" && response.data ? setDefaultOrganization(response.data) : null;
        onSuccess();
      },
    },
  );

  const isTermsAccepted = termsData?.status === "success" && termsData?.data?.accepted_terms;
  const isProfileSet = profileData?.status === "success" && profileData?.data?.full_name;

  return (
    <>
      <TermsOnboardingDialog
        isOpen={!isTermsAccepted}
        isLoading={isAcceptingTerms}
        onSubmit={() => {
          acceptTerms();
        }}
      />

      <UserOnboardingDialog
        isOpen={!isProfileSet && !!isTermsAccepted}
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
          !!isProfileSet &&
          !!isTermsAccepted
        }
        onConfirm={(organizationTitle: string) => {
          createOrg(organizationTitle);
        }}
        isLoading={isLoading}
      />
    </>
  );
}
