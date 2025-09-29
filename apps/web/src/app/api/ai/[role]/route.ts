import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface AIParams {
  role: string;
}

interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export async function POST(
  req: Request,
  { params }: { params: AIParams }
) {
  try {
    const { message, sessionId } = await req.json();
    const { role } = params;

    // Validate role
    if (!['buddy', 'coach', 'manager', 'lawyer'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid AI role' },
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

    // Generate AI response based on role
    const aiResponse = generateAIResponse(role, message);

    // Save conversation to database
    if (sessionId) {
      await saveConversation(supabase, user.id, role, message, aiResponse, sessionId);
    }

    return NextResponse.json({
      role,
      reply: aiResponse,
      received: message,
      sessionId: sessionId || 'new'
    });

  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function generateAIResponse(role: string, message: string): string {
  const responses = {
    buddy: [
      `🤖 [Buddy] Ik begrijp dat je hulp nodig hebt met "${message}". Laat me je helpen de perfecte baan te vinden!`,
      `🤖 [Buddy] Dat klinkt interessant! Vertel me meer over wat je zoekt in een baan.`,
      `🤖 [Buddy] Ik ga je helpen met je carrière. Wat is je grootste uitdaging op dit moment?`
    ],
    coach: [
      `🎯 [Coach] Als je carrièrecoach zie ik dat "${message}" een belangrijk punt is. Laten we dit strategisch aanpakken.`,
      `🎯 [Coach] Excellent punt! Laten we een actieplan maken om dit te bereiken.`,
      `🎯 [Coach] Ik ga je helpen om je doelen te bereiken. Wat is je volgende stap?`
    ],
    manager: [
      `👔 [Manager] Vanuit management perspectief begrijp ik "${message}". Laten we dit professioneel aanpakken.`,
      `👔 [Manager] Dat is een goede vraag voor iemand in een leidinggevende rol. Hier is mijn advies:`,
      `👔 [Manager] Als manager moet je dit strategisch benaderen. Laten we de opties bespreken.`
    ],
    lawyer: [
      `⚖️ [Lawyer] Vanuit juridisch perspectief is "${message}" een belangrijk punt. Hier is mijn professionele advies:`,
      `⚖️ [Lawyer] Dat is een complexe situatie die juridische aandacht vereist. Laten we dit stap voor stap bekijken.`,
      `⚖️ [Lawyer] Als juridisch adviseur kan ik je helpen met deze kwestie. Wat zijn de specifieke details?`
    ]
  };

  const roleResponses = responses[role as keyof typeof responses] || responses.buddy;
  return roleResponses[Math.floor(Math.random() * roleResponses.length)];
}

async function saveConversation(
  supabase: any,
  userId: string,
  role: string,
  userMessage: string,
  aiResponse: string,
  sessionId: string
) {
  try {
    // Get existing session or create new one
    let session;
    if (sessionId !== 'new') {
      const { data: existingSession } = await supabase
        .from('ai_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('user_id', userId)
        .single();

      session = existingSession;
    }

    const newMessage: AIMessage = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };

    const aiMessage: AIMessage = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString()
    };

    if (session) {
      // Update existing session
      const updatedMessages = [...(session.messages || []), newMessage, aiMessage];
      await supabase
        .from('ai_sessions')
        .update({ messages: updatedMessages })
        .eq('id', sessionId);
    } else {
      // Create new session
      const { data: newSession } = await supabase
        .from('ai_sessions')
        .insert({
          user_id: userId,
          role,
          messages: [newMessage, aiMessage]
        })
        .select()
        .single();

      return newSession?.id;
    }
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}
