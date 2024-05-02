'use client';

import { LucideIcon } from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import { T } from '@/components/ui/Typography';
import { useToastMutation } from '@/hooks/useToastMutation';
import {
  createSubSuccessCB,
  createTrialSubSuccessCB,
  manageSubsSuccessCB,
} from '@/lib/payments/paymentGatewayUtils';
import {
  createSubscription,
  manageSubscription,
  startTrial,
} from '@/lib/payments/paymentUtilsServer';

export function CreateSubscriptionButton({
  organizationId,
  priceId,
}: {
  organizationId: string;
  priceId: string;
}) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await createSubscription(organizationId, priceId);
    },
    {
      loadingMessage: 'Please wait...',
      errorMessage: 'Failed to create subscription',
      successMessage: 'Redirecting...',
      onSuccess: createSubSuccessCB,
    },
  );

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        mutate();
      }}
    >
      {isLoading ? 'Loading...' : 'Choose'}
    </Button>
  );
}

export function StartFreeTrialButton({
  organizationId,
  priceId,
}: {
  organizationId: string;
  priceId: string;
}) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await startTrial(organizationId, priceId);
    },
    {
      loadingMessage: 'Please wait...',
      errorMessage: 'Failed to create subscription',
      successMessage: 'Redirecting...',
      onSuccess: createTrialSubSuccessCB,
    },
  );

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={() => {
        mutate();
      }}
    >
      {isLoading ? 'Starting trial...' : 'Start Free Trial'}
    </Button>
  );
}

export function ManageSubscriptionButton({
  organizationId,
}: {
  organizationId: string;
}) {
  const { mutate, isLoading } = useToastMutation(
    async () => {
      return await manageSubscription(organizationId);
    },
    {
      loadingMessage: 'Please wait...',
      errorMessage: 'Failed to get customer portal link',
      successMessage: 'Redirecting...',
      onSuccess: manageSubsSuccessCB,
    },
  );

  return (
    <div className="space-y-2">
      <Button
        variant="default"
        type="button"
        onClick={() => {
          mutate();
        }}
      >
        <span>{isLoading ? 'Loading...' : 'Manage Subscription'} </span>
        <LucideIcon name='ExternalLink' aria-hidden="true" className="ml-2 w-5 h-5" />{' '}
      </Button>
      <T.P className="text-gray-500 text-sm dark:text-slate-400">
        Manage your subscription. You can modify, upgrade or cancel your
        membership from here.
      </T.P>
    </div>
  );
}
