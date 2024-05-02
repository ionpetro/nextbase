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
import LayersIcon from 'lucide-react/dist/esm/icons/layers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
            <LayersIcon className="mr-2 w-5 h-5" />
            Create Project
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <div className="p-3 w-fit bg-gray-200/50 dark:bg-gray-700/40 mb-2 rounded-lg">
              <LayersIcon className=" w-6 h-6" />
            </div>
            <div className="p-1">
              <DialogTitle className="text-lg">Create Project</DialogTitle>
              <DialogDescription className="text-base mt-0">
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
                className="mt-1.5 shadow appearance-none border h-11 rounded-lg w-full py-2 px-3 focus:ring-0 text-gray-700 dark:text-gray-400 leading-tight focus:outline-none focus:shadow-outline text-base"
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
