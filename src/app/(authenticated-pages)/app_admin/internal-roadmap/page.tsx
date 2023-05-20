import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import HelpCard from '@/components/ui/Card/HelpCard';
import organisationshelp from 'public/assets/help-assets/organisations-teams.png';
import teamsprojects from 'public/assets/help-assets/teams-projects.png';
import InternalRoadmapCard from '@/components/ui/Card/InternalRoadmapCard';

export default function Page() {
  const roadmapArray = [
    {
      id: '1',
      title: 'Roadmap 1',
      description: 'This is the description for Roadmap 1.',
      status: 'Planned',
      priority: 'High Priority',
      tag: 'Bug',
      date: '2022-06-15',
    },
    {
      id: '2',
      title: 'Roadmap 2',
      description: 'This is the description for Roadmap 2.',
      status: 'In Review',
      priority: 'Medium Priority',
      tag: 'Usability Issue',
      date: '2023-02-23',
    },
    {
      id: '3',
      title: 'Roadmap 3',
      description: 'This is the description for Roadmap 3.',
      status: 'Completed',
      priority: 'Low Priority',
      tag: 'Usability Issue',
      date: '2021-10-19',
    },
    {
      id: '4',
      title: 'Roadmap 4',
      description: 'This is the description for Roadmap 4.',
      status: 'Planned',
      priority: 'High Priority',
      tag: 'Bug',
      date: '2023-01-22',
    },
    {
      id: '5',
      title: 'Roadmap 5',
      description: 'This is the description for Roadmap 5.',
      status: 'Completed',
      priority: 'Low Priority',
      tag: 'Feature Request',
      date: '2021-09-30',
    },
    {
      id: '6',
      title: 'Roadmap 6',
      description: 'This is the description for Roadmap 6.',
      status: 'In Review',
      priority: 'Medium Priority',
      tag: 'Usability Issue',
      date: '2023-03-16',
    },
    {
      id: '7',
      title: 'Roadmap 7',
      description: 'This is the description for Roadmap 7.',
      status: 'Completed',
      priority: 'Low Priority',
      tag: 'Feature Request',
      date: '2022-12-28',
    },
    {
      id: '8',
      title: 'Roadmap 8',
      description: 'This is the description for Roadmap 8.',
      status: 'Completed',
      priority: 'High Priority',
      tag: 'General Feedback',
      date: '2022-08-08',
    },
    {
      id: '9',
      title: 'Roadmap 9',
      description: 'This is the description for Roadmap 9.',
      status: 'Completed',
      priority: 'Low Priority',
      tag: 'Usability Issue',
      date: '2021-11-12',
    },
    {
      id: '10',
      title: 'Roadmap 10',
      description: 'This is the description for Roadmap 10.',
      status: 'Planned',
      priority: 'Medium Priority',
      tag: 'General Feedback',
      date: '2023-04-29',
    },
    {
      id: '11',
      title: 'Roadmap 11',
      description: 'This is the description for Roadmap 11.',
      status: 'In Review',
      priority: 'High Priority',
      tag: 'Feature Request',
      date: '2022-04-10',
    },
    {
      id: '12',
      title: 'Roadmap 12',
      description: 'This is the description for Roadmap 12.',
      status: 'Planned',
      priority: 'Low Priority',
      tag: 'General Feedback',
      date: '2022-11-06',
    },
    {
      id: '13',
      title: 'Roadmap 13',
      description: 'This is the description for Roadmap 13.',
      status: 'Completed',
      priority: 'Medium Priority',
      tag: 'Bug',
      date: '2023-03-01',
    },
    {
      id: '14',
      title: 'Roadmap 14',
      description: 'This is the description for Roadmap 14.',
      status: 'In Review',
      priority: 'High Priority',
      tag: 'Feature Request',
      date: '2021-12-30',
    },
    {
      id: '15',
      title: 'Roadmap 15',
      description: 'This is the description for Roadmap 15.',
      status: 'Completed',
      priority: 'Low Priority',
      tag: 'General Feedback',
      date: '2022-09-18',
    },
    {
      id: '16',
      title: 'Roadmap 16',
      description: 'This is the description for Roadmap 16.',
      status: 'Planned',
      priority: 'Medium Priority',
      tag: 'Usability Issue',
      date: '2023-01-05',
    },
  ];
  const plannedCards = roadmapArray.filter((item) => item.status === 'Planned');
  const inReviewCards = roadmapArray.filter(
    (item) => item.status === 'In Review'
  );
  const completedCards = roadmapArray.filter(
    (item) => item.status === 'Completed'
  );

  return (
    <div className=" space-y-10 max-w-[1296px]">
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
                <InternalRoadmapCard
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
              {inReviewCards.map((card) => (
                <InternalRoadmapCard
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
                <InternalRoadmapCard
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
        {/* Help Cards */}
        <div className="grid grid-cols-2 space-x-5 w-full">
          <HelpCard
            heading="Teams within Organisations"
            subheading="Without Organisations you can't make Teams"
            image={organisationshelp}
          />

          <HelpCard
            heading="Projects within Teams"
            subheading="Build Projects within Teams and Organisations"
            image={teamsprojects}
          />
        </div>
      </div>
    </div>
  );
}
