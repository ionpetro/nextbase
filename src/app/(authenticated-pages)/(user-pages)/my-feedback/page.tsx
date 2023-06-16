import { GiveFeedbackDialog } from "@/components/presentational/tailwind/GiveFeedbackDialog";

export default function MyFeedback() {
    return <div>
        <GiveFeedbackDialog isExpanded={true} />
        <p>My feedback</p>
    </div>
}