import Stripe from 'stripe';

// Server-side Stripe instance (only for API routes)
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
}); 