import { getUsersPaginated } from '@/utils/supabase-admin';
import { sendLoginLinkAction } from './actions';
import { RenderUsers } from './RenderUsers';

export const metadata = {
  title: 'User List | Admin Panel | Nextbase',
}

export default async function AdminPanel() {
  const data = await getUsersPaginated(0, undefined);
  return (
    <div>
      <RenderUsers sendLoginLinkAction={sendLoginLinkAction} userData={data} />
    </div>
  );
}
