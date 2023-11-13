'use server';
import { UserAvatar } from '@/components/UserAvatar';
import { UserFullName } from '@/components/UserFullName';
import { T } from '@/components/ui/Typography';

export async function FeedbackComponent({
  userId,
  comment,
}: {
  userId: string;
  comment: string;
}) {
  return (
    <div className="flex items-start space-x-4">
      <span className="flex space-x-2 items-center">
        <UserAvatar userId={userId} size={32} />
      </span>
      <div className="w-[560px] space-y-2">
        <div>
          <T.Small className="text-muted-foreground">
            <UserFullName userId={userId} />
          </T.Small>
          <T.P className="text-black dark:text-white">{comment}</T.P>
        </div>
      </div>
    </div>
  );
}
