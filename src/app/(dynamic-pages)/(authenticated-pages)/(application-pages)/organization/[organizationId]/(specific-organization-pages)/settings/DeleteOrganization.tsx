'use client';
import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

type DeleteOrganizationProps = {
  organizationTitle: string;
  organizationId: string;
};

export const DeleteOrganization = ({
  organizationTitle,
  organizationId,
}: DeleteOrganizationProps) => {
  const [open, setOpen] = useState(false);

  type inputs = {
    organizationTitle: string;
  };

  const formSchema = z.object({
    organizationTitle: z
      .string()
      .refine(
        (v) => v === `delete ${organizationTitle}`,
        `Must match "delete ${organizationTitle}"`,
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: inputs) => {
    console.log(data, organizationId);
    toast.success('Organization deleted');
    setOpen(false);
  };

  return (
    <div className="space-y-4">
      <T.H3 className="dark:text-white">Danger Zone</T.H3>
      <Card className="dark:border-red-500/40 p-6 flex justify-between text-sm border-red-300 max-w-3xl items-center">
        <div>
          <p className="font-bold">Delete your organization</p>
          <p className="text-muted-foreground">
            Once you delete an organization, there is no going back. Please be
            certain.
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={'destructive'}>Delete Organization</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Organization</DialogTitle>
              <DialogDescription>
                Type <strong> "delete {organizationTitle}" </strong>to confirm.
              </DialogDescription>
            </DialogHeader>
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input type="text" {...register('organizationTitle')} />
              {errors.organizationTitle && (
                <p className="text-red-400 text-sm font-bold">
                  {errors.organizationTitle.message}
                </p>
              )}

              <Button
                type="submit"
                variant="destructive"
                className="w-fit self-end"
              >
                Delete Organization
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};
