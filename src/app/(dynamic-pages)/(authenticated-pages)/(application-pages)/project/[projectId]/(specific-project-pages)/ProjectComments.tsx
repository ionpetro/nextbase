import { getProjectComments } from '@/data/user/projects';
import { CommentList } from './CommentList';

export async function ProjectComments({ projectId }: { projectId: string }) {
  const comments = await getProjectComments(projectId);
  return <CommentList comments={comments} />;
}
