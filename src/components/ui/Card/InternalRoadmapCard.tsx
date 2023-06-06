import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';

import { Badge, BadgeProps } from '../Badge';
import { Button } from '../Button/ButtonShadcn';

type InternalRoadmapCardProps = {
  title: string;
  description: string;
  tag: string;
  date: string;
  priority: string;
};

const getPriorityVariant = (priority: string): BadgeProps['variant'] => {
  switch (priority) {
    case 'High Priority':
      return 'solidDanger';
    case 'Medium Priority':
      return 'solidDiscussion';
    case 'Low Priority':
      return 'solidInformation';
    default:
      return 'default';
  }
};

const getTagVariant = (tag: string): BadgeProps['variant'] => {
  switch (tag) {
    case 'Bug':
      return 'danger';
    case 'Usability Issue':
      return 'warning';
    case 'General Feedback':
      return 'information';
    case 'Feature Request':
      return 'discussion';
    default:
      return 'default';
  }
};

export default function InternalRoadmapCard({
  title,
  description,
  tag,
  date,
  priority,
}: InternalRoadmapCardProps) {
  return (
    <div className="grid grid-cols-[1fr,auto] gap-1 items-start rounded-lg bg-white p-4 ">
      <div className="">
        <div className="">
          <p className="text-base font-[700]">{title}</p>

          <p className="text-base font-[500] text-slate-600">{description}</p>
        </div>

        <div className="mt-3 -mb-0.5">
          <div className="flex space-x-2 mb-3">
            <Badge variant={getTagVariant(tag)}>{tag}</Badge>
            <Badge variant={getPriorityVariant(priority)}>{priority}</Badge>
          </div>

          <p className="text-sm font-[600]">{date}</p>
        </div>
      </div>
      <Button variant="secondaryLink" size="link" className="text-blue-600">
        Edit
      </Button>
    </div>
  );
}
