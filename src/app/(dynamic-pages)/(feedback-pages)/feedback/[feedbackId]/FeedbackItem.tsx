import { SuspensedUserAvatarWithFullname } from '@/components/UserAvatar';
import { Badge } from '@/components/ui/badge';
import type { Table } from '@/types';
import Link from 'next/link';

import { LucideIcon } from '@/components/LucideIcon';
import { formatDistance } from 'date-fns';
import type { FiltersSchema } from './schema';

const typeIcons = {
  bug: <LucideIcon name="Bug" className="h-4 w-4 mr-1 text-red-400" />,
  feature_request: <LucideIcon name="CloudLightning" className="h-4 w-4 mr-1 text-blue-400" />,
  general: <LucideIcon name="MessageSquareDot" className="h-4 w-4 mr-1 text-green-400" />,
};

enum TAGS {
  bug = 'Bug',
  feature_request = 'Feature Request',
  general = 'General',
}

export async function FeedbackItem({
  feedback,
  filters,
  feedbackId,
}: {
  feedback: Table<'internal_feedback_threads'>;
  filters: FiltersSchema;
  feedbackId?: string;
}) {
  const searchParams = new URLSearchParams();

  if (filters.page) searchParams.append('page', filters.page.toString());

  const href = `/feedback/${feedback.id}?${searchParams.toString()}`;

  return (
    <Link href={href}>
      <div
        data-testid="feedback-item"
        data-feedback={feedbackId === feedback.id}
        className="w-full h-fit p-6 rounded-xl shadow-md border hover:bg-muted transition-colors duration-200 ease-in data-[feedback=true]:bg-muted hover:cursor-pointer hover:shadow-lg flex flex-col justify-between group gap-4 min-h-52"
      >
        <div className="flex flex-col gap-4">
          <div className='flex justify-between'>
            <SuspensedUserAvatarWithFullname
              userId={feedback?.user_id}
              size={32}
            />
            <span className="text-muted-foreground text-sm">
              {formatDistance(new Date(feedback?.created_at), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
          <div>
            <h3 className="leading-none font-semibold text-lg">
              {feedback?.title}
            </h3>
            <p className="text-ellipsis line-clamp-2 overflow-hidden text-muted-foreground">
              {feedback?.content}
            </p>
          </div>

        </div>

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="rounded-full group-hover:bg-background ">
            {typeIcons[feedback.type]} {TAGS[feedback?.type]}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
