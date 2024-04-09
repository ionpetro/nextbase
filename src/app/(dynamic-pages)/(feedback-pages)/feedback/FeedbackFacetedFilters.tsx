'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { CheckIcon, Cross2Icon, PlusCircledIcon } from "@radix-ui/react-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import {
    PRIORITY_OPTIONS,
    STATUS_OPTIONS,
    TYPE_OPTIONS,
    formatFieldValue,
    mapPriorityToVariant,
    mapStatusToVariant,
    mapTypeToVariant,
} from '@/utils/feedback';
import {
    FeedbackDropdownFiltersSchema,
    FeedbackSortSchema,
    feedbackPrioritiesSchema,
    feedbackStatusesSchema,
    feedbackTypesSchema,
    sortSchema,
} from './schema';

let p = PRIORITY_OPTIONS;
let s = STATUS_OPTIONS;
let t = TYPE_OPTIONS;
let f = formatFieldValue;
let m = mapPriorityToVariant;
let mm = mapStatusToVariant;
let mmm = mapTypeToVariant;

function FacetedFilter({ title, options, selectedValues }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    {title}
                    {selectedValues?.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValues.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValues.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValues.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedValues.has(option.value))
                                        .map((option) => (
                                            <Badge
                                                variant="secondary"
                                                key={option.value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedValues.has(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => {
                                            if (isSelected) {
                                                selectedValues.delete(option.value)
                                            } else {
                                                selectedValues.add(option.value)
                                            }
                                            const filterValues = Array.from(selectedValues)
                                            // to do action
                                        }}
                                    >
                                        <div
                                            className={cn(
                                                "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                isSelected
                                                    ? "bg-primary text-primary-foreground"
                                                    : "opacity-50 [&_svg]:invisible"
                                            )}
                                        >
                                            <CheckIcon className={cn("h-4 w-4")} />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span>{option.label}</span>
                                        {/* {facets?.get(option.value) && (
                                            <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                {facets.get(option.value)}
                                            </span>
                                        )} */}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                        {selectedValues.size > 0 && (
                            <>
                                <CommandSeparator />
                                <CommandGroup>
                                    <CommandItem
                                        onSelect={() => { }}
                                        className="justify-center text-center"
                                    >
                                        Clear filters
                                    </CommandItem>
                                </CommandGroup>
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}


export function FeedbackFacetedFilters() {
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

    return <div className='flex gap-2'>
        <Select>
            <SelectTrigger className="w-fit h-8">
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="desc">Recent First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
            </SelectContent>
        </Select>
        <FacetedFilter
            title="Status"
            options={STATUS_OPTIONS?.map((opt) => ({ label: opt, value: opt }))}
            selectedValues={new Set()}
        />
        <FacetedFilter
            title="Type"
            options={TYPE_OPTIONS?.map((opt) => ({ label: opt, value: opt }))}
            selectedValues={new Set()}
        />
        <FacetedFilter
            title="Priority"
            options={PRIORITY_OPTIONS?.map((opt) => ({ label: opt, value: opt }))}
            selectedValues={new Set()}
        />
        {(Boolean(filters.statuses?.length) ||
            Boolean(filters.types?.length) ||
            Boolean(filters.priorities?.length)) &&
            <Button
                variant="ghost"
                onClick={() => { }}
                className="h-8 px-2 lg:px-3"
            >
                Reset
                <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
        }
    </div>
}

export function FeedbackFacetedFiltersFallback() {
    return <p>Feedback fallback</p>
}