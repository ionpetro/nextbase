'use client';

import { Button } from '@/components/ui/Button';

import { generateUnkeyToken } from '@/data/user/unkey';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ViewApiKeyDialog } from './ViewApiKeyDialog';

export function GenerateApiKey() {
  const router = useRouter();
  const { mutate, isLoading } = useToastMutation(generateUnkeyToken, {
    onSuccess: (data) => {
      setStep('copy_modal');
      setKeyPreview(data.key);
    },
  });

  const [step, setStep] = useState<'form' | 'copy_modal' | 'complete'>('form');
  const [keyPreview, setKeyPreview] = useState<string | null>(null);

  return (
    <>
      <form
        className=" max-w-sm"
        onSubmit={(event) => {
          event.preventDefault();
          mutate();
        }}
      >
        <div className="space-y-2">
          <Button
            type="submit"
            size="lg"
            className="block w-full"
            aria-disabled={isLoading}
          >
            {isLoading ? 'Generating new API Key...' : 'Generate API Key'}
          </Button>
        </div>
      </form>

      {step === 'copy_modal' && keyPreview ? (
        <ViewApiKeyDialog
          onCompleted={() => {
            setStep('complete');
            router.refresh();
          }}
          apiKey={keyPreview}
        />
      ) : null}
    </>
  );
}
