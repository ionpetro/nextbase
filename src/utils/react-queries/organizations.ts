import { UnwrapPromise } from "@/types";
import { getUserOrganizationRole } from "../supabase/organizations";
import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { useQuery } from "@tanstack/react-query";
import supabaseClient from '@/utils/supabase-browser';

export const userGetUserOrganizationRole = (
  organizationId: string,
  {
    initialData,
  }: {
    initialData?: UnwrapPromise<ReturnType<typeof getUserOrganizationRole>>;
  }
) => {
  const user = useLoggedInUser();
  return useQuery(
    ['userGetUserOrganizationRole', organizationId, user.id],
    async () => {
      const organizationRole = await getUserOrganizationRole(
        supabaseClient,
        user.id,
        organizationId
      );
      return organizationRole;
    },
    {
      initialData,
    }
  );
};
