import { UserAvatar } from '../UserAvatar';
import { UserFullName } from '../UserFullName';
import { T } from '../ui/Typography';

export async function FeedbackItem({
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
