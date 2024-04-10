import { Pagination } from "@/components/Pagination";
import { userRoles } from "@/config/userTypes";
import { getInternalFeedbackTotalPages, getPaginatedInternalFeedbackList } from "@/data/admin/internal-feedback";
import { getAnonUserFeedbackList, getAnonUserFeedbackTotalPages } from "@/data/anon/internalFeedback";
import { getLoggedInUserFeedbackList, getLoggedInUserFeedbackTotalPages } from "@/data/user/internalFeedback";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { Suspense } from "react";
import { FeedbackItem } from "./FeedbackItem";
import { FiltersSchema } from "./schema";

export async function AnonUserFeedbackList({ filters }: { filters: FiltersSchema }) {
    const feedbacks = await getAnonUserFeedbackList(filters);
    const totalFeedbackPages = await getAnonUserFeedbackTotalPages(filters);

    if (feedbacks.length == 0) {
        return (
            <div className="h-80 grid place-content-center border rounded-lg shadow-md mb-4 text-center">
                <h2 className="font-medium text-lg">We are perfect!</h2>
                <span className="text-sm text-muted-foreground">No feedbacks available</span>
            </div>
        )
    }

    return (
        <>
            <div className="flex gap-2 mb-4">
                {feedbacks?.map((feedback) => (
                    <FeedbackItem key={feedback?.id} feedback={feedback} />
                ))}
            </div>
            <Pagination totalPages={totalFeedbackPages} />
        </>
    )
}

export async function UserFeedbackList({ filters }: { filters: FiltersSchema }) {
    const feedbacks = await getLoggedInUserFeedbackList(filters);
    const totalFeedbackPages = await getLoggedInUserFeedbackTotalPages(filters);


    if (feedbacks.length == 0) {
        return (
            <div className="h-80 grid place-content-center border rounded-lg shadow-md mb-4 text-center">
                <h2 className="font-medium text-lg">We are perfect!</h2>
                <span className="text-sm text-muted-foreground">You don't have any pending feedbacks</span>
            </div>
        )
    }

    return (
        <>
            <div className="flex gap-2 mb-4">
                {feedbacks?.map((feedback) => (
                    <FeedbackItem key={feedback?.id} feedback={feedback} />
                ))}
            </div>
            <Pagination totalPages={totalFeedbackPages} />
        </>
    )
}
export async function AdminUserFeedbackList({ filters }: { filters: FiltersSchema }) {
    const feedbacks = await getPaginatedInternalFeedbackList(filters);
    const totalFeedbackPages = await getInternalFeedbackTotalPages(filters);

    if (feedbacks.length == 0) {
        return (
            <div className="flex h-80 border rounded-lg shadow-md items-center justify-center gap-2 mb-4">
                <h2>No feedbacks available</h2>
            </div>
        )
    }

    return (
        <>
            <div className="flex gap-2 mb-4">
                {feedbacks?.map((feedback) => (
                    <FeedbackItem key={feedback?.id} feedback={feedback} />
                ))}
            </div>
            <Pagination totalPages={totalFeedbackPages} />
        </>
    )
}


export async function FeedbackList({ filters }: { filters: FiltersSchema }) {
    const userRoleType = await serverGetUserType()
    const suspenseKey = JSON.stringify(filters);
    return (
        <Suspense key={JSON.stringify(suspenseKey)} fallback={<FeedbackListFallback />}>
            {userRoleType == userRoles.ANON && <AnonUserFeedbackList filters={filters} />}
            {userRoleType == userRoles.ADMIN && <AdminUserFeedbackList filters={filters} />}
            {userRoleType == userRoles.USER && <UserFeedbackList filters={filters} />}
        </Suspense>
    )
}

export function FeedbackListFallback() {
    return null
}