'use client';

import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProUpgradeButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function ProUpgradeButton({ className = '', children }: ProUpgradeButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!user) {
      alert('Please sign in to upgrade to Pro');
      return;
    }

    setLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Dynamically import Stripe to avoid initialization issues
      const { getStripe } = await import('../../lib/stripe');
      const stripe = await getStripe();
      
      if (!stripe) {
        throw new Error('Failed to initialize Stripe');
      }
      
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className={`bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:from-purple-400 disabled:to-indigo-400 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 ${className}`}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </div>
      ) : (
        children || 'Upgrade to Pro - $4.99'
      )}
    </button>
  );
} 