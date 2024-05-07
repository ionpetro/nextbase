"use client";

import { InviteOrganizationMemberDialog } from "@/app/(dynamic-pages)/(authenticated-pages)/(application-pages)/organization/[organizationId]/(specific-organization-pages)/settings/members/InviteOrganizationMemberDialog";
import { createInvitationHandler } from "@/data/user/invitation";
import { useSAToastMutation } from "@/hooks/useSAToastMutation";
import type { Enum } from "@/types";

export function InviteUser({ organizationId }: { organizationId: string }) {
  const { mutate, isLoading } = useSAToastMutation(
    async ({
      email,
      role,
    }: {
      email: string;
      role: Enum<"organization_member_role">;
    }) => {
      return await createInvitationHandler({
        email,
        organizationId,
        role,
      });
    },
    {
      loadingMessage: "Inviting user...",
      errorMessage: "Failed to invite user  ",
      successMessage: "User invited!",
    },
  );

  return (
    <>
      <InviteOrganizationMemberDialog
        onInvite={(email, role) => {
          mutate({
            email,
            role,
          });
        }}
        isLoading={isLoading}
      />
    </>
  );
}
