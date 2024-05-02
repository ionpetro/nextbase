import { LucideIcon } from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

type Props = {
  onSubmit: () => void;
};

export const SubmitProjectForApprovalDialog = ({ onSubmit }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="default">
          <LucideIcon name="Check" className="mr-2 w-5 h-5" />Submit for Approval
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="bg-gray-200/50 dark:bg-gray-700/40 p-3 rounded-lg w-fit">
            <LucideIcon name="Check" className="w-6 h-6" />
          </div>
          <div className="p-1">
            <DialogTitle className="text-lg">
              Submit Project for Approval
            </DialogTitle>
            <DialogDescription className="text-base">
              Are you sure you want to submit this project for approval?
            </DialogDescription>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              onSubmit();
              setOpen(false);
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
