"use client";

import { GraphContainer } from "@/components/GraphContainer";
import { customTooltip } from "@/components/GraphCustomToolTip";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, DonutChart, Legend } from "@tremor/react";
import Link from "next/link";

const chartDataForMonth = [
  {
    Month: "January",
    "Time Spent": 2890,
  },
  {
    Month: "February",
    "Time Spent": 2756,
  },
  {
    Month: "March",
    "Time Spent": 3322,
  },
  {
    Month: "April",
    "Time Spent": 3470,
  },
  {
    Month: "May",
    "Time Spent": 3475,
  },
  {
    Month: "June",
    "Time Spent": 3129,
  },
  {
    Month: "July",
    "Time Spent": 3482,
  },
  {
    Month: "August",
    "Time Spent": 2412,
  },
  {
    Month: "September",
    "Time Spent": 2678,
  },
  {
    Month: "October",
    "Time Spent": 2190,
  },
  {
    Month: "November",
    "Time Spent": 2498,
  },
  {
    Month: "December",
    "Time Spent": 2598,
  },
];

const chartDataForWeek = [
  {
    week: 1,
    "Time Spent": 2890,
  },
  {
    week: 2,
    "Time Spent": 2756,
  },
  {
    week: 3,
    "Time Spent": 3322,
  },
  {
    week: 4,
    "Time Spent": 3470,
  },
];

const chartDataForYears = [
  {
    Month: "January",
    "Time Spent": 1500,
  },
  {
    Month: "February",
    "Time Spent": 4000,
  },
  {
    Month: "March",
    "Time Spent": 2800,
  },
  {
    Month: "April",
    "Time Spent": 2500,
  },
  {
    Month: "May",
    "Time Spent": 3400,
  },
  {
    Month: "June",
    "Time Spent": 3200,
  },
  {
    Month: "July",
    "Time Spent": 2300,
  },
  {
    Month: "August",
    "Time Spent": 2500,
  },
  {
    Month: "September",
    "Time Spent": 2800,
  },
  {
    Month: "October",
    "Time Spent": 3000,
  },
  {
    Month: "November",
    "Time Spent": 4200,
  },
  {
    Month: "December",
    "Time Spent": 4800,
  },
];

const calculateBadgeValue = (data) => {
  const lastMonth = data[data.length - 1]["Time Spent"];
  const secondLastMonth = data[data.length - 2]["Time Spent"];
  const percentageChange =
    ((lastMonth - secondLastMonth) / secondLastMonth) * 100;
  return {
    badgeValue: `${percentageChange.toFixed(2)}%`,
  };
};

const { badgeValue: badgeValueForMonth } =
  calculateBadgeValue(chartDataForMonth);

const { badgeValue: badgeValueforWeek } = calculateBadgeValue(chartDataForWeek);
const { badgeValue: badgeValueForYear } =
  calculateBadgeValue(chartDataForYears);

const dataFormatter = (number: number) => {
  return `$ ${Intl.NumberFormat("us").format(number).toString()}`;
};

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat("us").format(number).toString()}`;

type Props = {
  organizationSlug: string;
  children: React.ReactNode;
};

export function OrganizationGraphs({ organizationSlug, children }: Props) {
  return (
    <>
      <div className="mt-10 pb-16 flex flex-col gap-6">
        <PageHeading title="Analytics" titleClassName="text-2xl leading-none" />

        <GraphContainer
          title="Revenue per year"
          subTitle="Detailed analysis on time spent in a month"
          badgeValue={badgeValueForYear}
        >
          <AreaChart
            className="h-72 mt-8"
            data={chartDataForYears}
            index="Month"
            categories={["Time Spent"]}
            colors={["blue-700"]}
            curveType="natural"
            customTooltip={customTooltip}
            showAnimation={true}
            showYAxis={false}

            yAxisWidth={100}
          />

        </GraphContainer>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-max gap-6">
          <GraphContainer
            title="Product Price"
            subTitle="Analysis of product price for the week"
            badgeValue={badgeValueforWeek}
          >
            <div className="flex gap-4 items-center px-8 mt-16">
              <Legend
                categories={["Week 1", "Week 2", "Week 3", "Week 4"]}
                colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                className="max-w-xs"
              />
              <DonutChart
                data={chartDataForWeek}
                category="Time Spent"
                index="name"
                valueFormatter={valueFormatter}
                colors={["blue", "cyan", "indigo", "violet", "fuchsia"]}
                className="w-40"
              />
            </div>
          </GraphContainer>
          <GraphContainer
            title="Time spent per month"
            subTitle="Detailed analysis on time spent  in a month "
            badgeValue={badgeValueForMonth}
          >
            <div className="px-8 overflow-x-auto">
              <BarChart
                className="mt-4 h-72"
                data={chartDataForMonth}
                index="Month"
                categories={["Time Spent"]}
                colors={["blue"]}
                yAxisWidth={50}
                customTooltip={customTooltip}
              />
            </div>
          </GraphContainer>

          <GraphContainer
            title="Team members"
            subTitle="Members within organizations"
          >
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto">
              <Button variant={"ghost"} asChild className="self-end border border-muted-foreground">
                <Link href={`/${organizationSlug}/settings/members`}>View all</Link>
              </Button>
              {children}
            </div>

          </GraphContainer>
        </div>
      </div>
    </>
  );
}

