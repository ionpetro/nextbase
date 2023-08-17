import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';

import RoadmapCard from '@/components/ui/Card/RoadmapCard';
import moment from 'moment';
import { supabaseAdminClient } from '@/supabase-clients/admin/supabaseAdminClient';

export default async function Page() {
  const roadmapItemsResponse = await supabaseAdminClient
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
    <div className=" space-y-10">
      <BasicPageHeading
        heading="Roadmap"
        subheading="This is where you see where the application is going"
      />

      <div className="space-y-10">
        <div className="grid grid-cols-3 gap-10">
          {/* Planned */}
          <div className="h-screen space-y-4 bg-gray-100 p-4 px-6 rounded-lg border border-gray-100">
            <div>
              <p className="text-lg font-[600]">Planned</p>
              <p className="text-base font-[500] text-gray-600">
                {' '}
                These are Planned
              </p>
            </div>

            <div className=" space-y-3">
              {plannedCards.map((card) => (
                <RoadmapCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  tag={card.tag}
                  date={card.date}
                  priority={card.priority}
                />
              ))}
            </div>
          </div>

          {/* In Review */}
          <div className="space-y-4 bg-gray-100 p-4 px-6 rounded-lg border border-gray-100">
            <div>
              <p className="text-lg font-[600]">In Review</p>
              <p className="text-base font-[500] text-gray-600">
                {' '}
                These are in review
              </p>
            </div>

            <div className="space-y-3">
              {inProgress.map((card) => (
                <RoadmapCard
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  tag={card.tag}
                  date={card.date}
                  priority={card.priority}
                />
              ))}
            </div>
          </div>

          {/* Completed */}
          <div className="space-y-4 bg-gray-100 p-4 px-6 rounded-lg border border-gray-100">
            <div>
              <p className="text-lg font-[600]">Completed</p>
              <p className="text-base font-[500] text-gray-600">
                {' '}
                These are Completed
              </p>
            </div>

            <div className="space-y-3">
              {completedCards.map((card) => (
                <RoadmapCard
                  key={card.id}
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
