'use client';
import { Button } from '@/components/ui/button';
import { CopyCheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'sonner';
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
          <CopyCheckIcon className="size-3" />
        ) : (
          <CopyIcon className="size-3" />
        )}
        Copy title
      </Button>
    </CopyToClipboard>
  );
};
