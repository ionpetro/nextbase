import { ReactNode } from 'react';
import { z } from 'zod';
import { cookies } from 'next/headers';
import { UpdateCurrentOrganizationCookie } from './UpdateCurrentOrganizationCookie';
import { CURRENT_ORGANIZATION_ID_COOKIE_KEY } from '@/constants';

const paramsSchema = z.object({
  organizationId: z.string(),
});

export default function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: unknown;
}) {
  const cookieOrganizationId = cookies().get(CURRENT_ORGANIZATION_ID_COOKIE_KEY)
    ?.value;
  const { organizationId } = paramsSchema.parse(params);
  return (
    <>
      <UpdateCurrentOrganizationCookie
        paramOrganizationId={organizationId}
        cookieOrganizationId={cookieOrganizationId}
      />
      {children}
    </>
  );
}
