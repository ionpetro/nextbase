'use server';
import { getUserAvatarUrl, getUserFullName } from '@/data/user/user';
import { getPublicUserAvatarUrl } from '@/utils/helpers';

import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from '../ui/skeleton';

const blurFallback =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAGklEQVR42mNkMGYgCTCOahjVMKphVANtNQAApZ0E4ZNIscsAAAAASUVORK5CYII=';

const fallbackSource = `https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp`;

export const UserAvatar = async ({
  userId,
  size = 24,
}: {
  userId: string;
  size: number;
}) => {
  const avatarUrl = await getUserAvatarUrl(userId);
  let imageSource = fallbackSource;
  if (avatarUrl) {
    imageSource = getPublicUserAvatarUrl(avatarUrl);
  }

  return (
    <Image
      className={`rounded-full`}
      placeholder="blur"
      blurDataURL={blurFallback}
      alt={`${userId} avatar`}
      src={imageSource}
      width={size}
      style={{
        width: size,
        height: size,
      }}
      height={size}
    />
  );
};

export async function FallbackImage({ size }: { size: number }) {
  return (
    <Image
      className={`rounded-full`}
      placeholder="blur"
      blurDataURL={blurFallback}
      alt={`Fallback`}
      src={blurFallback}
      width={size}
      style={{
        width: size,
        height: size,
      }}
      height={size}
    />
  );
}

export async function UserAvatarWithFullname({
  userId,
  size,
}: {
  userId: string;
  size: number;
}) {
  const [userFullName, userAvatarUrl] = await Promise.all([
    getUserFullName(userId),
    getUserAvatarUrl(userId),
  ]);

  return (
    <div className="flex items-center gap-2">
      <div>
        {userAvatarUrl ? (
          <Image
            className="rounded-full border shadow-sm"
            placeholder="blur"
            blurDataURL={blurFallback}
            alt={`${userFullName} avatar`}
            src={userAvatarUrl || ''}
            width={size}
            style={{
              width: size,
              height: size,
            }}
            height={size}
          />
        ) : (
          <div
            className={
              'rounded-full select-none relative border bg-inherit shadow-sm text-sm'
            }
            style={{
              width: size,
              height: size,
            }}
          >
            <span className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2">
              {userFullName?.[0].toUpperCase()}
              {userFullName?.split(' ')?.[1]?.[0].toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <span>{userFullName}</span>
    </div>
  );
}
function UserAvatarWithFullnameFallback({ size }: { size: number }) {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton style={{ width: size, height: size, borderRadius: '100%' }} />
      <Skeleton style={{ width: 80, height: size - 10 }} />
    </div>
  );
}
export async function SuspensedUserAvatarWithFullname({
  userId,
  size,
}: {
  userId: string;
  size: number;
}) {
  return (
    <Suspense fallback={<UserAvatarWithFullnameFallback size={size} />}>
      <UserAvatarWithFullname userId={userId} size={size} />
    </Suspense>
  );
}
