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
    SemiAnalysis: 2890,
    'The Pragmatic Engineer': 2338,
  },
  {
    date: 'Feb 22',
    SemiAnalysis: 2756,
    'The Pragmatic Engineer': 2103,
  },
  {
    date: 'Mar 22',
    SemiAnalysis: 3322,
    'The Pragmatic Engineer': 2194,
  },
  {
    date: 'Apr 22',
    SemiAnalysis: 3470,
    'The Pragmatic Engineer': 2108,
  },
  {
    date: 'May 22',
    SemiAnalysis: 3475,
    'The Pragmatic Engineer': 1812,
  },
  {
    date: 'Jun 22',
    SemiAnalysis: 3129,
    'The Pragmatic Engineer': 1726,
  },
  {
    date: 'July 22',
    SemiAnalysis: 3482,
    'The Pragmatic Engineer': 2444,
  },
  {
    date: 'Aug 22',
    SemiAnalysis: 2412,
    'The Pragmatic Engineer': 2122,
  },
  {
    date: 'Sep 22',
    SemiAnalysis: 2678,
    'The Pragmatic Engineer': 1896,
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

export function OrganizationGraphs() {
  return (
    <div className="w-full grid grid-cols-2 grid-flow-row auto-rows-max gap-6">
      <Card className="rounded-lg">
        <Title className="text-xl font-bold text-slate-900">
          Monthly Churn Rate
        </Title>
        <p className="text-base text-slate-500">
          Monthly churn rate vs Organization Count
        </p>
        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={['SemiAnalysis', 'The Pragmatic Engineer']}
          colors={['cyan', 'orange']}
          valueFormatter={dataFormatter}
        />
      </Card>
      <Card className="rounded-lg">
        <Title className="text-xl font-bold text-slate-900">
          MRR Analytics
        </Title>
        <p className="text-base text-slate-500">Monthly recurring revenue</p>
        <DonutChart
          className="mt-6"
          data={chartdata}
          index="date"
          category="SemiAnalysis"
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
          ]}
          valueFormatter={valueFormatter}
        />
      </Card>
      <Card className="rounded-lg">
        <Title className="text-xl font-bold text-slate-900">
          Organizations by Month
        </Title>
        <p className="text-base text-slate-500">Number of organizations</p>
        <BarChart
          className="mt-6"
          data={chartdata}
          index="date"
          categories={['SemiAnalysis', 'The Pragmatic Engineer']}
          colors={['teal', 'blue']}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </Card>
      <Card className="rounded-lg">
        <Title className="text-xl font-bold text-slate-900">
          Projects by Month
        </Title>
        <p className="text-base text-slate-500">Number of projects</p>
        <LineChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={['SemiAnalysis', 'The Pragmatic Engineer']}
          colors={['cyan', 'orange']}
        />
      </Card>
      <Card className="rounded-lg col-span-full">
        <Title className="text-xl font-bold text-slate-900">
          Users by Month
        </Title>
        <p className="text-base text-slate-500">Number of users</p>
        <Flex className="mt-4">
          <Text>
            <Bold>Source</Bold>
          </Text>
          <Text>
            <Bold>Visits</Bold>
          </Text>
        </Flex>
        <BarList data={barListData} className="mt-2" />
      </Card>
    </div>
  );
}
