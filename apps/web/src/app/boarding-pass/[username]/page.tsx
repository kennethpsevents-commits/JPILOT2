'use client';

import { FC, useState } from 'react';
import { Button } from '@wearejobpilot/ui';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@wearejobpilot/ui';
import { Input } from '@wearejobpilot/ui';

interface Props {
  params: { username: string };
}

const BoardingPass: FC<Props> = ({ params }) => {
  const [copied, setCopied] = useState(false);
  const referralUrl = `https://www.wearejobpilot.com/ref/${params.username}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">🎫</div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Boarding Pass for {params.username}
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-4">
            Share je persoonlijke referral link en verdien 10 dagen premium toegang!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-2">
              🎁 Wat krijg je?
            </h3>
            <ul className="text-green-700 space-y-1">
              <li>• 10 dagen gratis premium toegang</li>
              <li>• Volledige vacature details</li>
              <li>• Direct solliciteren</li>
              <li>• Persoonlijke job aanbevelingen</li>
              <li>• CV en motivatiebrief tools</li>
            </ul>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Jouw referral link:
            </label>
            <div className="flex gap-2">
              <Input
                value={referralUrl}
                readOnly
                className="flex-1"
              />
              <Button
                onClick={handleCopyLink}
                variant={copied ? 'default' : 'outline'}
                className="whitespace-nowrap"
              >
                {copied ? '✓ Gekopieerd!' : 'Kopieer Link'}
              </Button>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="font-semibold text-blue-800 mb-2">
              📱 Hoe deel je?
            </h3>
            <div className="text-blue-700 space-y-2">
              <p>• Deel via WhatsApp, LinkedIn, of email</p>
              <p>• Plaats op je social media</p>
              <p>• Stuur naar vrienden en collega's</p>
              <p>• Elke nieuwe gebruiker = 10 dagen premium!</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => window.open(referralUrl, '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Start je reis naar de perfecte baan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BoardingPass;
