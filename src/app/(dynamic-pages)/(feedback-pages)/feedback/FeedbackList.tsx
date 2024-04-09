import { Pagination } from "@/components/Pagination";
import { userRoles } from "@/config/userTypes";
import { getInternalFeedbackTotalPages, getPaginatedInternalFeedbackList } from "@/data/admin/internal-feedback";
import { getAnonUserFeedbackList, getAnonUserFeedbackTotalPages } from "@/data/anon/internalFeedback";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { Suspense } from "react";
import { FeedbackItem } from "./FeedbackItem";
import { FiltersSchema } from "./schema";

export async function AnonUserFeedbackList({ filters }: { filters: FiltersSchema }) {
    const feedbacks = await getAnonUserFeedbackList(filters);
    const totalFeedbackPages = await getAnonUserFeedbackTotalPages(filters);

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
    return <p>User User</p>
}
export async function AdminUserFeedbackList({ filters }: { filters: FiltersSchema }) {
    const feedbacks = await getPaginatedInternalFeedbackList(filters);
    const totalFeedbackPages = await getInternalFeedbackTotalPages(filters);

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