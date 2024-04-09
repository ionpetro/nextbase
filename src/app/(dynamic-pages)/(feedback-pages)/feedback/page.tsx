import { filtersSchema } from './schema';

import { PageHeading } from '@/components/PageHeading';
import { Search } from '@/components/Search';
import { Separator } from '@/components/ui/separator';

import { FeedbackFacetedFilters } from './FeedbackFacetedFilters';
import { FeedbackList } from './FeedbackList';


export default async function FeedbackListPage({
    searchParams,
}: {
    searchParams: unknown;
}) {
    const validatedSearchParams = filtersSchema.parse(searchParams);
    return (
        <div className="space-y-4 max-w-[1296px] px-2 mx-auto py-4">
            <PageHeading
                title="Feedback"
                subTitle="View all feedback your users have submitted."
            ></PageHeading>
            <div className="flex w-full h-[50vh] items-stretch space-x-4">
                <div className='flex-1 md:max-w-[50%] flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Search placeholder="Search Feedback... " />
                        <FeedbackFacetedFilters />
                    </div>
                    <div className='mt-4'>
                        <FeedbackList filters={validatedSearchParams} />
                    </div>
                </div>
                <Separator orientation="vertical" className='hidden md:block self-stretch' />
                <div className='hidden md:flex flex-1 border rounded-lg p-4 h-80'>
                    First Feedback {/* render first feedback should only be displayed to larger screens,*/}
                </div>
            </div>
        </div>
    );
}