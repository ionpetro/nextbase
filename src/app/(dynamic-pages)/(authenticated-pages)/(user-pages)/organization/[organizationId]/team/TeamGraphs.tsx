'use client';
import {
  Card,
  Title,
  AreaChart,
  BarChart,
  BarList,
  LineChart,
  DonutChart,
  Subtitle,
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

export function TeamGraphs() {
  return (
    <div>
      <div>
        <div className="flex flex-col space-y-6">
          <div className="w-full flex space-x-4">
            <Card className="rounded-lg">
              <Title>Newsletter revenue over time (USD)</Title>
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
              <Title>Newsletter revenue over time (USD)</Title>
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
          </div>
          <div className="w-full flex space-x-4">
            <Card className="rounded-lg">
              <Title>Newsletter revenue over time (USD)</Title>
              <LineChart
                className="h-72 mt-4"
                data={chartdata}
                index="date"
                categories={['SemiAnalysis', 'The Pragmatic Engineer']}
                colors={['cyan', 'orange']}
              />
            </Card>
            <Card className="rounded-lg">
              <Title>Number of species threatened with extinction (2021)</Title>
              <Subtitle>
                The IUCN Red List has assessed only a small share of the total
                known species in the world.
              </Subtitle>
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
          </div>
          <div className="w-full flex space-x-4">
            <Card className="rounded-lg">
              <Title>Newsletter revenue over time (USD)</Title>
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
        </div>
      </div>
    </div>
  );
}
