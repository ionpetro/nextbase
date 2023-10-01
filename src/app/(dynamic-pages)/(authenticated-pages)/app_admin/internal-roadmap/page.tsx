import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import HelpCard from '@/components/ui/Card/HelpCard';
import organisationshelp from 'public/assets/help-assets/organisations-teams.png';
import teamsprojects from 'public/assets/help-assets/teams-projects.png';
import InternalRoadmapCard from '@/components/ui/Card/InternalRoadmapCard';
import moment from 'moment';
import { createSupabaseAdminServerComponentClient } from '@/supabase-clients/admin/createSupabaseAdminServerComponentClient';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';

export default async function Page() {
  const roadmapItemsResponse = await createSupabaseAdminServerComponentClient()
    .from('internal_feedback_threads')
    .select('*')
    .eq('added_to_roadmap', true);
  if (roadmapItemsResponse.error) {
    throw roadmapItemsResponse.error;
  }
  if (!roadmapItemsResponse.data) {
    throw new Error('No data found');
  }

  const roadmapItems = roadmapItemsResponse.data;

  const roadmapArray = roadmapItems.map((item) => {
    return {
      id: item.id,
      title: item.title,
      description: item.content,
      status: item.status,
      priority: item.priority,
      tag: item.type,
      date: moment(item.created_at).format('LL'),
    };
  });
  const plannedCards = roadmapArray.filter((item) => item.status === 'planned');
  const inProgress = roadmapArray.filter(
    (item) => item.status === 'in_progress'
  );
  const completedCards = roadmapArray.filter(
    (item) => item.status === 'completed'
  );

  return (
    <div className=" space-y-10 max-w-[1296px]">
      <PageHeading
        title="Roadmap"
        titleClassName="text-2xl font-semibold tracking-normal"
        subTitle="This is where you see where the application is going"
      />

      <div className="space-y-10">
        <div className="grid grid-cols-3 gap-10">
          {/* Planned */}
          <div className="h-screen space-y-6 bg-gray-100 dark:bg-slate-950/40 px-6 py-5 rounded-xl border">
            <div>
              <p className="text-lg dark:text-slate-300 font-[600]">Planned</p>
              <p className="text-base font-[500] text-muted-foreground">
                {' '}
                These are Planned
              </p>
            </div>

            <div className=" space-y-4">
              {plannedCards.map((card) => (
                <InternalRoadmapCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  tag={card.tag}
                  date={card.date}
                  feedbackItemId={card.id}
                  priority={card.priority}
                />
              ))}
            </div>
          </div>

          {/* In Review */}
          <div className="h-screen space-y-6 bg-gray-100 dark:bg-slate-950/40 px-6 py-5 rounded-xl border">
            <div>
              <p className="text-lg  dark:text-slate-300  font-[600]">
                In Progress
              </p>
              <p className="text-base font-[500] text-muted-foreground">
                {' '}
                These are in progress
              </p>
            </div>

            <div className="space-y-4">
              {inProgress.map((card) => (
                <InternalRoadmapCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  tag={card.tag}
                  date={card.date}
                  feedbackItemId={card.id}
                  priority={card.priority}
                />
              ))}
            </div>
          </div>

          {/* Completed */}
          <div className="h-screen space-y-6 bg-gray-100 dark:bg-slate-950/40 px-6 py-5 rounded-xl border">
            <div>
              <p className="text-lg  dark:text-slate-300  font-[600]">
                Completed
              </p>
              <p className="text-base font-[500] text-muted-foreground">
                {' '}
                These are Completed
              </p>
            </div>

            <div className="space-y-4">
              {completedCards.map((card) => (
                <InternalRoadmapCard
                  key={card.id}
                  feedbackItemId={card.id}
                  title={card.title}
                  description={card.description}
                  tag={card.tag}
                  date={card.date}
                  priority={card.priority}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
