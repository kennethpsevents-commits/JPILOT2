'use client';

import { useState } from 'react';
import { Button } from '@wearejobpilot/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@wearejobpilot/ui';
import AIChat from '@/components/ai-chat';

const aiRoles = [
  {
    role: 'buddy' as const,
    title: 'AI Buddy',
    description: 'Je persoonlijke carrière assistent die je helpt bij het vinden van de perfecte baan.',
    features: [
      'Job zoek tips en advies',
      'CV en motivatiebrief feedback',
      'Interview voorbereiding',
      'Carrière planning'
    ],
    color: 'bg-blue-50 border-blue-200',
    icon: '🤖'
  },
  {
    role: 'coach' as const,
    title: 'AI Coach',
    description: 'Een ervaren carrièrecoach die je helpt je doelen te bereiken en te groeien.',
    features: [
      'Strategische carrière planning',
      'Leiderschapsontwikkeling',
      'Netwerk strategieën',
      'Persoonlijke branding'
    ],
    color: 'bg-green-50 border-green-200',
    icon: '🎯'
  },
  {
    role: 'manager' as const,
    title: 'AI Manager',
    description: 'Management expertise voor leidinggevende rollen en team management.',
    features: [
      'Team management strategieën',
      'Project leiderschap',
      'Conflict resolutie',
      'Performance management'
    ],
    color: 'bg-purple-50 border-purple-200',
    icon: '👔'
  },
  {
    role: 'lawyer' as const,
    title: 'AI Lawyer',
    description: 'Juridisch advies voor arbeidsrecht en contractuele kwesties.',
    features: [
      'Arbeidsrecht advies',
      'Contract beoordeling',
      'Rechten en plichten',
      'Juridische documentatie'
    ],
    color: 'bg-red-50 border-red-200',
    icon: '⚖️'
  }
];

export default function AIPage() {
  const [selectedRole, setSelectedRole] = useState<'buddy' | 'coach' | 'manager' | 'lawyer' | null>(null);

  const selectedRoleData = selectedRole ? aiRoles.find(r => r.role === selectedRole) : null;

  if (selectedRole && selectedRoleData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {selectedRoleData.icon} {selectedRoleData.title}
                </h1>
                <p className="text-gray-600 mt-2">
                  {selectedRoleData.description}
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedRole(null)}>
                Terug naar Overzicht
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AIChat
            role={selectedRole}
            title={selectedRoleData.title}
            description={selectedRoleData.description}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              AI Carrière Assistenten
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Kies je AI assistent en krijg gepersonaliseerd carrière advies
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {aiRoles.map((role) => (
            <Card
              key={role.role}
              className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${role.color}`}
              onClick={() => setSelectedRole(role.role)}
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-4">{role.icon}</div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription className="text-sm">
                  {role.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {role.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-4" variant="outline">
                  Start Gesprek
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Overview */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Waarom AI Carrière Assistenten?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Gepersonaliseerd</h3>
              <p className="text-gray-600">
                Elke AI assistent is gespecialiseerd in een specifiek aspect van je carrière.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Beschikbaar</h3>
              <p className="text-gray-600">
                Krijg direct antwoord op je vragen, wanneer je ze hebt.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">Bewezen Effectief</h3>
              <p className="text-gray-600">
                Gebaseerd op best practices en ervaring van duizenden professionals.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Klaar om je carrière te versnellen?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Kies een AI assistent en begin vandaag nog met het bouwen van je droomcarrière.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Start Gratis
          </Button>
        </div>
      </div>
    </div>
  );
}
