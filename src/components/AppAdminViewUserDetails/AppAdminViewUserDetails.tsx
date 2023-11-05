'use server';

import { appAdminGetUserProfile } from '@/data/admin/user';
import { getPublicUserAvatarUrl } from '@/utils/helpers';
import Image from 'next/image';
import { T } from '@/components/ui/Typography';

export async function AppAdminViewUserDetails({ userId }: { userId: string }) {
  const userProfile = await appAdminGetUserProfile(userId);

  return (
    <span className="flex space-x-2 items-center">
      <Image
        className="rounded-full border border-slate-500 h-6 w-6"
        alt={userProfile.full_name ?? userProfile.id}
        src={getPublicUserAvatarUrl(userProfile.avatar_url)}
        height={24}
        width={24}
      />
      <T.P>{userProfile.full_name ?? 'User'}</T.P>
    </span>
  );
}
