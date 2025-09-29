"use client";

import { useABTest } from "@/hooks/useExperiment";
import { useFunnel, FUNNEL_STAGES } from "@/hooks/useFunnel";
import { useEffect } from "react";

export default function PricingPage() {
  const { variant, trackOutcome } = useABTest("pricing_cta_button", "A", "B");
  const { step, complete } = useFunnel();

  useEffect(() => {
    step(FUNNEL_STAGES.PRICING_VIEW, { variant });
  }, [step, variant]);

  const handleUpgradeClick = (tier: string) => {
    step(FUNNEL_STAGES.PRICING_CTA_CLICK, { tier, variant });
    trackOutcome("cta_clicked", { tier, variant });
    
    // Simulate checkout flow
    setTimeout(() => {
      step(FUNNEL_STAGES.CHECKOUT_START, { tier, variant });
    }, 100);
  };

  const ctaText = variant === "A" ? "Upgrade Now" : "Unlock Pro";
  const ctaStyle = variant === "A" 
    ? "bg-sky text-white hover:bg-sky-dark" 
    : "bg-green-500 text-white hover:bg-green-600";

  return (
    <main className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold text-cockpit mb-6">Pricing 💳</h1>
        <p className="text-lg text-slate-700 mb-12">
          {variant === "A" 
            ? "Start for free. Upgrade anytime for advanced AI features. Our pricing is transparent and affordable."
            : "Choose your flight plan. Every pilot needs the right tools to reach their destination."
          }
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="border rounded-xl p-6 shadow hover:shadow-cockpit">
            <h3 className="font-bold text-xl mb-2">Free (Buddy)</h3>
            <p className="mb-4">Basic job search & Buddy AI onboarding.</p>
            <p className="text-2xl font-bold mb-4">€0</p>
            <button 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              onClick={() => handleUpgradeClick("free")}
            >
              Current Plan
            </button>
          </div>
          <div className="border-2 border-sky rounded-xl p-6 shadow-cockpit relative">
            {variant === "B" && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            <h3 className="font-bold text-xl mb-2">Plus (Coach)</h3>
            <p className="mb-4">Full job details, CV tailoring, and coaching tips.</p>
            <p className="text-2xl font-bold mb-4">€9 / mo</p>
            <button 
              className={`w-full px-4 py-2 rounded-lg font-semibold ${ctaStyle}`}
              onClick={() => handleUpgradeClick("plus")}
            >
              {ctaText}
            </button>
          </div>
          <div className="border rounded-xl p-6 shadow hover:shadow-cockpit">
            <h3 className="font-bold text-xl mb-2">Pro (Manager/Lawyer)</h3>
            <p className="mb-4">Advanced tools, legal insights, and priority support.</p>
            <p className="text-2xl font-bold mb-4">€19 / mo</p>
            <button 
              className={`w-full px-4 py-2 rounded-lg font-semibold ${ctaStyle}`}
              onClick={() => handleUpgradeClick("pro")}
            >
              {ctaText}
            </button>
          </div>
        </div>
        
        {variant === "B" && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              ✈️ <strong>Special Offer:</strong> First month 50% off for new pilots!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
