import { getUserProfile } from '@/data/user/user';
import { serverGetLoggedInUser } from '@/utils/server/serverGetLoggedInUser';
import { AccountSettings } from './AccountSettings';

export default async function AccountSettingsPage() {
  const user = await serverGetLoggedInUser();
  const userProfile = await getUserProfile(user.id);

  console.log('userProfile', userProfile);

  return <AccountSettings userProfile={userProfile} />;
}
