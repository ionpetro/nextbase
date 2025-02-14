import { PageHeading } from '@/components/PageHeading';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { OrganizationListPreview } from '../../../app_admin/(admin-pages)/organizations/OrganizationListPreview';

export default function UsersPage() {
  return (
    <div className="space-y-4 max-w-[1296px]">
      <PageHeading
        title="Organizations"
        subTitle="View all organizations created by users in your app."
      ></PageHeading>

      <div className="flex space-x-3  justify-between">
        <Search placeholder="Search Organizations... " />
        <div />
      </div>
      <OrganizationListPreview />
      <Pagination totalPages={20} />
    </div>
  );
}
