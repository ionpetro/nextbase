'use client';
import React from 'react';
import {
  Card,
  Title,
  AreaChart,
  BarChart,
  BarList,
  LineChart,
  DonutChart,
} from '@tremor/react';

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

const mrrBarListData = [
  {
    name: 'MRR',
    value: 120,
  },
  {
    name: 'ARR',
    value: 157,
  },
  {
    name: 'ARPU',
    value: 109,
  },
  {
    name: 'LTV',
    value: 99,
  },
  {
    name: 'CAC',
    value: 132,
  },
];

export function SaaSMetricsGraphs({
  churnRateData,
  mrrData,
  organizationCountByMonth,
  projectCountByMonth,
  userCountByMonth,
}: {
  churnRateData: Array<{
    month: string;
    churnRate: string;
  }>;
  mrrData: Array<{
    month: string;
    mrr: string;
  }>;
  organizationCountByMonth: Array<{
    month: string;
    number_of_organizations: number;
  }>;
  projectCountByMonth: Array<{
    month: string;
    number_of_projects: number;
  }>;
  userCountByMonth: Array<{
    month: string;
    number_of_users: number;
  }>;
}) {
  return (
    <div className="flex flex-col space-y-2 ">
      <p className="text-2xl font-bold mb-2">Overview</p>
      <div className="grid grid-cols-2 grid-flow-row auto-rows-max w-full gap-6 ">
        <Card className="rounded-xl">
          <Title className="text-xl font-bold text-slate-900">
            Monthly Churn Rate
          </Title>
          <p className="text-base text-slate-500">
            Monthly churn rate vs Organization Count
          </p>
          <AreaChart
            className="h-72 mt-4"
            data={mrrData}
            index="month"
            categories={['mrr']}
            colors={['blue']}
          />
        </Card>
        <Card className="rounded-xl">
          <Title className="text-xl font-bold text-slate-900">
            MRR Analytics
          </Title>
          <p className="text-base text-slate-500">Monthly recurring revenue</p>
          <DonutChart
            className="mt-6"
            data={mrrData.map((item) => {
              return {
                ...item,
                mrr: Number(item.mrr),
              };
            })}
            index="month"
            category="mrr"
            colors={[
              'slate',
              'violet',
              'indigo',
              'rose',
              'cyan',
              'amber',
              'green',
              'orange',
              'pink',
              'pink',
              'pink',
              'green',
              'orange',
              'pink',
            ]}
          />
        </Card>
      </div>

      <div>
        <p className="text-2xl mt-10 mb-2 font-bold">All Stats</p>
      </div>

      <div className="grid grid-cols-3 grid-flow-row auto-rows-max gap-6">
        <Card className="rounded-xl">
          <Title className="text-xl font-bold text-slate-900">
            Organizations by Month
          </Title>
          <p className="text-base text-slate-500">Number of organizations</p>
          <BarChart
            className="h-72 mt-4"
            data={mrrData}
            index="month"
            categories={['mrr']}
            colors={['blue']}
          />
        </Card>
        <Card className="rounded-xl">
          <Title className="text-xl font-bold text-slate-900">
            Projects by Month
          </Title>
          <p className="text-base text-slate-500">Number of projects</p>
          <LineChart
            className="h-72 mt-4"
            data={mrrData}
            index="month"
            categories={['mrr']}
            colors={['blue']}
          />
        </Card>
        <Card className="rounded-xl">
          <Title className="text-xl font-bold text-slate-900">
            Users by Month
          </Title>
          <p className="text-base text-slate-500">Number of users</p>
          <BarList data={mrrBarListData} className="mt-4" />
        </Card>
      </div>
    </div>
  );
}
