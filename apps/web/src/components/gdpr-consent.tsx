'use client';

import { useState, useEffect } from 'react';
import { Button } from '@wearejobpilot/ui';
import { Card, CardContent } from '@wearejobpilot/ui';

export default function GdprConsent() {
  const [accepted, setAccepted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted GDPR
    const gdprAccepted = localStorage.getItem('gdpr-accepted');
    if (!gdprAccepted) {
      setShowBanner(true);
    } else {
      setAccepted(true);
    }
  }, []);

  const handleAccept = async () => {
    try {
      // Save to localStorage
      localStorage.setItem('gdpr-accepted', 'true');
      
      // Update user email opt-in in Supabase
      const response = await fetch('/api/user/email-opt-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ optIn: true }),
      });

      if (response.ok) {
        setAccepted(true);
        setShowBanner(false);
      } else {
        console.error('Failed to update email opt-in');
      }
    } catch (error) {
      console.error('Error accepting GDPR:', error);
    }
  };

  const handleDecline = () => {
    localStorage.setItem('gdpr-accepted', 'false');
    setAccepted(true);
    setShowBanner(false);
  };

  if (!showBanner || accepted) {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 bg-cockpit text-white p-4 flex items-center justify-between">
      <p>Ready for takeoff? Buckle up with GDPR consent.</p>
      <button 
        onClick={handleAccept}
        className="rounded bg-success px-4 py-2 font-semibold hover:bg-green-600"
      >
        Accept & Continue
      </button>
    </div>
  );
}
