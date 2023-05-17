"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { BiChevronLeft } from "react-icons/bi";
import { BiChevronRight } from "react-icons/bi";
import PageHeadingWithActions from "@/components/ui/Headings/PageHeadingWithActions";
import TableCell from "@/components/ui/Table/TableCell";
import TableHeader from "@/components/ui/Table/TableHeader";
import HelpCard from "@/components/ui/Card/HelpCard";
import organisationshelp from "public/assets/help-assets/organisations-teams.png";
import teamsprojects from "public/assets/help-assets/teams-projects.png";
import { BsPlusLg } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { TeamGraphs } from "../../../TeamGraphs";

type Project = {
  id: number;
  projectName: string;
  objective: string;
  projectCreatedAt: string;
  priority: string;
};

type Team = {
  id: number;
  teamName: string;
  projects: Project[];
};

type Organisation = {
  id: number;
  organisationName: string;
  teams: Team[];
  owner: string;
  members: string;
  plan: string;
  credits: string | number;
  createdAt: string;
};

type InitialOrganisationsListType = Organisation[];

const initialOrganisationsList: InitialOrganisationsListType = [
  {
    id: 1,
    organisationName: "Organisation 1",
    owner: "owner_1",
    members: "members_1",
    plan: "plan_1",
    credits: "credits_1",
    createdAt: "createdAt_1",
    teams: [
      {
        id: 1,
        teamName: "team_1",
        projects: [
          {
            id: 1,
            projectName: "team_1_project_1",
            objective: "Develop the user interface design ",
            projectCreatedAt: "project_createdAt_1",
            priority: "Low Priority",
          },
          {
            id: 2,
            projectName: "team_1_project_2",
            objective: "Develop the front-end functionality",
            projectCreatedAt: "project_createdAt_2",
            priority: "Medium Priority",
          },
          {
            id: 3,
            projectName: "team_1_project_3",
            objective: " Develop the back-end functionality",
            projectCreatedAt: "project_createdAt_3",
            priority: "High Priority",
          },
          {
            id: 4,
            projectName: "team_1_project_4",
            objective: "Conduct thorough testing",
            projectCreatedAt: "project_createdAt_4",
            priority: "Low Priority",
          },
          {
            id: 5,
            projectName: "team_1_project_5",
            objective: "Implement a robust data management system",
            projectCreatedAt: "project_createdAt_5",
            priority: "Medium Priority",
          },
          {
            id: 6,
            projectName: "team_1_project_6",
            objective: "Ensure the security of the FreshBite app",
            projectCreatedAt: "project_createdAt_6",
            priority: "Medium Priority",
          },
        ],
      },
    ],
  },
];

const mapPriorityToVariant = (priority: string) => {
  switch (priority) {
    case "High Priority":
      return "danger";
    case "Medium Priority":
      return "warning";
    case "Low Priority":
      return "information";
    default:
      return "default";
  }
};

export default function Page() {
  return (
    <>
      <div className="space-y-10">
        <div className="space-x-6">
          <span className="text-base py-2 font-[600] text-slate-500">
            <Link href="/admin-panel">Organizations</Link>
          </span>
          <span className="text-base  py-2 font-[600] text-slate-500">/</span>
          <span className="text-base py-2 font-[600] text-slate-500">
            <Link href="/admin-panel">Organization</Link>
          </span>
          <span className="text-base  py-2 font-[600] text-slate-500">/</span>
          <span className="text-base py-2 bg-blue-50 rounded-lg px-4 font-[700] text-blue-600">
            Team
          </span>
        </div>

        <PageHeadingWithActions
          heading="Team"
          subheading="This is where you manage your Team."
        >
          <div className="mt-3 text-gray-400 text-3xl space-x-2">
            <Button>
              <BsPlusLg className="text-white mr-2" />
              Create Project
            </Button>
            <Button variant={"outline"}>
              <IoMdSettings className="text-slate-600 mr-2" />
              View Team Settings
            </Button>
          </div>
        </PageHeadingWithActions>

        {/* Team Table */}
        <div className="flex rounded-lg bg-clip-border border border-gray-200  max-w-[1296px] overflow-hidden">
          <table className="w-full bg-clip-content border-slate-200">
            <thead className="w-full bg-clip-border">
              <tr className="p-0 ">
                <th className="p-0">
                  <TableHeader>Serial No.</TableHeader>
                </th>
                <th className="p-0">
                  <TableHeader>Team Name</TableHeader>
                </th>
                <th className="p-0">
                  <TableHeader>Projects</TableHeader>
                </th>
                <th className="p-0">
                  <TableHeader>Created At</TableHeader>
                </th>
                <th className="p-0">
                  <TableHeader>Priority</TableHeader>
                </th>
                <th className="p-0">
                  <TableHeader>Settings</TableHeader>
                </th>
              </tr>
            </thead>
            <tbody>
              {initialOrganisationsList
                .filter((org) => org.id === 1)
                .flatMap((org) => org.teams)
                .filter((team) => team.id === 1)
                .flatMap((team) => team.projects)
                .map((project) => (
                  <tr className="p-0" key={project.id}>
                    <td className="p-0 ">
                      <TableCell classname="px-6 py-4">{project.id}</TableCell>
                    </td>
                    <td className="p-0 ">
                      <TableCell classname="px-6 py-4">
                        {project.projectName}
                      </TableCell>
                    </td>
                    <td className="p-0 ">
                      <TableCell classname="px-6 py-4">
                        {project.objective}
                      </TableCell>
                    </td>
                    <td className="p-0 ">
                      <TableCell classname="px-6 py-4">
                        {project.projectCreatedAt}
                      </TableCell>
                    </td>
                    <td className="p-0 ">
                      <TableCell classname="px-6 py-4">
                        <Badge
                          className=" whitespace-nowrap "
                          variant={mapPriorityToVariant(project.priority)}
                        >
                          {project.priority}
                        </Badge>
                      </TableCell>
                    </td>
                    <td className="p-0 ">
                      <TableCell classname="px-6 py-4">
                        <IoMdSettings className="text-2xl text-slate-600" />
                      </TableCell>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <TeamGraphs />
        {/* Help Cards */}
        <div className="grid grid-cols-2 space-x-6 w-full">
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
    </>
  );
}
