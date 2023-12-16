'use client';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import CopyIcon from 'lucide-react/dist/esm/icons/copy';
import CopyCheckedIcon from 'lucide-react/dist/esm/icons/copy-check';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

type Props = {
  apiKey: string;
  onCompleted: () => void;
};

export const ViewApiKeyDialog = ({ apiKey, onCompleted }: Props) => {
  const [open, setOpen] = useState(true);
  const [isCopied, setIsCopied] = useState(false);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px] [&>.dialog-close]:hidden ">
        <DialogHeader>
          <DialogTitle>API Key</DialogTitle>
          <DialogDescription>
            This key will never be displayed again. Please store it in a safe
            place.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <CopyToClipboard text={apiKey} onCopy={() => setIsCopied(true)}>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="border rounded p-2 flex-grow cursor-pointer"
              />
              {isCopied ? <CopyCheckedIcon /> : <CopyIcon />}
            </div>
          </CopyToClipboard>
          {isCopied && <span>Copied to clipboard!</span>}
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              setOpen(false);
              onCompleted();
            }}
          >
            I have stored my API key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
