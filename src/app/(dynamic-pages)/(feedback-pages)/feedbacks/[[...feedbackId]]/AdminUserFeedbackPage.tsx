import { getInternalFeedbackTotalPages, getPaginatedInternalFeedbackList } from "@/data/admin/internal-feedback";
import clsx from 'clsx';
import { FiltersSchema } from "./schema";

import { Pagination } from "@/components/Pagination";
import { Search } from '@/components/Search';
import { Separator } from "@/components/ui/separator";
import FeedbackDetailWrapper from "./FeedbackDetail";
import { FeedbackFacetedFilters } from "./FeedbackFacetedFilters";
import { FeedbackItem } from "./FeedbackItem";



async function AdminUserFeedbackPage({ filters, feedbackId }: { filters: FiltersSchema, feedbackId?: string }) {
    const feedbacks = await getPaginatedInternalFeedbackList(filters);
    const totalFeedbackPages = await getInternalFeedbackTotalPages(filters);

    if (totalFeedbackPages == 0) {
        return (
            <div className='flex h-80 border rounded-lg shadow-md items-center justify-center gap-2 mb-4'>
                <h2>No feedbacks available</h2>
            </div>
        )
    }

    return (
        <div className='h-full flex md:gap-2'>
            <div className={clsx(feedbackId && "hidden", "md:flex flex-col flex-1 h-full")}>
                <div className='flex flex-col gap-2 mb-4'>
                    <Search placeholder="Search Feedback... " />
                    <FeedbackFacetedFilters />
                </div>
                <div className="flex flex-1 overflow-y-auto gap-2 mb-4">
                    {feedbacks?.map((feedback) => (
                        <FeedbackItem key={feedback?.id} feedback={feedback} />
                    ))}
                </div>
                <div className="border-t py-2">
                    <Pagination totalPages={totalFeedbackPages} />
                </div>
            </div>
            <Separator orientation="vertical" className="hidden md:block" />
            <div className={clsx(!feedbackId && "hidden", "md:block flex-1 relative")}>
                <FeedbackDetailWrapper feedbackId={feedbackId ?? feedbacks[0]?.id} />
            </div>
        </div>
    )
}


export default AdminUserFeedbackPage;