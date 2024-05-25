'use client';
import { PAYMENT_PROVIDER } from '@/constants';
import {
  createSubSuccessCBStripe,
  manageSubsSuccessCBStripe,
} from './stripe/stripeUtils';

export const createSubSuccessCB = async (sessionId: string) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return createSubSuccessCBStripe(sessionId);
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return createSubSuccessCBStripe(sessionId);
  }
};

export const createTrialSubSuccessCB = async (sessionId: string) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      // the method implementation is the same for trial and not trial
      return createSubSuccessCBStripe(sessionId);
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return createSubSuccessCBStripe(sessionId);
  }
};

export const manageSubsSuccessCB = (url: string) => {
  switch (PAYMENT_PROVIDER) {
    case 'stripe':
      return manageSubsSuccessCBStripe(url);
    case 'lemonsqueezy':
      throw Error('under development');
    default:
      return manageSubsSuccessCBStripe(url);
  }
};
