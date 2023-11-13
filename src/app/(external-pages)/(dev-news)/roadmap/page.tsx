import RoadmapCard from '@/components/ui/Card/RoadmapCard';
import moment from 'moment';
import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import {
  anonGetCompletedRoadmapFeedbackList,
  anonGetInProgressRoadmapFeedbackList,
  anonGetPlannedRoadmapFeedbackList,
} from '@/data/anon/internalFeedback';
import { Suspense } from 'react';
import { T } from '@/components/ui/Typography';

async function PlannedCards() {
  const plannedCards = await anonGetPlannedRoadmapFeedbackList();
  return (
    <div className=" space-y-3">
      {plannedCards.length ? (
        plannedCards.map((card) => (
          <RoadmapCard
            key={card.id}
            title={card.title}
            description={card.content}
            tag={card.type}
            date={moment(card.created_at).format('LL')}
            priority={card.priority}
          />
        ))
      ) : (
        <T.Subtle className="italic text-xs text-slate-400 dark:text-slate-500">
          Empty
        </T.Subtle>
      )}
    </div>
  );
}

async function InProgressCards() {
  const inProgressCards = await anonGetInProgressRoadmapFeedbackList();
  return (
    <div className=" space-y-3">
      {inProgressCards.length ? (
        inProgressCards.map((card) => (
          <RoadmapCard
            key={card.id}
            title={card.title}
            description={card.content}
            tag={card.type}
            date={moment(card.created_at).format('LL')}
            priority={card.priority}
          />
        ))
      ) : (
        <T.Subtle className="italic text-xs text-slate-400 dark:text-slate-500">
          Empty
        </T.Subtle>
      )}
    </div>
  );
}

async function CompletedCards() {
  const completedCards = await anonGetCompletedRoadmapFeedbackList();
  return (
    <div className=" space-y-3">
      {completedCards.length ? (
        completedCards.map((card) => (
          <RoadmapCard
            key={card.id}
            title={card.title}
            description={card.content}
            tag={card.type}
            date={moment(card.created_at).format('LL')}
            priority={card.priority}
          />
        ))
      ) : (
        <T.Subtle className="italic text-xs text-slate-400 dark:text-slate-500">
          Empty
        </T.Subtle>
      )}
    </div>
  );
}

export default async function Page() {
  return (
    <div className="w-full space-y-10 px-4 md:p-0 mb-20">
      <PageHeading
        title="Roadmap"
        subTitle="This is where you see where the application is going"
      />

      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Planned */}
          <div className="h-screen space-y-6 bg-gray-100 dark:bg-slate-950/40 px-6 py-5 rounded-xl border">
            <div>
              <p className="text-lg dark:text-slate-300 font-[600]">Planned</p>
              <p className="text-base font-[500] text-muted-foreground">
                {' '}
                These are Planned
              </p>
            </div>

            <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
              <PlannedCards />
            </Suspense>
          </div>

          {/* In Review */}
          <div className="h-screen space-y-6 bg-gray-100 dark:bg-slate-950/40 px-6 py-5 rounded-xl border">
            <div>
              <p className="text-lg  dark:text-slate-300  font-[600]">
                In Review
              </p>
              <p className="text-base font-[500] text-muted-foreground">
                {' '}
                These are in review
              </p>
            </div>

            <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
              <InProgressCards />
            </Suspense>
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

            <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
              <CompletedCards />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
