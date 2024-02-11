import { PageHeading } from '@/components/presentational/tailwind/PageHeading';
import RoadmapCard from '@/components/RoadmapCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { T } from '@/components/ui/Typography';
import {
  anonGetCompletedRoadmapFeedbackList,
  anonGetInProgressRoadmapFeedbackList,
  anonGetPlannedRoadmapFeedbackList,
} from '@/data/anon/internalFeedback';
import moment from 'moment';
import { Suspense } from 'react';

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
    <>
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
    </>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Planned */}
          <Card className="h-max">
            <CardHeader>
              <CardTitle>Planned</CardTitle>
              <CardDescription>These are Planned</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
                <PlannedCards />
              </Suspense>
            </CardContent>
          </Card>

          {/* In Review */}
          <Card className="h-max">
            <CardHeader>
              <CardTitle> In Review</CardTitle>
              <CardDescription>These are Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
                <InProgressCards />
              </Suspense>
            </CardContent>
          </Card>

          {/* Completed */}
          <Card className="h-max">
            <CardHeader>
              <CardTitle> Completed</CardTitle>
              <CardDescription>These are Completed</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<T.Subtle>Loading...</T.Subtle>}>
                <CompletedCards />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
