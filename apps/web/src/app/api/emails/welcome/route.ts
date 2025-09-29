import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface WelcomeEmailRequest {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  referralCode?: string;
}

export async function POST(req: Request) {
  try {
    const { user, referralCode }: WelcomeEmailRequest = await req.json();

    if (!user?.email) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    // Get user from Supabase to check email opt-in
    const supabase = await createClient();
    const { data: userData } = await supabase
      .from('users')
      .select('email_opt_in')
      .eq('id', user.id)
      .single();

    // Only send if user has opted in
    if (!userData?.email_opt_in) {
      return NextResponse.json({
        status: 'skipped',
        message: 'User has not opted in to emails'
      });
    }

    // Dummy email sender – later integrate with Resend
    console.log('Send welcome email to:', user.email);
    console.log('Referral code:', referralCode);

    // TODO: Integrate with Resend or other email service
    // const emailData = {
    //   to: user.email,
    //   subject: 'Welkom bij WeAreJobPilot! 🚀',
    //   template: 'welcome',
    //   data: {
    //     name: user.name || 'Er',
    //     referralCode: referralCode
    //   }
    // };

    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json({
      status: 'sent',
      message: 'Welcome email sent successfully'
    });

  } catch (error) {
    console.error('Welcome email error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
