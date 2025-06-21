import { loadStripe, Stripe } from '@stripe/stripe-js';

// Client-side Stripe instance with lazy loading
let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = () => {
  if (stripePromise) {
    return stripePromise;
  }

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  
  if (!publishableKey) {
    console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('STRIPE')));
    throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable. Please check your .env.local file.');
  }
  
  if (!publishableKey.startsWith('pk_')) {
    throw new Error(`Invalid Stripe publishable key format. Should start with pk_test_ or pk_live_. Got: ${publishableKey.substring(0, 10)}...`);
  }
  
  try {
    stripePromise = loadStripe(publishableKey);
    return stripePromise;
  } catch (error) {
    console.error('Error loading Stripe:', error);
    throw new Error('Failed to initialize Stripe client');
  }
}; 