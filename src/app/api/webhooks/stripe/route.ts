import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '../../../../../lib/stripe-server';
import { supabase } from '../../../../../lib/supabase';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const userId = session.metadata?.userId;

        if (userId) {
          // Update user's Pro status in Supabase
          const { error } = await supabase
            .from('profiles')
            .update({ is_pro: true })
            .eq('user_id', userId);

          if (error) {
            console.error('Error updating user Pro status:', error);
            return NextResponse.json(
              { error: 'Failed to update user status' },
              { status: 500 }
            );
          }
        }
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
} 