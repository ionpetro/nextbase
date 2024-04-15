import { userRoles } from "@/config/userTypes";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { Suspense } from "react";
import AdminUserFeedbackPage from "./AdminUserFeedbackPage";
import AnonUserFeedbackPage from "./AnonUserFeedbackPage";
import LoggedInUserFeedbackPage from "./LoggedInUserFeedbackPage";
import { filtersSchema } from "./schema";


function FeedbackPageFallback() {
    return <div className="h-[50vh] grid place-content-center">
        Loading...
    </div>
}



async function FeedbackPage({ params, searchParams }: {
    searchParams: unknown,
    params: { feedbackId: string }
}) {
    const validatedSearchParams = filtersSchema.parse(searchParams);
    const userRoleType = await serverGetUserType()
    const suspenseKey = JSON.stringify(validatedSearchParams);

    if (params?.feedbackId?.length > 1) {
        return <h1>404</h1>
    }

    return (
        <Suspense key={JSON.stringify(suspenseKey)} fallback={<FeedbackPageFallback />}>
            {userRoleType == userRoles.ANON && <AnonUserFeedbackPage feedbackId={params?.feedbackId} filters={validatedSearchParams} />}
            {userRoleType == userRoles.USER && <LoggedInUserFeedbackPage feedbackId={params?.feedbackId} filters={validatedSearchParams} />}
            {userRoleType == userRoles.ADMIN && <AdminUserFeedbackPage feedbackId={params?.feedbackId} filters={validatedSearchParams} />}
        </Suspense>
    )
}

export default FeedbackPage;