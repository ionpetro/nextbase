"use client";

import { AreaChartComponent } from "@/components/AreaChart";
import { BarChartComponent } from "@/components/BarChart";
import { DonutChartComponent } from "@/components/DonutChart";
import { GraphContainer } from "@/components/GraphContainer";
import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const chartDataForMonth = [
  {
    name: "January",
    value: 2890,
  },
  {
    name: "February",
    value: 2756,
  },
  {
    name: "March",
    value: 3322,
  },
  {
    name: "April",
    value: 3470,
  },
  {
    name: "May",
    value: 3475,
  },
  {
    name: "June",
    value: 3129,
  },
  {
    name: "July",
    value: 3482,
  },
  {
    name: "August",
    value: 2412,
  },
  {
    name: "September",
    value: 2678,
  },
  {
    name: "October",
    value: 2190,
  },
  {
    name: "November",
    value: 2498,
  },
  {
    name: "December",
    value: 2598,
  },
];

const chartDataForWeek = [
  {
    name: "1",
    value: 2890,
    fill: "hsl(var(--chart-1))"
  },
  {
    name: "2",
    value: 2756,
    fill: "hsl(var(--chart-3))"
  },
  {
    name: "3",
    value: 3322,
    fill: "hsl(var(--chart-4))"
  },
  {
    name: "4",
    value: 3470,
    fill: "hsl(var(--chart-5))"
  },
];

const chartDataForYears = [
  {
    name: "January",
    value: 1500,
  },
  {
    name: "February",
    value: 4000,
  },
  {
    name: "March",
    value: 2800,
  },
  {
    name: "April",
    value: 2500,
  },
  {
    name: "May",
    value: 3400,
  },
  {
    name: "June",
    value: 3200,
  },
  {
    name: "July",
    value: 2300,
  },
  {
    name: "August",
    value: 2500,
  },
  {
    name: "September",
    value: 2800,
  },
  {
    name: "October",
    value: 3000,
  },
  {
    name: "November",
    value: 4200,
  },
  {
    name: "December",
    value: 4800,
  },
];

const calculateBadgeValue = (data) => {
  const lastMonth = data[data.length - 1].value;
  const secondLastMonth = data[data.length - 2].value;
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
          <AreaChartComponent chartData={chartDataForYears} classname="h-72 w-full" />
        </GraphContainer>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-max gap-6">
          <GraphContainer
            title="Product Price"
            subTitle="Analysis of product price for the week"
            badgeValue={badgeValueforWeek}
          >
            <DonutChartComponent chartData={chartDataForWeek} text="Values" />
          </GraphContainer>
          <GraphContainer
            title="Time spent per month"
            subTitle="Detailed analysis on time spent  in a month "
            badgeValue={badgeValueForMonth}
          >
            <div className="px-8 overflow-x-auto">
              <BarChartComponent chartData={chartDataForMonth} />
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

