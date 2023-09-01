'use client';

import { T } from '@/components/ui/Typography';
import { getPublicUserAvatarUrl } from '@/utils/helpers';
import { useGetUserProfileById } from '@/utils/react-queries/user';
import Image from 'next/image';

export function FeedbackComponent({
  userId,
  comment,
}: {
  userId: string;
  comment: string;
}) {
  const { data: userData, isLoading } = useGetUserProfileById(userId);
  if (!userData || isLoading) {
    return null;
  }
  return (
    <div className="flex items-start space-x-4">
      <span className="flex space-x-2 items-center">
        <Image
          className="rounded-full border border-gray-500 h-[24px] w-[24px]"
          alt={userData.full_name ?? 'user'}
          src={getPublicUserAvatarUrl(userData.avatar_url)}
          height={40}
          width={40}
        />
      </span>
      <div className="w-[560px] space-y-2">
        <div>
          <T.Small className="text-muted-foreground">
            {userData.full_name}
          </T.Small>
          <T.P className="text-black dark:text-white">{comment}</T.P>
        </div>
      </div>
    </div>
  );
}
