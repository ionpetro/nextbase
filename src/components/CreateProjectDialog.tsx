'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createProjectAction } from '@/data/user/projects';
import { useToastMutation } from '@/hooks/useToastMutation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LucideIcon } from './LucideIcon';

type CreateProjectDialogProps = {
  organizationId: string;
};

export function CreateProjectDialog({
  organizationId,
}: CreateProjectDialogProps) {
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const createProjectMutation = useToastMutation(createProjectAction, {
    loadingMessage: 'Creating project...',
    successMessage: 'Project created!',
    errorMessage: 'Failed to create project',
    onSuccess: (data) => {
      setOpen(false);
      router.push(`/project/${data.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProjectMutation.mutate({
      organizationId,
      name: projectTitle,
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="default" size="default">
            <LucideIcon name="Layers" className="mr-2 w-5 h-5" />
            Create Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="bg-gray-200/50 dark:bg-gray-700/40 mb-2 p-3 rounded-lg w-fit">
              <LucideIcon name="Layers" className="w-6 h-6" />
            </div>
            <div className="p-1">
              <DialogTitle className="text-lg">Create Project</DialogTitle>
              <DialogDescription className="mt-0 text-base">
                Create a new project and get started.
              </DialogDescription>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <Label className="text-muted-foreground">Project Name</Label>
              <Input
                value={projectTitle}
                onChange={(event) => {
                  setProjectTitle(event.target.value);
                }}
                required
                className="shadow focus:shadow-outline mt-1.5 px-3 py-2 border rounded-lg w-full h-11 text-base text-gray-700 leading-tight appearance-none focus:ring-0 dark:text-gray-400 focus:outline-none"
                id="name"
                type="text"
                placeholder="Project Name"
                disabled={createProjectMutation.isLoading}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={createProjectMutation.isLoading}
                className="w-full"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                className="w-full"
                disabled={createProjectMutation.isLoading}
              >
                {createProjectMutation.isLoading
                  ? 'Creating project...'
                  : 'Create Project'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
