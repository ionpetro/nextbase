import { userRoles } from "@/config/userTypes";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { Suspense } from "react";
import AdminUserFeedbackdetail from "./AdminUserFeedbackdetail";
import AnonUserFeedbackdetail from "./AnonUserFeedbackdetail";
import LoggedInUserFeedbackdetail from "./LoggedInUserFeedbackDetail";

function FeedbackDetailFallback() {
    return <div className="grid place-content-center">
        loading feedback details...
    </div>
}

async function FeedbackDetailWrapper({ feedbackId }) {
    const userRoleType = await serverGetUserType();

    return (
        <div className="h-full border sticky top-0 rounded-lg">
            <Suspense fallback={<FeedbackDetailFallback />}>
                {userRoleType == userRoles.ANON && <AnonUserFeedbackdetail feedbackId={feedbackId} />}
                {userRoleType == userRoles.ADMIN && <AdminUserFeedbackdetail feedbackId={feedbackId} />}
                {userRoleType == userRoles.USER && <LoggedInUserFeedbackdetail feedbackId={feedbackId} />}
            </Suspense>
        </div>
    )
}

export default FeedbackDetailWrapper;