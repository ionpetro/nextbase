import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

const chartConfig = {
  value: {
    label: 'Number of Users',
    color: 'hsl(var(--chart-1))',
  },

  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig;

type BarListData = {
  name: string;
  value: number;
};

export const BarListComponent = ({
  chartData,
}: {
  chartData: BarListData[];
}) => {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        layout="vertical"
        margin={{
          right: 16,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <XAxis dataKey="value" type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar
          dataKey="value"
          layout="vertical"
          fill="hsl(var(--chart-1))"
          radius={4}
        >
          <LabelList
            dataKey="name"
            position="insideLeft"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
          <LabelList
            dataKey="value"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
