import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface FallbackRequest {
  sessionId: string;
  lastMessage: string;
}

const TRIGGERS = [
  'error', 'timeout', 'loop', 'crash', 'NaN', 'failed', 'invalid',
  'wtf', 'shit', 'fuck', 'kurwa', 'help', 'not working', 'broken',
  'slecht', 'slechte', 'niet goed', 'werkt niet', 'kapot', 'fout',
  'probleem', 'moeilijk', 'ingewikkeld', 'verwarrend', 'onduidelijk'
];

const SMOES = [
  'Ik verbind je even door met mijn collega die hier meer ervaring mee heeft.',
  'Een momentje, ik schakel even iemand anders in.',
  'Laat me mijn teamgenoot erbij halen, die kan dit beter uitleggen.',
  'Mijn collega is hier gespecialiseerd in, laat me je doorverbinden.',
  'Ik ga je even doorverwijzen naar iemand die hier meer van afweet.',
  'Mijn teamgenoot kan je hier beter mee helpen, een momentje.',
  'Laat me de expert erbij halen voor deze specifieke vraag.',
  'Ik schakel je door naar iemand die hier meer ervaring mee heeft.'
];

const FALLBACK_PERSONAS = {
  'error': 'coach',
  'timeout': 'manager',
  'loop': 'lawyer',
  'crash': 'coach',
  'help': 'buddy',
  'not working': 'manager',
  'broken': 'coach'
};

export async function POST(req: Request) {
  try {
    const { sessionId, lastMessage }: FallbackRequest = await req.json();

    if (!sessionId || !lastMessage) {
      return NextResponse.json(
        { error: 'Session ID and last message are required' },
        { status: 400 }
      );
    }

    // Check for trigger words
    const lowerMessage = lastMessage.toLowerCase();
    const trigger = TRIGGERS.find(t => lowerMessage.includes(t.toLowerCase()));

    if (!trigger) {
      return NextResponse.json({ fallback: false });
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

    // Choose a random smoezen
    const smoezen = SMOES[Math.floor(Math.random() * SMOES.length)];
    
    // Determine fallback persona
    const newPersona = FALLBACK_PERSONAS[trigger as keyof typeof FALLBACK_PERSONAS] || 'coach';

    // Create new AI session for handover
    const { data: newSession, error: sessionError } = await supabase
      .from('ai_sessions')
      .insert({
        user_id: user.id,
        role: newPersona,
        messages: [{
          role: 'assistant',
          content: smoezen,
          timestamp: new Date().toISOString()
        }]
      })
      .select()
      .single();

    if (sessionError) {
      console.error('Error creating fallback session:', sessionError);
    }

    // Log fallback event
    const { error: fallbackError } = await supabase
      .from('ai_fallbacks')
      .insert({
        session_id: sessionId,
        trigger_type: 'keyword',
        trigger_value: trigger,
        new_session_id: newSession?.id
      });

    if (fallbackError) {
      console.error('Error logging fallback:', fallbackError);
    }

    return NextResponse.json({
      fallback: true,
      message: smoezen,
      newPersona: newPersona,
      newSessionId: newSession?.id,
      trigger: trigger
    });

  } catch (error) {
    console.error('AI fallback error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
