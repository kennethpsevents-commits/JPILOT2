import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface EmailOptInRequest {
  optIn: boolean;
}

export async function POST(req: Request) {
  try {
    const { optIn }: EmailOptInRequest = await req.json();

    // Get user from Supabase
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Update user email opt-in status
    const { error } = await supabase
      .from('users')
      .update({ 
        email_opt_in: optIn,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating email opt-in:', error);
      return NextResponse.json(
        { error: 'Failed to update email preferences' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Email opt-in ${optIn ? 'enabled' : 'disabled'} successfully`
    });

  } catch (error) {
    console.error('Email opt-in API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
