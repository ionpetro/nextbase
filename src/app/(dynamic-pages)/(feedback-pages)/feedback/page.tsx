import { getInternalFeedbackTotalPages } from '@/data/admin/internal-feedback';
import { filtersSchema } from './schema';

import { PageHeading } from '@/components/PageHeading';
import { Search } from '@/components/Search';
import { Separator } from '@/components/ui/separator';

import { FeedbackFacetedFilters } from './FeedbackFacetedFilters';


export default async function FeedbackListPage({
    searchParams,
}: {
    searchParams: unknown;
}) {
    const validatedSearchParams = filtersSchema.parse(searchParams);
    const totalPages = await getInternalFeedbackTotalPages(validatedSearchParams);
    const suspenseKey = JSON.stringify(validatedSearchParams);
    return (
        <div className="space-y-4 max-w-[1296px] mx-auto">
            <PageHeading
                title="Feedback"
                subTitle="View all feedback your users have submitted."
            ></PageHeading>
            <div className="flex space-x-4">
                <div className='flex-1 flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <Search placeholder="Search Feedback... " />
                        <FeedbackFacetedFilters />
                    </div>
                    <Separator orientation="horizontal" />
                    <div className='h-40 border mt-4'>
                        Feelback list
                    </div>
                </div>
                <Separator orientation="vertical" />
                <div className='hidden md:flex flex-1 border rounded-lg p-4'>First issue</div>
            </div>
        </div>
    );
}


{/* <Suspense key={suspenseKey} fallback={<FeedbackListFallback />}>
              <FeedbackList filters={validatedSearchParams} />
            </Suspense> 
            <Pagination totalPages={totalPages} />
            */}