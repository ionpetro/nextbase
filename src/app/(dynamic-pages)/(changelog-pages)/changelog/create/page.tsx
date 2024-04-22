import { serverGetUserType } from '@/utils/server/serverGetUserType';
import { userRoles } from '@/utils/userTypes';
import { redirect } from 'next/navigation';
import { CreateChangelogForm } from '../_components/CreateChangelogForm';
export default async function Page() {
  const userRoleType = await serverGetUserType();

  if (userRoleType !== userRoles.ADMIN) {
    redirect('/changelog');
  }

  return (
    <div>
      <CreateChangelogForm />
    </div>
  );
}
