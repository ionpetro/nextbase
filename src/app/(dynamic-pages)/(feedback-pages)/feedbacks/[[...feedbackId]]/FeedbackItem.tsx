// 'use client'
import { SuspensedUserAvatarWithFullname } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Table } from "@/types";
import { LightningBoltIcon } from "@radix-ui/react-icons";

import { formatDistance } from 'date-fns';
import { Bug, MessageSquareDotIcon } from "lucide-react";
// import { useRouter } from 'next/navigation';


const typeIcons = {
    bug: <Bug className="h-4 w-4 mr-1" />,
    feature_request: <LightningBoltIcon className="h-4 w-4 mr-1" />,
    general: <MessageSquareDotIcon className="h-4 w-4 mr-1" />
}



export async function FeedbackItem({ feedback }: { feedback: Table<'internal_feedback_threads'> }) {
    // const router = useRouter();

    return (
        <div
            className="w-full h-fit p-4 rounded-xl shadow-md border hover:border-gray-400 hover:cursor-pointer hover:shadow-lg"
        // onClick={() => router.push(`/feedbacks/${feedback.id}`)}
        >
            <div className="flex gap-2 items-center">
                <Badge variant="secondary" className="rounded-full shadow-inner">{typeIcons[feedback.type]} {feedback?.type}</Badge>
                <h3 className="leading-none font-medium text-lg">{feedback?.title}</h3>
            </div>
            <p className="my-4 text-ellipsis line-clamp-2 overflow-hidden text-muted-foreground">{feedback?.content}</p>
            <div className="flex items-center justify-between">
                <SuspensedUserAvatarWithFullname userId={feedback?.user_id} size={32} />
                <span className="text-muted-foreground text-sm">{formatDistance(new Date(feedback?.created_at), new Date(), { addSuffix: true })}</span>
            </div>
        </div>
    );
}