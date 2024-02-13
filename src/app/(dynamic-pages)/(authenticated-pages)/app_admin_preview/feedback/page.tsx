import { PageHeading } from '@/components/PageHeading';
import { Pagination } from '@/components/Pagination';
import { Search } from '@/components/Search';
import { FeedbackDropdownFilters } from '../../app_admin/feedback/FeedbackDropdownFilters';
import { FeedbackListPreview } from '../../app_admin/feedback/FeedbackListPreview';

export default function FeedbackPreview() {
  return (
    <div className="space-y-4 max-w-[1296px]">
      <PageHeading
        title="Feedback"
        subTitle="View all feedback your users have submitted."
      ></PageHeading>
      <div className="flex space-x-3 justify-between">
        <Search placeholder="Search Feedback... " />
        <FeedbackDropdownFilters />
      </div>
      <FeedbackListPreview />
      <Pagination totalPages={30} />
    </div>
  );
}
