'use client';
import { getStripe } from '@/utils/stripe-client';

export const manageSubsSuccessCBStripe = (url: string) => {
  window.location.assign(url);
};

export const createSubSuccessCBStripe = async (sessionId: string) => {
  const stripe = await getStripe();
  stripe?.redirectToCheckout({ sessionId });
};
