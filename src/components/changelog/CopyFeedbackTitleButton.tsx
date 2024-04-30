'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
import { LucideIcon } from '../LucideIcon';
type CopyFeedbackTitleButtonProps = {
  title: string;
};

export const CopyFeedbackTitleButton = ({
  title,
}: CopyFeedbackTitleButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <CopyToClipboard
      text={title}
      onCopy={() => {
        setIsCopied(true);
        toast.success('Title copied to clipboard');
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      }}
    >
      <Button className="text-xs flex gap-2 items-center p-2 h-fit">
        {isCopied ? (
          <LucideIcon name="CopyCheck" className="size-3" />
        ) : (
          <LucideIcon name="Copy" className="size-3" />
        )}
        Copy title
      </Button>
    </CopyToClipboard>
  );
};
