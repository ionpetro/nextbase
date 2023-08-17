import { T } from '@/components/ui/Typography';
import { stripe } from '@/utils/stripe';

async function getCurrentMRR() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date(
    startOfMonth.getFullYear(),
    startOfMonth.getMonth() + 1,
    1
  );

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
      mrr +=
        ((sub.items.data[0].price.unit_amount ?? 0) *
          (sub.items.data[0].quantity ?? 0)) /
        100;
    }
  });

  return mrr.toFixed(2);
}

async function getMRR() {
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const monthlyMRR: { month: string; mrr: string }[] = [];

  for (let i = 0; i <= 12; i++) {
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1
    );
    const endOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i + 1,
      1
    );

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
        mrr +=
          ((sub.items.data[0].price.unit_amount ?? 0) *
            (sub.items.data[0].quantity ?? 0)) /
          100;
      }
    });

    monthlyMRR.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
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
    const startOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      1
    );
    const endOfMonth = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i + 1,
      1
    );

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
      (canceledSubscriptions.length / (subscriptionsCreated.data.length || 1)) *
      100;

    monthlyChurnRates.push({
      month: startOfMonth.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      churnRate: churnRate.toFixed(2),
    });
  }

  return monthlyChurnRates;
}

export default async function Payments() {
  const churnRate = await getChurnRate();
  const mrr = await getMRR();
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3">
        <div className="space-y-2">
          <T.H3>Churn Rate</T.H3>
          <pre>{JSON.stringify(churnRate, null, 2)}</pre>
        </div>
        <div className="space-y-2">
          <T.H3>MRR</T.H3>
          <pre>{JSON.stringify(mrr, null, 2)}</pre>
        </div>
        <div className="space-y-2">
          <T.H3>Current MRR</T.H3>
          <span>{await getCurrentMRR()}</span>
        </div>
      </div>
    </div>
  );
}
