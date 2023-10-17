'use client';

import { useRouter } from 'next/navigation';
import { useDidMount } from 'rooks';
import setCurrentOrganizationId from '@/app/(dynamic-pages)/(authenticated-pages)/actions';

export function UpdateCurrentOrganizationCookie({
  paramOrganizationId,
  cookieOrganizationId,
}: {
  paramOrganizationId: string;
  cookieOrganizationId: string | null | undefined;
}) {
  const router = useRouter();
  useDidMount(() => {
    if (cookieOrganizationId === paramOrganizationId) {
      return;
    } else {
      void setCurrentOrganizationId(paramOrganizationId);
      router.refresh();
    }
  });
  return null;
}
