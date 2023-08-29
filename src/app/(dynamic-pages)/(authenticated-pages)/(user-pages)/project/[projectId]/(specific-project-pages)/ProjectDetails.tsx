'use client';

import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import { T } from '@/components/ui/Typography';
import { useProjectContext } from '@/contexts/ProjectContext';

export function ProjectHeader() {
  const { projectByIdData } = useProjectContext();
  return (
    <PageHeading
      title={projectByIdData.name}
      subTitle="This is your project page. You should create components related to your business use case here."
    />
  );
}
