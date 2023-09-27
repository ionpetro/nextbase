import { GraphContainer } from '@/components/presentational/tailwind/GraphContainer';
import { T } from '@/components/ui/Typography';
import {
  Card,
  Title,
  AreaChart,
  BarChart,
  BarList,
  LineChart,
  DonutChart,
  Bold,
  Flex,
  Text,
} from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 22',
    churn_rate: 2890,
    count: 2338,
  },
  {
    date: 'Feb 22',
    churn_rate: 2756,
    count: 2103,
  },
  {
    date: 'Mar 22',
    churn_rate: 3322,
    count: 2194,
  },
  {
    date: 'Apr 22',
    churn_rate: 3470,
    count: 2108,
  },
  {
    date: 'May 22',
    churn_rate: 3475,
    count: 1812,
  },
  {
    date: 'Jun 22',
    churn_rate: 3129,
    count: 1726,
  },
  {
    date: 'July 22',
    churn_rate: 3482,
    count: 2444,
  },
  {
    date: 'Aug 22',
    churn_rate: 2412,
    count: 2122,
  },
  {
    date: 'Sep 22',
    churn_rate: 2678,
    count: 1896,
  },
];
const projectCount = [
  {
    month: 'Jan 22',
    project_count: 2890,
  },
  {
    month: 'Feb 22',
    project_count: 2756,
  },
  {
    month: 'Mar 22',
    project_count: 3322,
  },
  {
    month: 'Apr 22',
    project_count: 3470,
  },
  {
    month: 'May 22',
    project_count: 3475,
  },
  {
    month: 'Jun 22',
    project_count: 3129,
  },
  {
    month: 'July 22',
    project_count: 3482,
  },
  {
    month: 'Aug 22',
    project_count: 2412,
  },
  {
    month: 'Sep 22',
    project_count: 2678,
  },
];

const barListData = [
  {
    name: 'Jan 22',
    value: 2890,
  },
  {
    name: 'Feb 22',
    value: 2756,
  },
  {
    name: 'Mar 22',
    value: 3322,
  },
  {
    name: 'Apr 22',
    value: 3470,
  },
  {
    name: 'May 22',
    value: 3475,
  },
  {
    name: 'Jun 22',
    value: 3129,
  },
  {
    name: 'July 22',
    value: 3482,
  },
  {
    name: 'Aug 22',
    value: 2412,
  },
  {
    name: 'Sep 22',
    value: 2678,
  },
];

const dataFormatter = (number: number) => {
  return '$ ' + Intl.NumberFormat('us').format(number).toString();
};

const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;

export function TeamGraphs() {
  return (
    <>
      <div className="h-2 mt-10 pb-4">
        <T.H3 className="leading-none">Overview</T.H3>
      </div>
      <div className="w-full grid grid-cols-2 grid-flow-row auto-rows-max mt-10 gap-10">
        <GraphContainer
          title="Monthly Churn Rate"
          subTitle="Analysis of monthly churn rate"
        >
          <AreaChart
            className="h-72 mt-8"
            data={chartdata}
            index="date"
            categories={['churn_rate', 'count']}
            colors={['cyan', 'orange']}
            valueFormatter={dataFormatter}
          />
        </GraphContainer>

        <GraphContainer title="Projects by Month" subTitle="Number of Projects">
          <BarChart
            className="mt-6"
            data={projectCount}
            index="date"
            categories={['project_count', 'month']}
            colors={['teal', 'blue']}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
          />
        </GraphContainer>
        <GraphContainer
          title="MRR Analytics"
          subTitle="Monthly recurring revenue"
        >
          <DonutChart
            className="mt-12"
            data={chartdata}
            index="date"
            category="churn_rate"
            colors={[
              'blue',
              'violet',
              'indigo',
              'rose',
              'cyan',
              'amber',
              'green',
              'orange',
              'pink',
            ]}
            valueFormatter={valueFormatter}
          />
        </GraphContainer>
        <GraphContainer title="Users by Month" subTitle="Number of user">
          <BarList data={barListData} className="mt-2" />
        </GraphContainer>
        <GraphContainer
          title="Visitor Rate"
          subTitle="Number of visitors vs Organization Count"
        >
          <AreaChart
            className="h-72 mt-12"
            data={chartdata}
            index="date"
            categories={['churn_rate', 'count']}
            colors={['cyan', 'orange']}
            valueFormatter={dataFormatter}
          />
        </GraphContainer>
      </div>
    </>
  );
}
