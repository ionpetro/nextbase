'use client';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import {
  formatFieldValue,
  STATUS_OPTIONS,
  PRIORITY_OPTIONS,
  TYPE_OPTIONS,
  mapStatusToVariant,
  mapTypeToVariant,
  mapPriorityToVariant,
} from '@/utils/feedback';
import FilterIcon from 'lucide-react/dist/esm/icons/filter';
import { Button } from '@/components/ui/Button/ButtonShadcn';
import { Badge } from '@/components/ui/Badge';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  FeedbackDropdownFiltersSchema,
  FeedbackSortSchema,
  feedbackPrioritiesSchema,
  feedbackStatusesSchema,
  feedbackTypesSchema,
  sortSchema,
} from './schema';
import { T } from '@/components/ui/Typography';

export function FeedbackDropdownFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filters: FeedbackDropdownFiltersSchema = {
    statuses: feedbackStatusesSchema.parse(
      searchParams?.get('statuses')?.split(',') || [],
    ),
    types: feedbackTypesSchema.parse(
      searchParams?.get('types')?.split(',') || [],
    ),
    priorities: feedbackPrioritiesSchema.parse(
      searchParams?.get('priorities')?.split(',') || [],
    ),
  };

  const sort: FeedbackSortSchema = sortSchema.parse(
    searchParams?.get('sort')?.toString() ?? 'desc',
  );

  const setFilters = (newFilters: FeedbackDropdownFiltersSchema) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    for (const [key, value] of Object.entries(newFilters)) {
      if (value.length) {
        params.set(key, value.join(','));
      } else {
        params.delete(key);
      }
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  const setSort = (newSort: FeedbackSortSchema) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (newSort) {
      params.set('sort', newSort);
    } else {
      params.delete('sort');
    }

    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {/* Sort: Recent First or Oldest First */}
      <div className="flex justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="text-xl mr-2" />
              {sort === 'desc' ? 'Recent First' : 'Oldest First'}
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSort('desc')}>
              Recent First
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort('asc')}>
              Oldest First
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* Filter : Status*/}
      <div className="flex justify-start">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <FilterIcon className="text-xl mr-2" />
              Status {filters.statuses?.length ? ':' : ''}
              {filters.statuses?.map((status) => (
                <Badge
                  size="sm"
                  className="ml-1"
                  key={status}
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
                          (status) => status !== statusOption,
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
              <FilterIcon className="text-xl mr-2" />
              Type {filters.types?.length ? ':' : ''}
              <span className="flex space-x-1">
                {filters.types?.map((type) => (
                  <Badge
                    className="ml-1"
                    size="sm"
                    key={type}
                    variant={mapTypeToVariant(type)}
                  >
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
              <FilterIcon className="text-xl mr-2" />
              Priority
              {filters.priorities?.length ? ':' : ''}
              <span className="flex space-x-1">
                {filters.priorities?.map((priority) => (
                  <Badge
                    key={priority}
                    size="sm"
                    variant={mapPriorityToVariant(priority)}
                  >
                    <T.P asChild>
                      <span>{formatFieldValue(priority)}</span>
                    </T.P>
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
                    priorities: filters.priorities?.includes(priorityOption)
                      ? filters.priorities.filter(
                          (priority) => priority !== priorityOption,
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
  );
}
