import { T } from '@/components/ui/Typography';
import Image from 'next/image';
import { getPublicUserAvatarUrl } from '@/utils/helpers';
import { useAdminGetUser } from '@/utils/react-query-hooks-app-admin';

export function AdminViewUserDetails({ userId }: { userId: string }) {
  const { data: userData, isLoading, error } = useAdminGetUser(userId);
  if (isLoading) {
    return <T.P>Loading...</T.P>;
  } else if (error) {
    return <T.P>Error: {String(error)}</T.P>;
  } else if (!userData) {
    return <T.P>User not found</T.P>;
  } else {
    return (
      <span className="flex space-x-2 items-center">
        <Image
          className="rounded-full border border-slate-500"
          alt={
            userData.userProfile.full_name ??
            userData.authUser.user.email ??
            userData.authUser.user.id
          }
          src={getPublicUserAvatarUrl(userData.userProfile.avatar_url)}
          height={24}
          width={24}
        />
        <T.P>{userData.userProfile.full_name}</T.P>
      </span>
    );
  }
}
