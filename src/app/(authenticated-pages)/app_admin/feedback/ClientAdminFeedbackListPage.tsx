'use client';

import { Button } from '@/components/ui/Button';
import { AiOutlineFilter } from 'react-icons/ai';
import TableCell from '@/components/ui/Table/TableCell';
import TableHeader from '@/components/ui/Table/TableHeader';
import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import { Anchor } from '@/components/Anchor';
import { Enum } from '@/types';
import moment from 'moment';
import { AdminViewUserDetails } from '../_components/AdminViewUserDetails';
import { useDebouncedValue } from 'rooks';
import {
  formatFieldValue,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  TYPE_OPTIONS,
  mapStatusToVariant,
  mapTypeToVariant,
  mapPriorityToVariant,
} from '@/utils/feedback';
import { useGetAllInternalFeedback } from '@/utils/react-query-hooks-app-admin';

export function ClientAdminFeedbackListPage() {
  const [searchText, setSearchText] = useState<string>('');

  const [debouncedSearchText] = useDebouncedValue(searchText, 500);

  const [filters, setFilters] = useState<{
    types: Array<Enum<'internal_feedback_thread_type'>>;
    priorities: Array<Enum<'internal_feedback_thread_priority'>>;
    statuses: Array<Enum<'internal_feedback_thread_status'>>;
  }>({
    types: [],
    priorities: [],
    statuses: [],
  });

  const { data: feedbackList, isLoading } = useGetAllInternalFeedback({
    query: debouncedSearchText,
    filters,
  });
  return (
    <div className="space-y-4">
      {/* Filter and Search */}
      <div className="flex space-x-3">
        <div className="flex space-x-3">
          <div className="max-w-sm flex-1  items-center">
            <div>
              <input
                type="text"
                name="text"
                id="text"
                className="block px-3 py-2 appearance-none w-full rounded-md border-gray-300 border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Fitlers only */}
        <div className="flex gap-2">
          {/* Filter : Status*/}
          <div className="flex justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <AiOutlineFilter className="text-xl mr-2" />
                  Status {filters.statuses.length ? ':' : ''}
                  {filters.statuses.map((status) => (
                    <Badge
                      className="ml-1"
                      variant={mapStatusToVariant(status)}
                    >
                      {formatFieldValue(status)}
                    </Badge>
                  ))}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {STATUS_OPTIONS.map((statusOption) => (
                  <DropdownMenuItem
                    key={statusOption}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        statuses: filters.statuses?.includes(statusOption)
                          ? filters.statuses.filter(
                            (status) => status !== statusOption
                          )
                          : [...(filters.statuses || []), statusOption],
                      })
                    }
                  >
                    {formatFieldValue(statusOption)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filter : Type*/}
          <div className="flex justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <AiOutlineFilter className="text-xl mr-2" />
                  Type {filters.types.length ? ':' : ''}
                  <span className="flex space-x-1">
                    {filters.types.map((type) => (
                      <Badge className="ml-1" variant={mapTypeToVariant(type)}>
                        {formatFieldValue(type)}
                      </Badge>
                    ))}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {TYPE_OPTIONS.map((typeOption) => (
                  <DropdownMenuItem
                    key={typeOption}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        types: filters.types?.includes(typeOption)
                          ? filters.types.filter((type) => type !== typeOption)
                          : [...(filters.types || []), typeOption],
                      })
                    }
                  >
                    {formatFieldValue(typeOption)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Filter : Priority*/}
          <div className="flex justify-start">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <AiOutlineFilter className="text-xl mr-2" />
                  Priority
                  {filters.priorities.length ? ':' : ''}
                  <span className="flex space-x-1">
                    {filters.priorities.map((priority) => (
                      <Badge
                        className="ml-1"
                        variant={mapPriorityToVariant(priority)}
                      >
                        {formatFieldValue(priority)}
                      </Badge>
                    ))}
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                {PRIORITY_OPTIONS.map((priorityOption) => (
                  <DropdownMenuItem
                    key={priorityOption}
                    onClick={() =>
                      setFilters({
                        ...filters,
                        priorities: filters.priorities.includes(priorityOption)
                          ? filters.priorities.filter(
                            (priority) => priority !== priorityOption
                          )
                          : [...(filters.priorities || []), priorityOption],
                      })
                    }
                  >
                    {formatFieldValue(priorityOption)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search */}
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
            {feedbackList
              ? feedbackList.map((feedback) => (
                <tr className="p-0" key={feedback.id}>
                  <td className="p-0 ">
                    <TableCell classname="px-6 py-4 truncate">
                      <AdminViewUserDetails userId={feedback.user_id} />
                    </TableCell>
                  </td>
                  <td className="p-0 ">
                    <Anchor
                      className=" "
                      key={feedback.id}
                      href={`/app_admin/feedback/${feedback.id}`}
                    >
                      <TableCell classname="text-blue-500 px-6 py-4 truncate font-[500] hover:underline">
                        {feedback.title}
                      </TableCell>
                    </Anchor>
                  </td>

                  <td className="p-0 ">
                    <TableCell classname="px-6 py-4 truncate">
                      {formatFieldValue(feedback.type)}
                    </TableCell>
                  </td>
                  <td className="p-0">
                    <TableCell classname="px-6 py-4 truncate">
                      {formatFieldValue(feedback.priority)}
                    </TableCell>
                  </td>
                  <td className="p-0">
                    <TableCell classname="px-6 py-4 truncate">
                      {moment(feedback.created_at).format('LL')}
                    </TableCell>
                  </td>
                  <td className="p-0">
                    <TableCell classname="flex items-center h-[58px] justify-center">
                      <Badge
                        className=" whitespace-nowrap "
                        variant={mapStatusToVariant(feedback.status)}
                      >
                        {formatFieldValue(feedback.status)}
                      </Badge>
                    </TableCell>
                  </td>
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
