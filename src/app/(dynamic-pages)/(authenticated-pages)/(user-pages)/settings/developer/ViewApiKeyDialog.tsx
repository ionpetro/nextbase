'use client';
import { LucideIcon } from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
      <DialogContent className="[&>.dialog-close]:hidden sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Key</DialogTitle>
          <DialogDescription>
            This key will never be displayed again. Please store it in a safe
            place.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4 grid">
          <CopyToClipboard text={apiKey} onCopy={() => setIsCopied(true)}>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={apiKey}
                className="flex-grow p-2 border rounded cursor-pointer"
              />
              {isCopied ? <LucideIcon name="CopyCheck" /> : <LucideIcon name="Copy" />}
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
