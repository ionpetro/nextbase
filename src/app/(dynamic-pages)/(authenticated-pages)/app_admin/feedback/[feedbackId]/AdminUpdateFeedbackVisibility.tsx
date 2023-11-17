'use client';
import { useToastMutation } from '@/hooks/useToastMutation';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import { adminUpdateInternalFeedbackVisibility } from '@/data/admin/internal-feedback';

export function AdminUpdateVisibility({
  feedbackId,
  currentVisibility,
}: {
  feedbackId: string;
  currentVisibility: boolean;
}) {
  const { mutate, isLoading } = useToastMutation(
    async (isOpenToDiscussion: boolean) => {
      await adminUpdateInternalFeedbackVisibility({
        isOpenToDiscussion,
        feedbackId,
      });
    },
    {
      loadingMessage: 'Updating visibility...',
      successMessage: 'Visibility updated!',
      errorMessage: 'Failed to update visibility.',
    },
  );

  return (
    <div className="flex items-center space-x-2 ">
      <Switch
        disabled={isLoading}
        checked={currentVisibility}
        onCheckedChange={(checked) => mutate(checked)}
      />{' '}
      <Label className="text-base ">Visible to Public</Label>
    </div>
  );
}
