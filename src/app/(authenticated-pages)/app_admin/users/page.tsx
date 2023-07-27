import { sendLoginLinkAction } from './actions';
import { RenderUsers } from './RenderUsers';
import { getUsersPaginatedAction } from './actions';

export const metadata = {
  title: 'User List | Admin Panel | Nextbase',
}

export default async function AdminPanel() {
  const data = await getUsersPaginatedAction({
    pageNumber: 0,
    search: undefined,
  });
  return (
    <div>
      <RenderUsers
        getUsersPaginatedAction={getUsersPaginatedAction}
        sendLoginLinkAction={sendLoginLinkAction} userData={data} />
    </div>
  );
}
