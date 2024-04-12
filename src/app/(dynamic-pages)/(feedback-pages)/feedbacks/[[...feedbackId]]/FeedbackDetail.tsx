import { userRoles } from "@/config/userTypes";
import { adminGetInternalFeedbackById } from "@/data/admin/internal-feedback";
import { serverGetUserType } from "@/utils/server/serverGetUserType";
import { Suspense } from "react";

function FeedbackDetailFallback() {
    return <div className="grid place-content-center">
        loading feedback details...
    </div>
}


async function UserFeedbackDetail({ feedbackId }) {
    return <p>{feedbackId}</p>
}

async function AdminUserFeedbackdetail({ feedbackId }) {
    const feedback = await adminGetInternalFeedbackById(feedbackId)

    return <p>{feedback?.title} | {feedback?.id}</p>
}

async function AnonUserFeedbackdetail({ feedbackId }) {
    return <p>{feedbackId}</p>
}


async function FeedbackDetailWrapper({ feedbackId }) {
    const userRoleType = await serverGetUserType();

    return (
        <div className="h-full p-4 border sticky top-0 rounded-lg">
            <Suspense fallback={<FeedbackDetailFallback />}>
                {/* {userRoleType == userRoles.ANON && <AnonUserFeedbackdetail filters={filters} />} */}
                {userRoleType == userRoles.ADMIN && <AdminUserFeedbackdetail feedbackId={feedbackId} />}
                {/* {userRoleType == userRoles.USER && <UserFeedbackDetail filters={filters} />} */}
            </Suspense>
        </div>
    )
}

export default FeedbackDetailWrapper;