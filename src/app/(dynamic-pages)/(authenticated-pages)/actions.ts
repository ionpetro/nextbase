'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

async function setCurrentOrganizationIdAction(organizationId: string) {
  try {
    cookies().set({
      name: 'current_organization_id',
      value: organizationId,
    });
    revalidatePath('/');
  } catch (err) {
    console.log(err);
  }
}

export default setCurrentOrganizationIdAction;
