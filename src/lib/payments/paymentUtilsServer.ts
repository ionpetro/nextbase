'use server';
import { PAYMENT_PROVIDER } from '@/constants';
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
) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return createCheckoutSessionAction({
        organizationId,
        priceId,
      });
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return createCheckoutSessionAction({
        organizationId,
        priceId,
      });
  }
};

export const startTrial = async (organizationId: string, priceId: string) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return startTrialStripe(organizationId, priceId);
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return startTrialStripe(organizationId, priceId);
  }
};

export const manageSubscription = async (organizationId: string) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return manageSubsciptionStripe(organizationId);
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return manageSubsciptionStripe(organizationId);
  }
};
