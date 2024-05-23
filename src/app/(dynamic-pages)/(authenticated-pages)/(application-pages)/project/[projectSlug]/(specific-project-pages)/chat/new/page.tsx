import { ChatContainer } from '@/components/chat-container';
import { getSlimProjectBySlug } from '@/data/user/projects';
import { nanoid } from '@/lib/utils';


export default async function IndexPage({ params }: { params: { projectSlug: string } }) {
  const { projectSlug } = params
  const project = await getSlimProjectBySlug(projectSlug);
  const newChatId = nanoid();

  return <ChatContainer id={newChatId} project={project} />;
}
