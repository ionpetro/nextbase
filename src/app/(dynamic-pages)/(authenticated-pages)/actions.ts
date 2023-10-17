'use server';

import { CURRENT_ORGANIZATION_ID_COOKIE_KEY } from '@/constants';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function setCurrentOrganizationIdAction(organizationId: string) {
  try {
    cookies().set({
      name: CURRENT_ORGANIZATION_ID_COOKIE_KEY,
      value: organizationId,
    });
    revalidatePath('/');
  } catch (err) {
    console.log(err);
  }
}

export default setCurrentOrganizationIdAction;
