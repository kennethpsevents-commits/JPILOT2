import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface JobParams {
  id: string;
}

// Mock subscription check – later connect Supabase
function checkSubscription(tier?: string) {
  return tier && ['coach', 'manager', 'lawyer'].includes(tier);
}

export async function GET(
  req: Request,
  { params }: { params: JobParams }
) {
  try {
    const { id } = params;
    const tier = req.headers.get('x-subscription-tier') ?? 'buddy';

    // Check if user has access to detailed job information
    if (!checkSubscription(tier)) {
      return NextResponse.json({
        locked: true,
        message: 'Upgrade je abonnement om volledige vacature details te zien.',
        requiredTier: 'coach',
        currentTier: tier
      });
    }

    // Get user from Supabase for additional context
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Mock detailed job data - later fetch from Supabase
    const jobDetails = {
      id,
      title: 'Software Engineer',
      company: 'TechCorp International',
      location: 'Berlin, Germany',
      salary: '€60,000 - €80,000',
      description: `
        We zoeken een ervaren Software Engineer om ons groeiende team te versterken. 
        Je werkt aan innovatieve projecten en helpt ons platform te verbeteren.
        
        **Wat je gaat doen:**
        - Ontwikkelen van schaalbare web applicaties
        - Samenwerken met cross-functionele teams
        - Code reviews en technische documentatie
        - Mentoring van junior developers
        
        **Wat we zoeken:**
        - 3+ jaar ervaring met React/Node.js
        - Kennis van cloud technologieën (AWS/Azure)
        - Ervaring met agile development
        - Sterke communicatieve vaardigheden
      `,
      requirements: [
        '3+ jaar ervaring met moderne JavaScript frameworks',
        'Ervaring met React, Node.js, en TypeScript',
        'Kennis van cloud platforms (AWS, Azure, of GCP)',
        'Ervaring met databases (PostgreSQL, MongoDB)',
        'Sterke probleemoplossende vaardigheden',
        'Goede communicatieve vaardigheden in Engels'
      ],
      benefits: [
        'Competitief salaris (€60k-€80k)',
        'Flexibele werktijden en remote work',
        'Laptop en thuiswerk setup',
        'Leer- en ontwikkelingsbudget (€2000/jaar)',
        '25 vakantiedagen per jaar',
        'Pensioenregeling en zorgverzekering',
        'Fitness abonnement en wellness programma'
      ],
      companyInfo: {
        name: 'TechCorp International',
        size: '50-200 werknemers',
        industry: 'Software Development',
        website: 'https://techcorp.com',
        description: 'TechCorp is een snelgroeiende tech startup die innovatieve software oplossingen ontwikkelt voor bedrijven wereldwijd.'
      },
      applicationProcess: {
        steps: [
          'CV en motivatiebrief indienen',
          'Eerste gesprek met HR (30 min)',
          'Technische assessment (1 uur)',
          'Gesprek met het team (45 min)',
          'Finale beslissing binnen 1 week'
        ],
        estimatedTime: '2-3 weken',
        contactPerson: 'Sarah Johnson (HR Manager)',
        email: 'careers@techcorp.com'
      },
      tier: tier,
      unlockedAt: new Date().toISOString()
    };

    return NextResponse.json(jobDetails);

  } catch (error) {
    console.error('Job details API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
