import { AppAdminLinkClient } from './AppAdminLinkClient';
import { isLoggedInUserAppAdmin } from '@/data/admin/security';

export async function AppAdminLink() {
  const isUserAppAdmin = await isLoggedInUserAppAdmin();
  return <>{isUserAppAdmin ? <AppAdminLinkClient /> : <span />}</>;
}
