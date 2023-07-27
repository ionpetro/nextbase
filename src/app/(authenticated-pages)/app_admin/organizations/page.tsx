import { getOrganizationsPaginatedAction } from './actions';
import { RenderOrganizations } from './RenderOrganizations';


export const metadata = {
  title: 'Organizations List | Admin Panel | Nextbase',
}

export default async function AdminPanel() {
  const data = await getOrganizationsPaginatedAction({
    pageNumber: 0,
    search: undefined
  });
  return (
    <div>
      <RenderOrganizations
        getOrganizationsPaginatedAction={getOrganizationsPaginatedAction}
        organizationsData={data} />
    </div>
  );
}
