import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@/lib/supabase/server';

interface PaddleEvent {
  event_type: string;
  data: {
    id: string;
    status: string;
    customer_id: string;
    subscription_id?: string;
    plan_id?: string;
    custom_data?: {
      user_id?: string;
      tier?: string;
    };
    created_at: string;
    updated_at: string;
    next_billed_at?: string;
    canceled_at?: string;
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('paddle-signature') ?? '';

    // Verify HMAC signature with webhook secret
    const secret = process.env.PADDLE_WEBHOOK_SECRET ?? '';
    const expected = crypto
      .createHmac('sha256', secret)
      .update(body, 'utf8')
      .digest('hex');

    if (signature !== expected) {
      console.error('Invalid Paddle webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event: PaddleEvent = JSON.parse(body);
    console.log('Paddle webhook received:', event.event_type);

    // Handle different Paddle events
    switch (event.event_type) {
      case 'subscription.created':
        await handleSubscriptionCreated(event);
        break;
      case 'subscription.updated':
        await handleSubscriptionUpdated(event);
        break;
      case 'subscription.canceled':
        await handleSubscriptionCanceled(event);
        break;
      case 'subscription.paused':
        await handleSubscriptionPaused(event);
        break;
      case 'subscription.resumed':
        await handleSubscriptionResumed(event);
        break;
      case 'transaction.completed':
        await handleTransactionCompleted(event);
        break;
      case 'transaction.payment_failed':
        await handlePaymentFailed(event);
        break;
      default:
        console.log('Unhandled Paddle event:', event.event_type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Paddle webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(event: PaddleEvent) {
  const supabase = await createClient();
  const { data, custom_data } = event.data;

  // Extract user_id from custom_data or customer_id
  const userId = custom_data?.user_id || data.customer_id;
  const tier = custom_data?.tier || mapPlanIdToTier(data.plan_id);

  if (!userId) {
    console.error('No user_id found in subscription created event');
    return;
  }

  try {
    // Create subscription record
    const { error } = await supabase
      .from('subscriptions')
      .insert({
        id: data.id,
        user_id: userId,
        tier: tier,
        status: 'active',
        started_at: data.created_at,
        expires_at: data.next_billed_at
      });

    if (error) {
      console.error('Error creating subscription:', error);
    } else {
      console.log(`Subscription created for user ${userId} with tier ${tier}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionCreated:', error);
  }
}

async function handleSubscriptionUpdated(event: PaddleEvent) {
  const supabase = await createClient();
  const { data, custom_data } = event.data;

  const userId = custom_data?.user_id || data.customer_id;
  const tier = custom_data?.tier || mapPlanIdToTier(data.plan_id);

  if (!userId) {
    console.error('No user_id found in subscription updated event');
    return;
  }

  try {
    // Update subscription record
    const { error } = await supabase
      .from('subscriptions')
      .update({
        tier: tier,
        status: data.status,
        expires_at: data.next_billed_at,
        updated_at: data.updated_at
      })
      .eq('id', data.id);

    if (error) {
      console.error('Error updating subscription:', error);
    } else {
      console.log(`Subscription updated for user ${userId} with tier ${tier}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionUpdated:', error);
  }
}

async function handleSubscriptionCanceled(event: PaddleEvent) {
  const supabase = await createClient();
  const { data } = event.data;

  try {
    // Mark subscription as canceled
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: data.updated_at
      })
      .eq('id', data.id);

    if (error) {
      console.error('Error canceling subscription:', error);
    } else {
      console.log(`Subscription canceled: ${data.id}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionCanceled:', error);
  }
}

async function handleSubscriptionPaused(event: PaddleEvent) {
  const supabase = await createClient();
  const { data } = event.data;

  try {
    // Mark subscription as paused
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'paused',
        updated_at: data.updated_at
      })
      .eq('id', data.id);

    if (error) {
      console.error('Error pausing subscription:', error);
    } else {
      console.log(`Subscription paused: ${data.id}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionPaused:', error);
  }
}

async function handleSubscriptionResumed(event: PaddleEvent) {
  const supabase = await createClient();
  const { data } = event.data;

  try {
    // Mark subscription as active
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        updated_at: data.updated_at
      })
      .eq('id', data.id);

    if (error) {
      console.error('Error resuming subscription:', error);
    } else {
      console.log(`Subscription resumed: ${data.id}`);
    }
  } catch (error) {
    console.error('Error in handleSubscriptionResumed:', error);
  }
}

async function handleTransactionCompleted(event: PaddleEvent) {
  const supabase = await createClient();
  const { data } = event.data;

  try {
    // Log successful payment
    console.log(`Payment completed for subscription: ${data.subscription_id}`);
    
    // Update subscription status if needed
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'active',
        updated_at: data.updated_at
      })
      .eq('id', data.subscription_id);

    if (error) {
      console.error('Error updating subscription after payment:', error);
    }
  } catch (error) {
    console.error('Error in handleTransactionCompleted:', error);
  }
}

async function handlePaymentFailed(event: PaddleEvent) {
  const supabase = await createClient();
  const { data } = event.data;

  try {
    // Log failed payment
    console.log(`Payment failed for subscription: ${data.subscription_id}`);
    
    // Update subscription status
    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'payment_failed',
        updated_at: data.updated_at
      })
      .eq('id', data.subscription_id);

    if (error) {
      console.error('Error updating subscription after payment failure:', error);
    }
  } catch (error) {
    console.error('Error in handlePaymentFailed:', error);
  }
}

function mapPlanIdToTier(planId?: string): string {
  // Map Paddle plan IDs to our subscription tiers
  const planMapping: { [key: string]: string } = {
    'buddy_plan': 'buddy',
    'coach_plan': 'coach',
    'manager_plan': 'manager',
    'lawyer_plan': 'lawyer'
  };

  return planMapping[planId || ''] || 'buddy';
}
