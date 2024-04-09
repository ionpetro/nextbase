import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserAvatarUrl, getUserFullName } from "@/data/user/user";
import { Table } from "@/types";
import { LightningBoltIcon } from "@radix-ui/react-icons";

import { formatDistance } from 'date-fns';
import { Bug, MessageSquareDotIcon } from "lucide-react";


const x = {
    bug: <Bug className="h-4 w-4 mr-1" />,
    feature_request: <LightningBoltIcon className="h-4 w-4 mr-1" />,
    general: <MessageSquareDotIcon className="h-4 w-4 mr-1" />
}


export async function FeedbackItem({ feedback }: { feedback: Table<'internal_feedback_threads'> }) {
    const avatar = await getUserAvatarUrl(feedback?.user_id)
    const userFullName = await getUserFullName(feedback?.user_id)

    return (
        <div className="w-full p-4 rounded-lg shadow-md border">
            <div className="flex gap-2 items-center">
                <Badge variant="secondary" className="rounded-full shadow-inner">{x[feedback.type]} {feedback?.type}</Badge>
                <h3 className="leading-none font-medium text-lg">{feedback?.title}</h3>
            </div>
            <p className="my-4 text-ellipsis line-clamp-2 overflow-hidden text-muted-foreground">{feedback?.content}</p>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 shadow-sm border">
                        <AvatarImage src={avatar || ''} />
                        <AvatarFallback className="text-sm">{`${(userFullName?.[0])?.toUpperCase()}${(userFullName?.split(" ")?.[1]?.[0])?.toUpperCase()}`}</AvatarFallback>
                    </Avatar>
                    <span>{userFullName}</span>
                </div>
                <span className="text-muted-foreground text-sm">{formatDistance(new Date(feedback?.created_at), new Date(), { addSuffix: true })}</span>
            </div>
        </div>
    );
}