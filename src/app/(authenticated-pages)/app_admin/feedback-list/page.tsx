'use client';

import { Button } from '@/components/ui/Button';
import { AiOutlineFilter } from 'react-icons/ai';
import TableCell from '@/components/ui/Table/TableCell';
import TableHeader from '@/components/ui/Table/TableHeader';
import { useState, useTransition } from 'react';
import { Badge } from '@/components/ui/Badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { Anchor } from '@/components/Anchor';
import { myAction } from './actions';

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

export default function Page() {
  const [selectedBadges, setSelectedBadges] = useState<{
    status?: string;
  }>({});

  const [isPending, startTransition] = useTransition();

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

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      (filters.status === '' || feedback.status === filters.status) &&
      (filters.type === '' || feedback.type === filters.type) &&
      (filters.priority === '' || feedback.priority === filters.priority)
  );

  return (
    <div className="space-y-4">
      {/* Filter and Search */}
      <div className="flex justify-between">
        {/* Fitlers only */}
        <div className="flex gap-2">
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

          {/* Filter : Type*/}
          <div className="flex justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline">
                  <AiOutlineFilter className="text-xl mr-2" />
                  {filters.typeText}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {Array.from(
                  new Set(feedbacks.map((feedback) => feedback.type))
                ).map((uniqueType) => (
                  <DropdownMenuItem
                    onClick={() =>
                      handleFilterChange(
                        'type',
                        uniqueType,
                        `Type: ${uniqueType}`
                      )
                    }
                  >
                    {uniqueType}
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

        {/* Search */}
        <div className="flex space-x-3">
          <div className="max-w-sm flex-1  items-center">
            <div>
              <input
                type="email"
                name="email"
                id="email"
                className="block px-3 py-2 appearance-none w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search Feedback"
              />
            </div>
          </div>

          <Button
            onClick={() => {
              startTransition(() => {
                myAction();
              });
            }}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Feedback list table */}
      <div className="flex rounded-lg bg-clip-border border border-gray-200 max-w-[1296px] overflow-hidden">
        <table className="w-full bg-clip-content border-slate-200">
          <thead className="w-full bg-clip-border">
            <tr className="p-0 ">
              <th className="p-0 ">
                <TableHeader>Name</TableHeader>
              </th>
              <th className="p-0 ">
                <TableHeader>Feedback</TableHeader>
              </th>
              <th className="p-0 ">
                <TableHeader>Email Id</TableHeader>
              </th>
              <th className="p-0 ">
                <TableHeader>Type</TableHeader>
              </th>
              <th className="p-0 ">
                <TableHeader>Priority</TableHeader>
              </th>
              <th className="p-0 ">
                <TableHeader>Created At</TableHeader>
              </th>
              <th className="p-0 ">
                <TableHeader>Status</TableHeader>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.map((feedback) => (
              <tr className="p-0" key={feedback.id}>
                <td className="p-0 ">
                  <TableCell classname="px-6 py-4 truncate">
                    {feedback.full_name}
                  </TableCell>
                </td>
                <td className="p-0 ">
                  <Anchor
                    className=" "
                    key={feedback.id}
                    href={`/organization/${feedback.id}`}
                  >
                    <TableCell classname="text-blue-500 px-6 py-4 truncate font-[500] hover:underline">
                      {feedback.feedback}
                    </TableCell>
                  </Anchor>
                </td>
                <td className="p-0 ">
                  <TableCell classname="px-6 py-4 truncate">
                    {feedback.email_id}
                  </TableCell>
                </td>
                <td className="p-0 ">
                  <TableCell classname="px-6 py-4 truncate">
                    {feedback.type}
                  </TableCell>
                </td>
                <td className="p-0">
                  <TableCell classname="px-6 py-4 truncate">
                    {feedback.priority}
                  </TableCell>
                </td>
                <td className="p-0">
                  <TableCell classname="px-6 py-4 truncate">
                    {feedback.created_at}
                  </TableCell>
                </td>
                <td className="p-0">
                  <TableCell classname="flex items-center h-[58px] justify-center">
                    <Badge
                      className=" whitespace-nowrap "
                      variant={mapStatusToVariant(feedback.status)}
                    >
                      {feedback.status}
                    </Badge>
                  </TableCell>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
