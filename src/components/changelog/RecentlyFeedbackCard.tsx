import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { getUserProfile } from '@/data/user/user';
import type { Tables } from '@/lib/database.types';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { CopyFeedbackTitleButton } from './CopyFeedbackTitleButton';

type Props = {
  feedback: Tables<'internal_feedback_threads'>;
};

export const RecentlyFeedbackCard = async ({ feedback }: Props) => {
  const user = await getUserProfile(feedback.user_id);

  return (
    <Card className="p-4 w-full">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            alt="Olivia Green"
            src={user.avatar_url ?? '/placeholder.svg?height=40&width=40'}
          />
          <AvatarFallback>{user.full_name?.charAt(0) ?? ''}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user.full_name}</p>
          <p className="text-sm text-gray-500 truncate">
            {formatDistanceToNow(new Date(feedback.created_at), {
              addSuffix: true,
            })}
          </p>
        </div>
        <CopyFeedbackTitleButton title={feedback.title} />
      </div>
      <div className="mt-3">
        <h4 className="text-lg font-medium leading-6">{feedback.title}</h4>
        <p className="text-sm text-muted-foreground mt-1 ">
          {feedback.content.slice(0, 120)}
          {feedback.content.length > 120 && (
            <Link
              href={`/feedback/${feedback.id}`}
              className="text-foreground ml-1"
            >
              View More
            </Link>
          )}
        </p>
      </div>
      <div className="mt-3 flex space-x-2">
        <Badge variant="secondary">{feedback.type}</Badge>
        <Badge className="capitalize">{feedback.status}</Badge>
      </div>
    </Card>
  );
};
