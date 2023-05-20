'use client';

import { Button } from '@/components/ui/Button';
import BasicPageHeading from '@/components/ui/Headings/BasicPageHeading';
import ChangeLogListCard from '@/components/ui/ChangeLog/ChangeLogListCard';
import LargeSectionHeading from '@/components/ui/Headings/LargeSectionHeading';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';

import { AiOutlineFilter } from 'react-icons/ai';
import { useState } from 'react';
import InternalRoadmapCard from '@/components/ui/Card/InternalRoadmapCard';

export default function Page() {
  return (
    <div className="space-y-10">
      {/* Create Changelog Page */}
      <BasicPageHeading
        heading="Create Changelog"
        subheading="This is the changelog for the application. It will be updated as new features are added and bugs are fixed."
      />

      {/* Content Page */}
      <div
        className="grid grid-cols-2 gap-10 "
        style={{ gridTemplateColumns: '768px auto' }}
      >
        <div>
          {/* Create Changelog Card */}
          <div className="space-y-2">
            <textarea
              placeholder="Write your log here"
              className="w-full px-6 py-4 rounded-lg border border-gray-200 h-[320px]"
            />

            <div className="flex space-x-2 justify-end">
              <Button variant="outline">Cancel</Button>
              <Button variant="default"> Submit</Button>
            </div>
          </div>

          {/* Previous Changelogs*/}
          <div className="space-y-8 mt-10">
            <LargeSectionHeading
              heading="All Releases"
              subheading="These are the list of all Previous Releases"
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="outline">
                    <AiOutlineFilter className="text-xl mr-2" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem>Latest First</DropdownMenuItem>
                  <DropdownMenuItem>Oldest First</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </LargeSectionHeading>
            <div className="space-y-4">
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
              <ChangeLogListCard
                date="22/4/2023"
                title="Title of Changelog Card"
                description="Description of the description in Markdown"
              />
            </div>
          </div>
        </div>
        {/* Roadmap Card */}
        <div className="space-y-2  px-6 py-4 rounded-lg bg-gray-100 ">
          <p className="font-[600] mb-4">Completed Tasks</p>
          <div className="space-y-4">
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="Medium Priority"
            />

            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Feature Request"
              date="2021-12-30"
              priority="High Priority"
            />
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="High Priority"
            />
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="High Priority"
            />
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="High Priority"
            />
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="High Priority"
            />
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="High Priority"
            />
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="High Priority"
            />
            <InternalRoadmapCard
              title="Completed Task 1"
              description="Completed Task Description 1"
              tag="Bug"
              date="2021-12-30"
              priority="High Priority"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
