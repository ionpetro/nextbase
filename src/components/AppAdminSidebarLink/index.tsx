import { Button } from '@/components/ui/button';
import { getIsAppAdmin } from '@/data/user/user';
import { cn } from '@/utils/cn';
import { Server } from 'lucide-react';
import Link from 'next/link';

export async function AppAdminSidebarLink() {
  const isUserAppAdmin = await getIsAppAdmin();

  return (

    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start",
        !isUserAppAdmin && "text-muted-foreground"
      )}
      asChild
    >
      <Link href={isUserAppAdmin ? "/app_admin" : "/app_admin_preview"}>
        <Server className="mr-2 h-4 w-4" />
        {isUserAppAdmin ? "Admin Panel" : "Admin Panel Preview"}
      </Link>
    </Button>
  );
}
