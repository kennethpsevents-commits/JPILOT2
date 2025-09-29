import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface ReferralRequest {
  email: string;
  message?: string;
}

interface Referral {
  id: string;
  invitee_email: string;
  status: string;
  reward_days: number;
  created_at: string;
}

export async function POST(req: Request) {
  try {
    const { email, message }: ReferralRequest = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Get user from Supabase
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if referral already exists
    const { data: existingReferral } = await supabase
      .from('referrals')
      .select('id')
      .eq('inviter_id', user.id)
      .eq('invitee_email', email)
      .single();

    if (existingReferral) {
      return NextResponse.json(
        { error: 'Referral already sent to this email' },
        { status: 400 }
      );
    }

    // Create referral
    const { data: referral, error } = await supabase
      .from('referrals')
      .insert({
        inviter_id: user.id,
        invitee_email: email,
        reward_days: 10,
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating referral:', error);
      return NextResponse.json(
        { error: 'Failed to create referral' },
        { status: 500 }
      );
    }

    // TODO: Send referral email
    console.log(`Referral created: ${referral.id} for ${email}`);

    return NextResponse.json({
      status: 'ok',
      message: 'Referral invite sent',
      referral: {
        id: referral.id,
        email: referral.invitee_email,
        reward_days: referral.reward_days
      }
    });

  } catch (error) {
    console.error('Referral API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get user from Supabase
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Fetch referrals for logged-in user
    const { data: referrals, error } = await supabase
      .from('referrals')
      .select('*')
      .eq('inviter_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching referrals:', error);
      return NextResponse.json(
        { error: 'Failed to fetch referrals' },
        { status: 500 }
      );
    }

    return NextResponse.json({ referrals: referrals || [] });

  } catch (error) {
    console.error('Referral API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
