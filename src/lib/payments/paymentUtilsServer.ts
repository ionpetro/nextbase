'use server';
import { PAYMENT_PROVIDER } from '@/constants';
import type { SAPayload } from '@/types';
import {
  createCheckoutSessionAction,
  getMRRStripe,
  getSubscriptionsListStripe,
  manageSubsciptionStripe,
  startTrialStripe,
} from './stripe/stripeServerUtils';

export const getMRR = (startOfMonth: Date, endOfMonth: Date) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return getMRRStripe(startOfMonth, endOfMonth);
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return getMRRStripe(startOfMonth, endOfMonth);
  }
};

export const getSubscriptions = async (
  startOfMonth: Date,
  endOfMonth: Date,
) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return getSubscriptionsListStripe(startOfMonth, endOfMonth);
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return getSubscriptionsListStripe(startOfMonth, endOfMonth);
  }
};

export const createSubscription = async (
  organizationId: string,
  priceId: string,
): Promise<SAPayload<string>> => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe': {
      const data = await createCheckoutSessionAction({
        organizationId,
        priceId,
      });
      return { status: 'success', data };
    }
    case 'lemonsqueezy':
      return { status: 'error', message: 'under development' };
    default: {
      const data = await createCheckoutSessionAction({
        organizationId,
        priceId,
      });
      return { status: 'success', data };
    }
  }
};

export const startTrial = async (
  organizationId: string,
  priceId: string,
): Promise<SAPayload<string>> => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe': {
      const data = await startTrialStripe(organizationId, priceId);
      return { status: 'success', data };
    }
    case 'lemonsqueezy':
      return { status: 'error', message: 'under development' };
    default: {
      const data = await startTrialStripe(organizationId, priceId);
      return { status: 'success', data };
    }
  }
};

export const manageSubscription = async (
  organizationId: string,
): Promise<SAPayload<string>> => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe': {
      const data = await manageSubsciptionStripe(organizationId);
      return { status: 'success', data };
    }
    case 'lemonsqueezy':
      return { status: 'error', message: 'under development' };
    default: {
      const data = await manageSubsciptionStripe(organizationId);
      return { status: 'success', data };
    }
  }
};
