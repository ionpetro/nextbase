'use client';
import { Button } from '@/components/Button';
import { T } from '@/components/ui/Typography';
import { Input } from '@/components/ui/input';
import { updateOrganizationTitle } from '@/data/user/organizations';
import { useSAToastMutation } from '@/hooks/useSAToastMutation';
import { useState, useTransition } from 'react';

export function EditOrganizationForm({
  initialTitle,
  organizationId,
}: {
  initialTitle: string;
  organizationId: string;
}) {
  const [pending, startTransition] = useTransition();

  const { mutate, isLoading } = useSAToastMutation(
    async (organizationTitle: string) => {
      return await updateOrganizationTitle(organizationId, organizationTitle);
    },
    {
      loadingMessage: 'Updating organization title...',
      successMessage: 'Organization title updated!',
      errorMessage(error) {
        try {
          if (error instanceof Error) {
            return String(error.message);
          }
          return `Failed to update organization title ${String(error)}`;
        } catch (_err) {
          console.warn(_err);
          return 'Failed to update organization title';
        }
      },
    },
  );

  const [organizationTitle, setOrganizationTitle] =
    useState<string>(initialTitle);
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <T.H4>Edit Organization Title</T.H4>
        <T.P className="text-muted-foreground">
          This is the title that will be displayed on the organization page.
        </T.P>
      </div>
      <form
        data-testid="edit-organization-title-form"
        onSubmit={(event) => {
          event.preventDefault();
          startTransition(() => {
            mutate(organizationTitle);
          });
        }}
        className="space-y-4 max-w-md"
      >
        <Input
          value={organizationTitle}
          type="text"
          name="organization-title"
          id="organization-title"
          onChange={(e) => {
            setOrganizationTitle(e.target.value);
          }}
        />
        <div className="inline-block">
          <Button
            disabled={isLoading}
            type="submit"
            id="update-organization-title-button"
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </form>
    </div>
  );
}
