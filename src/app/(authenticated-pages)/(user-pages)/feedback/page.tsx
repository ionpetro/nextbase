'use client';

import { Button } from '@/components/ui/Button/ButtonShadcn';
import FeedbackComponent from '@/components/ui/FeedbackComponent/FeedbackComponent';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import { Switch } from '@/components/ui/Switch';
import { Label } from '@/components/ui/Label';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@radix-ui/react-dropdown-menu';
import { AiOutlineFilter } from 'react-icons/ai';
import { Badge } from '@/components/ui/Badge';
import { useState } from 'react';
import userImage from 'public/assets/user-image.png';
import adminImage from 'public/assets/admin-image.png';
import HelpCard from '@/components/ui/Card/HelpCard';
import organisationshelp from 'public/assets/help-assets/organisations-teams.png';
import teamsprojects from 'public/assets/help-assets/teams-projects.png';

export default function Page() {
  const feedbacks = [
    {
      id: 1,
      full_name: 'user_1',
      feedback: 'Great product, highly recommend',
      email_id: 'user_1@gmail.com',
      type: 'Feature request',
      priority: 'High priority',
      created_at: '2021-08-01',
      status: 'Open',
    },
    {
      id: 2,
      full_name: 'user_2',
      feedback: 'Poor user experience, needs improvement',
      email_id: 'user_2@gmail.com',
      type: 'Bug report',
      priority: 'Low priority',
      created_at: '2021-08-02',
      status: 'In progress',
    },
    {
      id: 3,
      full_name: 'user_3',
      feedback: 'Confusing interface, hard to navigate',
      email_id: 'user_3@gmail.com',
      type: 'Usability issue',
      priority: 'Medium priority',
      created_at: '2021-08-03',
      status: 'Closed',
    },
    {
      id: 4,
      full_name: 'user_4',
      feedback: 'Missing important feature, please add',
      email_id: 'user_4@gmail.com',
      type: 'Feature request',
      priority: 'High priority',
      created_at: '2021-08-04',
      status: 'Open',
    },
    {
      id: 5,
      full_name: 'user_5',
      feedback: 'Crashes frequently, unusable',
      email_id: 'user_5@gmail.com',
      type: 'Bug report',
      priority: 'High priority',
      created_at: '2021-08-05',
      status: 'In progress',
    },
    {
      id: 6,
      full_name: 'user_6',
      feedback: 'Great job, keep up the good work',
      email_id: 'user_6@gmail.com',
      type: 'General feedback',
      priority: 'Low priority',
      created_at: '2021-08-06',
      status: 'Closed',
    },
  ];

  const [selectedBadges, setSelectedBadges] = useState<{
    status?: string;
  }>({});

  const [filters, setFilters] = useState({
    status: '',
    type: '',
    priority: '',
    statusText: 'Status',
    typeText: 'Type',
    priorityText: 'Priority',
  });

  // Handle filter change event and update state accordingly (for dropdown menu)
  const handleFilterChange = (
    filterKey: string,
    filterValue: string,
    displayText: string,
    badgeValue?: string
  ) => {
    setFilters({
      ...filters,
      [filterKey]: filterValue,
      [`${filterKey}Text`]: displayText,
    });
    if (badgeValue) {
      setSelectedBadges({
        ...selectedBadges,
        [filterKey]: badgeValue,
      });
    }
  };

  const mapStatusToVariant = (status: string) => {
    switch (status) {
      case 'Closed':
        return 'success';
      case 'Open':
        return 'warning';
      case 'In progress':
        return 'information';
      default:
        return 'default';
    }
  };
  return (
    <>
      <div className="space-x-6">
        <span className="text-base  py-2 font-[600] text-slate-500">/</span>
        <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
          User's Feedback
        </span>
      </div>

      {/* Page Heading */}
      <BasicPageHeading
        heading="User's Feedback"
        subheading="This is feedback page of the user"
      />

      {/* Feedback */}

      <div className="space-y-4">
        <div className="flex justify-between items-center ">
          <div className="flex space-x-2">
            {/* Filter : Status*/}
            <div className="flex justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <AiOutlineFilter className="text-xl mr-2" />
                    {filters.statusText}{' '}
                    {selectedBadges.status && (
                      <Badge
                        className="ml-1"
                        variant={mapStatusToVariant(selectedBadges.status)}
                      >
                        {selectedBadges.status}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {Array.from(
                    new Set(feedbacks.map((feedback) => feedback.status))
                  ).map((uniqueStatus) => (
                    <DropdownMenuItem
                      onClick={() =>
                        handleFilterChange(
                          'status',
                          uniqueStatus,
                          `Status:`,
                          uniqueStatus
                        )
                      }
                    >
                      {uniqueStatus}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* Filter : Priority*/}
            <div className="flex justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <AiOutlineFilter className="text-xl mr-2" />
                    {filters.priorityText}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {Array.from(
                    new Set(feedbacks.map((feedback) => feedback.priority))
                  ).map((uniquePriority) => (
                    <DropdownMenuItem
                      onClick={() =>
                        handleFilterChange(
                          'priority',
                          uniquePriority,
                          `Priority: ${uniquePriority}`
                        )
                      }
                    >
                      {uniquePriority}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex space-x-6">
            <div className="flex items-center space-x-2 ">
              <Switch /> <Label className="text-base ">Make it Public</Label>
            </div>

            <div className="flex items-center space-x-2 ">
              <Switch /> <Label className="text-base ">Add to Roadmap</Label>
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-100 border px-6 p-4 pb-8 b-slate-300 overflow-hidden rounded-xl ">
          {/* Feedback Text Area for Admin */}

          <div className="space-y-2 mb-12">
            <p className="text-base font-[600] text-black ">Your Response</p>
            <textarea
              placeholder="Write your Response here"
              className="rounded-lg w-full h-[224px] p-3 border b-slate-300"
            />{' '}
            <div className="flex space-x-2 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button variant="default"> Submit</Button>
            </div>
          </div>
          {/* Feedback Conversation */}
          <div className="space-y-6">
            <p className="text-base font-[600] text-black ">
              Previous Responses (6)
            </p>
            <FeedbackComponent
              userName="Siddharth Ponnapalli"
              userImage={userImage}
              feedback="Hi there, I am experiencing a bug on your app. Every time I try to upload a photo, the app crashes."
            ></FeedbackComponent>

            <FeedbackComponent
              userName="App Admin"
              userImage={adminImage}
              feedback="Hello, I'm sorry to hear that. Thank you for bringing this to our attention. Can you please tell me what device and operating system you're using?"
            ></FeedbackComponent>

            <FeedbackComponent
              userName="Siddharth Ponnapalli"
              userImage={userImage}
              feedback="I'm using an iPhone X with the latest version of iOS."
            ></FeedbackComponent>

            <FeedbackComponent
              userName="App Admin"
              userImage={adminImage}
              feedback="Thanks for letting me know. We'll investigate the issue and try to fix it as soon as possible. In the meantime, can you try updating the app to the latest version and see if that resolves the issue? "
            ></FeedbackComponent>

            <FeedbackComponent
              userName="Siddharth Ponnapalli"
              userImage={userImage}
              feedback="I just updated the app and the problem is still there."
            ></FeedbackComponent>

            <FeedbackComponent
              userName="App Admin"
              userImage={adminImage}
              feedback="I see. Can you please provide more details on when the app crashes? Does it happen immediately after you try to upload the photo or after some time?"
            ></FeedbackComponent>

            <FeedbackComponent
              userName="Siddharth Ponnapalli"
              userImage={userImage}
              feedback="It happens immediately after I select the photo and hit the upload button."
            ></FeedbackComponent>

            <FeedbackComponent
              userName="App Admin"
              userImage={adminImage}
              feedback="Understood. We'll work on a fix for this and keep you updated on our progress. Thank you for your patience and for bringing this issue to our attention. If you have any further questions or concerns, feel free to reach out to us at any time."
            ></FeedbackComponent>
          </div>
        </div>
      </div>
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
    </>
  );
}
