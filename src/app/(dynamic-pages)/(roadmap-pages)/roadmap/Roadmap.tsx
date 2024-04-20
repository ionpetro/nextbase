'use client';
import type { roadmapDataType } from '@/data/admin/internal-roadmap';
import { RoadmapList } from './_components/RoadmapList';

export enum Statuses {
  plannedCards = 'Planned',
  inProgress = 'In Progress',
  completedCards = 'Completed',
}

export function Roadmap({
  roadmapData,
}: {
  roadmapData: {
    plannedCards: roadmapDataType[];
    inProgress: roadmapDataType[];
    completedCards: roadmapDataType[];
  };
}) {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-3 gap-10">
        {Object.keys(roadmapData).map((cardListName) => (
          <div key={cardListName} className="drop-area">
            <h3>{Statuses[cardListName]}</h3>
            <RoadmapList cards={roadmapData[cardListName]} />
          </div>
        ))}
      </div>
    </div>
  );
}
