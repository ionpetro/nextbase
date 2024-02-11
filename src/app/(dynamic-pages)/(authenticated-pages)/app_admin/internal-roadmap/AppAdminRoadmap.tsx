import InternalRoadmapCard from '@/components/InternalRoadmapCard';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getRoadmap } from '@/data/admin/internal-roadmap';

export async function AppAdminRoadmap() {
  const { plannedCards, inProgress, completedCards } = await getRoadmap();
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-10">
        {/* Planned */}
        <Card className="h-max">
          <CardHeader>
            <CardTitle>Planned</CardTitle>
            <CardDescription>These are Planned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
          </CardContent>
        </Card>

        {/* In Progress */}
        <Card className="h-max">
          <CardHeader>
            <CardTitle>In Progress</CardTitle>
            <CardDescription>These are in progress</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Completed */}
        <Card className="h-max">
          <CardHeader>
            <CardTitle>Completed</CardTitle>
            <CardDescription>These are Completed</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
