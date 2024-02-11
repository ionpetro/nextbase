'use client';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { adminUpdateInternalFeedbackAddedToRoadmap } from '@/data/admin/internal-feedback';
import { useToastMutation } from '@/hooks/useToastMutation';

export function AdminUpdateFeedbackAddedToRoadmap({
  feedbackId,
  currentIsAddedToRoadmap,
}: {
  feedbackId: string;
  currentIsAddedToRoadmap: boolean;
}) {
  const { mutate, isLoading } = useToastMutation(
    async (isAddedToRoadmap: boolean) => {
      await adminUpdateInternalFeedbackAddedToRoadmap({
        isAddedToRoadmap,
        feedbackId,
      });
    },
    {
      loadingMessage: 'Updating added to roadmap...',
      successMessage: 'Added to roadmap updated!',
      errorMessage: 'Failed to update added to roadmap.',
    },
  );

  return (
    <div className="flex items-center space-x-2">
      <Switch
        disabled={isLoading}
        checked={currentIsAddedToRoadmap}
        onCheckedChange={(checked) => mutate(checked)}
      />
      <Label className="text-base">Added to Roadmap</Label>
    </div>
  );
}
