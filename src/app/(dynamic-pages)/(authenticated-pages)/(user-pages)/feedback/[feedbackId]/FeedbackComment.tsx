'use client';

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
          className="rounded-full border border-slate-500 h-[24px] w-[24px]"
          alt={userData.full_name ?? 'user'}
          src={getPublicUserAvatarUrl(userData.avatar_url)}
          height={24}
          width={24}
        />
      </span>
      <div className="w-[560px] space-y-2">
        <div>
          <p className="text-base font-[600]">{userData.full_name}</p>
          <p className="text-base font-[500] text-slate-600">{comment}</p>
        </div>
      </div>
    </div>
  );
}
