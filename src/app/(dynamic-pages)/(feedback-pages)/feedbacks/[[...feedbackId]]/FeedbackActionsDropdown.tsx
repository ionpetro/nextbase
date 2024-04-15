'use client';

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UserRole } from "@/types/userTypes";
import { NEW_PRIORITY_OPTIONS, NEW_STATUS_OPTIONS, NEW_TYPE_OPTIONS } from "@/utils/feedback";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUpRight, MessageSquare, MessageSquareOff, Tags, VolumeX } from "lucide-react";
import { toast } from "sonner";

import { userRoles } from "@/config/userTypes";
import { adminToggleFeedbackFromRoadmap, adminToggleFeedbackOpenForComments, adminUpdateFeedbackPriority, adminUpdateFeedbackStatus, adminUpdateFeedbackType } from "@/data/feedback";
import { Table } from "@/types";


function FeedbackActionsDropdown({ feedback, userRole }: { feedback: Table<'internal_feedback_threads'>; userRole: UserRole }) {
    if (userRole == userRoles.ANON) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <DotsVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                {userRole == userRoles.ADMIN && <>
                    <DropdownMenuLabel>Manage Filters</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger><Tags className="h-4 w-4 mr-2" />Apply status</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {NEW_STATUS_OPTIONS?.map((status) => (
                                        <DropdownMenuItem
                                            key={status.label}
                                            onClick={async () => {
                                                await adminUpdateFeedbackStatus({ feedbackId: feedback.id, status: status.value })
                                                toast.success(`Status has been updated to ${status.label}`)
                                            }}
                                        >
                                            <status.icon className="h-4 w-4 mr-2" /> {status.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger><Tags className="h-4 w-4 mr-2" />Apply type</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {NEW_TYPE_OPTIONS?.map((type) => (
                                        <DropdownMenuItem
                                            key={type.label}
                                            onClick={async () => {
                                                await adminUpdateFeedbackType({ feedbackId: feedback.id, type: type.value })
                                                toast.success(`Type has been updated to ${type.label}`)
                                            }}
                                        ><type.icon className="h-4 w-4 mr-2" /> {type.label}</DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger><Tags className="h-4 w-4 mr-2" />Apply priority</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {NEW_PRIORITY_OPTIONS?.map((priority) => (
                                        <DropdownMenuItem
                                            key={priority.label}
                                            onClick={async () => {
                                                await adminUpdateFeedbackPriority({ feedbackId: feedback.id, priority: priority.value })
                                                toast.success(`Type has been updated to ${priority.label}`)
                                            }}
                                        ><priority.icon className="h-4 w-4 mr-2" /> {priority.label}</DropdownMenuItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                </>}
                {(userRole == userRoles.ADMIN || userRole == userRoles.USER) && <>
                    <DropdownMenuLabel>Thread Settings</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem><VolumeX className="h-4 w-4 mr-2" /> Mute this thread</DropdownMenuItem>
                    </DropdownMenuGroup></>
                }
                {userRole == userRoles.ADMIN && <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={async () => {
                            await adminToggleFeedbackFromRoadmap({ feedbackId: feedback.id, isInRoadmap: !feedback?.added_to_roadmap });
                            toast.success(feedback?.added_to_roadmap ? 'Removed from roadmap' : 'Added to roadmap');
                        }}
                    >
                        {feedback?.added_to_roadmap ? <><ArrowDown className="h-4 w-4 mr-2" />Remove from roadmap</> : <><ArrowUpRight className="h-4 w-4 mr-2" />Add to roadmap</>}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={async () => {
                            await adminToggleFeedbackOpenForComments({ feedbackId: feedback.id, isOpenForComments: !feedback?.open_for_public_discussion });
                            toast.success(feedback?.added_to_roadmap ? 'Closed from roadmap' : 'Opened to roadmap');
                        }}
                    >
                        {feedback?.open_for_public_discussion ? <><MessageSquareOff className="h-4 w-4 mr-2" /> Close for comments</> : <><MessageSquare className="h-4 w-4 mr-2" />Open for comments</>}
                    </DropdownMenuItem>
                </>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export default FeedbackActionsDropdown;