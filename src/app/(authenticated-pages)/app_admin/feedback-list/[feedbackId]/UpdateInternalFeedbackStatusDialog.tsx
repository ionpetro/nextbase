import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/Dialog';
import { Button } from '@/components/ui/Button';
import { Enum } from '@/types';
import { FeedbackThreadStatusSelect } from './FeedbackThreadStatusSelect';
import { formatFieldValue } from '@/utils/feedback';

type Props = {
    onUpdate: (status: Enum<'internal_feedback_thread_status'>) => void;
    currentStatus: Enum<'internal_feedback_thread_status'>;
    isLoading: boolean;
};

export const UpdateInternalFeedbackStatusDialog = ({
    onUpdate,
    currentStatus,
    isLoading,
}: Props) => {
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState<Enum<'internal_feedback_thread_status'>>(currentStatus);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Status: {formatFieldValue(currentStatus)} </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Update Feedback Status</DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onUpdate(status);
                        setOpen(false);
                    }}
                >
                    <div className="space-y-2">
                        <DialogDescription>
                            Update the status of this feedback thread.
                        </DialogDescription>
                        <FeedbackThreadStatusSelect
                            value={status}
                            onChange={(newStatus) => setStatus(newStatus)}
                        />
                    </div>
                    <DialogFooter>
                        <Button type="submit" variant="success" disabled={isLoading}>
                            {isLoading ? 'Updating Status...' : 'Update'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
