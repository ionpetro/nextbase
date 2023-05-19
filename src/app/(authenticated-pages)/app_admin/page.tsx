import { T } from '@/components/ui/Typography';
import { stripe } from '@/utils/stripe';
import { supabaseAdmin } from '@/utils/supabase-admin';
import createClient from '@/utils/supabase-server';
import { SaaSMetricsGraphs } from './SaasMetrics';

async function getCurrentMRR() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 1);

  const subscriptions = await stripe.subscriptions.list({
    created: {
      gte: Math.floor(startOfMonth.getTime() / 1000),
      lt: Math.floor(endOfMonth.getTime() / 1000),
    },
    status: 'all',
  });

  let mrr = 0;
  subscriptions.data.forEach((sub) => {
    if (sub.status === 'active' || sub.status === 'trialing') {
      mrr += ((sub.items.data[0].price.unit_amount ?? 0) * (sub.items.data[0].quantity ?? 0)) / 100;
    }
  });

  return mrr.toFixed(2);
}

async function getMRR() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyMRR: { month: string, mrr: string }[] = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const endOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + i + 1, 1);

    const subscriptions = await stripe.subscriptions.list({
      created: {
        gte: Math.floor(startOfMonth.getTime() / 1000),
        lt: Math.floor(endOfMonth.getTime() / 1000),
      },
      status: 'all',
    });

    let mrr = 0;
    subscriptions.data.forEach((sub) => {
      if (sub.status === 'active' || sub.status === 'trialing') {
        mrr += ((sub.items.data[0].price.unit_amount ?? 0) * (sub.items.data[0].quantity ?? 0)) / 100;
      }
    });

    monthlyMRR.push({
      month: startOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      mrr: mrr.toFixed(2),
    });
  }

  return monthlyMRR;
}

async function getChurnRate() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyChurnRates: Array<{
    month: string;
    churnRate: string;
  }> = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
    const endOfMonth = new Date(startDate.getFullYear(), startDate.getMonth() + i + 1, 1);

    const subscriptionsCreated = await stripe.subscriptions.list({
      created: {
        gte: Math.floor(startOfMonth.getTime() / 1000),
        lt: Math.floor(endOfMonth.getTime() / 1000),
      },
      status: 'all',
    });

    const canceledSubscriptions = subscriptionsCreated.data.filter(
      (sub) => sub.status === 'canceled'
    );

    const churnRate =
      (canceledSubscriptions.length / (subscriptionsCreated.data.length || 1)) * 100;

    monthlyChurnRates.push({
      month: startOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      churnRate: churnRate.toFixed(2),
    });
  }

  return monthlyChurnRates;
}

async function getTotalUserCount() {
  const { data } = await supabaseAdmin.rpc('app_admin_get_total_user_count');
  return data ?? 0
}

async function getTotalOrganizationsCount() {
  const { data } = await supabaseAdmin.rpc('app_admin_get_total_organization_count');
  return data ?? 0
}

async function getTotalProjectsCount() {
  const { data } = await supabaseAdmin.rpc('app_admin_get_total_project_count');
  return data ?? 0
}

async function getOrganizationCountByMonth() {
  const { data } = await supabaseAdmin.rpc('app_admin_get_organizations_created_per_month');
  return data ?? [];
}

async function getProjectCountByMonth() {
  const { data } = await supabaseAdmin.rpc('app_admin_get_projects_created_per_month');
  return data ?? [];
}

async function getUserCountByMonth() {
  const { data } = await supabaseAdmin.rpc('app_admin_get_users_created_per_month');
  return data ?? [];
}

async function getActiveUsers() {
  const { data } = await supabaseAdmin.rpc('app_admin_get_recent_30_day_signin_count');
  return data ?? [];
}




export default async function AdminPanel() {

  const [
    currentMRR,
    mrr,
    churnRate,
    totalUserCount,
    totalOrganizationsCount,
    totalProjectsCount,
    organizationCountByMonth,
    projectCountByMonth,
    userCountByMonth,
    activeUsers,
  ] = await Promise.all([getCurrentMRR(), getMRR(), getChurnRate(),
  getTotalUserCount(),
  getTotalOrganizationsCount(),
  getTotalProjectsCount(),
  getOrganizationCountByMonth(),
  getProjectCountByMonth(),
  getUserCountByMonth(),
  getActiveUsers(),

  ]);

  console.log(churnRate);
  return (
    <div className="space-y-4">
      <SaaSMetricsGraphs mrrData={mrr} churnRateData={churnRate}
        organizationCountByMonth={organizationCountByMonth}
        projectCountByMonth={projectCountByMonth}
        userCountByMonth={userCountByMonth}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-lg p-16 border border-slate-100 flex items-center flex-col-reverse">
          <T.Subtle>
            Current MRR
          </T.Subtle>
          <T.H1>{`$${currentMRR}`}</T.H1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-16 border border-slate-100 flex items-center flex-col-reverse">
          <T.Subtle>
            Total Users
          </T.Subtle>
          <T.H1>{totalUserCount}</T.H1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-16 border border-slate-100 flex items-center flex-col-reverse">
          <T.Subtle>
            Total Organizations
          </T.Subtle>
          <T.H1>{totalOrganizationsCount}</T.H1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-16 border border-slate-100 flex items-center flex-col-reverse">
          <T.Subtle>
            Total Projects
          </T.Subtle>
          <T.H1>{totalProjectsCount}</T.H1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-16 border border-slate-100 flex items-center flex-col-reverse">
          <T.Subtle>
            Active Users (30 days)
          </T.Subtle>
          <T.H1>{activeUsers}</T.H1>
        </div>
      </div>
    </div>
  );
}
