'use client';

import { useState } from 'react';
import { Button } from '@wearejobpilot/ui';

interface FallbackHandlerProps {
  lastMessage: string;
  sessionId?: string;
  onFallback?: (data: any) => void;
}

export default function FallbackHandler({ 
  lastMessage, 
  sessionId = '123',
  onFallback 
}: FallbackHandlerProps) {
  const [handover, setHandover] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [fallbackData, setFallbackData] = useState<any>(null);

  async function checkFallback() {
    setIsChecking(true);
    
    try {
      const res = await fetch('/api/ai/fallback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          sessionId, 
          lastMessage 
        }),
      });

      const data = await res.json();
      
      if (data.fallback) {
        setHandover(data.message);
        setFallbackData(data);
        
        // Call parent callback if provided
        if (onFallback) {
          onFallback(data);
        }
      }
    } catch (error) {
      console.error('Error checking fallback:', error);
    } finally {
      setIsChecking(false);
    }
  }

  if (handover) {
    return (
      <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-2">
          <div className="text-blue-600 text-sm">🔄</div>
          <div className="flex-1">
            <p className="text-sm text-blue-800 font-medium">
              {handover}
            </p>
            {fallbackData?.newPersona && (
              <p className="text-xs text-blue-600 mt-1">
                Je wordt doorverbonden met de {fallbackData.newPersona} AI assistent...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <Button
        onClick={checkFallback}
        disabled={isChecking}
        variant="outline"
        size="sm"
        className="text-xs text-gray-500 hover:text-gray-700"
      >
        {isChecking ? 'Checking...' : 'Check fallback'}
      </Button>
    </div>
  );
}
