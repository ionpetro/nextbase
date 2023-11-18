import InternalRoadmapCard from '@/components/ui/Card/InternalRoadmapCard';
import { Enum } from '@/types';

export function AppAdminRoadmapPreview() {
  const plannedCards = [
    {
      id: '1',
      title: 'Lorem',
      description: 'Lorem ipsum',
      tag: 'general' as Enum<'internal_feedback_thread_type'>,
      date: '2022-01-01',
      priority: 'high' as Enum<'internal_feedback_thread_priority'>,
    },
    // Add more cards as needed
  ];

  const inProgress = [
    {
      id: '2',
      title: 'Ipsum',
      description: 'Lorem ipsum',
      tag: 'feature_request' as Enum<'internal_feedback_thread_type'>,
      date: '2022-01-01',
      priority: 'medium' as Enum<'internal_feedback_thread_priority'>,
    },
    // Add more cards as needed
  ];

  const completedCards = [
    {
      id: '3',
      title: 'Dolor',
      description: 'Lorem ipsum',
      tag: 'bug' as Enum<'internal_feedback_thread_type'>,
      date: '2022-01-01',
      priority: 'low' as Enum<'internal_feedback_thread_priority'>,
    },
    // Add more cards as needed
  ];

  return (
    <div className="space-y-10 [&_a]:pointer-events-none">
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
  );
}
