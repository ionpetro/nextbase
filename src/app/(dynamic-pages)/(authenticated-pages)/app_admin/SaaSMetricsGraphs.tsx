'use client';
import React from 'react';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Bar,
  BarChart,
  Tooltip,
  Area,
  AreaChart,
} from 'recharts';
import { ContentType } from 'recharts/types/component/Tooltip';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const CustomTooltip: ContentType<ValueType, NameType> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip px-6 py-2 bg-black border-none focus-none rounded-xl shadow-md">
        <p className="value text-lg text-white font-bold">{`${payload[0].value}`}</p>
        <p className="label text-sm text-slate-300 font-medium mb-1">{`${label}`}</p>
      </div>
    );
  }

  return null;
};

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
    <div>
      <div className="grid grid-cols-3 grid-flow-row auto-rows-max gap-6">
        <div className="flex rounded-xl p-6 border border-slate-300 w-full">
          <div className="flex flex-col justify-between w-full pr-4 h-[320px]">
            <div className="mb-8 space-y-0">
              <h2 className="text-xl font-bold text-slate-900">
                Churn Rate Analytics
              </h2>
              <p className="text-base text-slate-500">Monthly churn rate</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={churnRateData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Area
                  type="monotone"
                  dataKey="churnRate"
                  stroke="#3B81F5"
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B81F5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B81F5" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex rounded-xl p-6 border border-slate-300 w-full">
          <div className="flex flex-col justify-between w-full pr-4 h-[320px]">
            <div className="mb-8 space-y-0">
              <h2 className="text-xl font-bold text-slate-900">
                MRR Analytics
              </h2>
              <p className="text-base text-slate-500">
                Monthly recurring revenue
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mrrData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Area
                  type="monotone"
                  dataKey="mrr"
                  stroke="#3B81F5"
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B81F5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B81F5" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex rounded-xl p-6 border border-slate-300 w-full">
          <div className="flex flex-col justify-between w-full pr-4 h-[320px]">
            <div className="mb-8 space-y-0">
              <h2 className="text-xl font-bold text-slate-900">
                Organizations by Month
              </h2>
              <p className="text-base text-slate-500">
                Number of organizations
              </p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={organizationCountByMonth}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Area
                  type="monotone"
                  dataKey="number_of_organizations"
                  stroke="#3B81F5"
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B81F5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B81F5" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex rounded-xl p-6 border border-slate-300 w-full">
          <div className="flex flex-col justify-between w-full pr-4 h-[320px]">
            <div className="mb-8 space-y-0">
              <h2 className="text-xl font-bold text-slate-900">
                Projects by Month
              </h2>
              <p className="text-base text-slate-500">Number of projects</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={projectCountByMonth}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Area
                  type="monotone"
                  dataKey="number_of_projects"
                  stroke="#3B81F5"
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B81F5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B81F5" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex rounded-xl p-6 border border-slate-300 w-full">
          <div className="flex flex-col justify-between w-full pr-4 h-[320px]">
            <div className="mb-8 space-y-0">
              <h2 className="text-xl font-bold text-slate-900">
                Users by Month
              </h2>
              <p className="text-base text-slate-500">Number of users</p>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={userCountByMonth}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Area
                  type="monotone"
                  dataKey="number_of_users"
                  stroke="#3B81F5"
                  fill="url(#colorGradient)"
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#3B81F5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B81F5" stopOpacity={0} />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
