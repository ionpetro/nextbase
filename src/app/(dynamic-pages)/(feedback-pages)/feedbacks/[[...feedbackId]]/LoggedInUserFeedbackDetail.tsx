import { Separator } from "@/components/ui/separator";
import { adminGetInternalFeedbackById } from "@/data/admin/internal-feedback";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import { SuspensedUserAvatarWithFullname } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { format } from 'date-fns';
import { Calendar, Send, VolumeX } from "lucide-react";
import { CommentTimeLineItem, SuspendedFeedbackComments } from "./CommentTimeLine";

async function LoggedInUserFeedbackdetail({ feedbackId }) {
    const feedback = await adminGetInternalFeedbackById(feedbackId)

    return (
        <div className="h-full py-2 flex flex-col">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <SuspensedUserAvatarWithFullname userId={feedback?.user_id} size={32} />
                        <Separator orientation="vertical" className="h-5" />
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{format(new Date(feedback.created_at), 'do MMMM yyyy')}</span>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <DotsVerticalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>Thread Settings</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem><VolumeX className="h-4 w-4 mr-2" /> Mute this thread</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <h2 className="text-2xl font-medium my-4">{feedback?.title}</h2>
                <div className="flex items-center my-4 space-x-4">
                    <label>
                        Status:
                        <Badge variant="secondary" className="ml-2">
                            {feedback.status}
                        </Badge>
                    </label>
                    <Separator orientation="vertical" className="h-4" />
                    <label>
                        Type:
                        <Badge variant="secondary" className="ml-2">
                            {feedback.type}
                        </Badge>
                    </label>
                    <Separator orientation="vertical" className="h-4" />
                    <label>
                        Priority:
                        <Badge variant="secondary" className="ml-2">
                            {feedback.priority}
                        </Badge>
                    </label>
                </div>
            </div>
            <Separator orientation="horizontal" />
            <div className="flex-1 px-10 py-10 overflow-y-auto overflow-x-visible shadow-inner">
                <CommentTimeLineItem userId={feedback?.user_id} comment={feedback?.content} postedAt={feedback?.created_at} />
                <SuspendedFeedbackComments feedbackId={feedback.id} />
            </div>
            <div className="border-t p-4">
                <div className="grid w-full gap-2">
                    <Textarea placeholder="Type your message here." />
                    <Button><Send className="h-4 w-4 mr-2" /> Send message</Button>
                </div>
            </div>
        </div>
    )
}

export default LoggedInUserFeedbackdetail;