"use client";

import { useState, useMemo } from "react";
import { 
  Currency, 
  BillingCycle, 
  PRICING_PLANS, 
  CURRENCIES,
  ANNUAL_DISCOUNT_RATE
} from "../lib/pricingConfig";
import { calculatePrice, formatPrice } from "../lib/pricingEngine";
import Image from "next/image";

export default function Pricing() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("Monthly");

  // Localized memoization for derived pricing display data
  const pricingData = useMemo(() => {
    return PRICING_PLANS.map(plan => {
      const price = calculatePrice({
        basePriceUsdMonthly: plan.basePriceUsdMonthly,
        currency,
        billingCycle
      });
      return {
        ...plan,
        displayPrice: formatPrice(price, currency),
        priceValue: price,
      };
    });
  }, [currency, billingCycle]);

  return (
    <section id="pricing" className="py-24 bg-[var(--color-nocturnal)] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-[var(--color-oceanic)] rounded-full blur-[120px] opacity-80 pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-in mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--color-arctic)]">
            Simple, transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-forsythia)]">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--color-mint)]">
            No hidden fees. No surprise charges. Choose the plan that fits your scale.
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          {/* Billing Cycle Toggle */}
          <div className="flex items-center p-1 bg-[var(--color-oceanic)] rounded-xl border border-[var(--color-mint)]/20 shadow-inner">
            <button
              onClick={() => setBillingCycle("Monthly")}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-[180ms] ${
                billingCycle === "Monthly" 
                  ? "bg-[var(--color-nocturnal)] text-[var(--color-arctic)] shadow-md" 
                  : "text-[var(--color-mint)] hover:text-[var(--color-arctic)]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("Annual")}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-[180ms] ${
                billingCycle === "Annual" 
                  ? "bg-[var(--color-nocturnal)] text-[var(--color-arctic)] shadow-md" 
                  : "text-[var(--color-mint)] hover:text-[var(--color-arctic)]"
              }`}
            >
              Annual <span className="px-2 py-0.5 rounded-full bg-[var(--color-saffron)]/20 text-[var(--color-saffron)] text-[10px] uppercase tracking-wider">Save {ANNUAL_DISCOUNT_RATE * 100}%</span>
            </button>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-2 bg-[var(--color-oceanic)] p-1 rounded-xl border border-[var(--color-mint)]/20 shadow-inner">
            {(Object.keys(CURRENCIES) as Currency[]).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-[180ms] ${
                  currency === curr
                    ? "bg-[var(--color-nocturnal)] text-[var(--color-arctic)] shadow-md" 
                    : "text-[var(--color-mint)] hover:text-[var(--color-arctic)]"
                }`}
              >
                {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingData.map((plan, idx) => (
            <div 
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-3xl transition-all duration-[350ms] animate-elevate ${
                plan.popular 
                  ? "bg-gradient-to-b from-[var(--color-oceanic)] to-[var(--color-nocturnal)] border-2 border-[var(--color-saffron)] shadow-[0_0_30px_rgba(255,153,50,0.15)] md:-translate-y-4" 
                  : "bg-[var(--color-oceanic)] border border-[var(--color-mint)]/10 hover:border-[var(--color-mint)]/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-forsythia)] text-[var(--color-oceanic)] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--color-arctic)] mb-2">{plan.name}</h3>
                <p className="text-[var(--color-mint)]/80 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="font-mono text-5xl font-bold text-[var(--color-arctic)] tracking-tighter">
                  {plan.displayPrice}
                </span>
                {plan.priceValue > 0 && (
                  <span className="text-[var(--color-mint)] font-medium">/{billingCycle === "Annual" ? "mo" : "mo"}</span>
                )}
              </div>

              {billingCycle === "Annual" && plan.priceValue > 0 && (
                <div className="text-sm text-[var(--color-saffron)] font-medium mb-8">
                  Billed {formatPrice(plan.priceValue * 12, currency)} yearly
                </div>
              )}
              {!(billingCycle === "Annual" && plan.priceValue > 0) && (
                <div className="mb-8 h-5" /> // Spacer
              )}

              <ul className="flex flex-col gap-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Image src="/svg/arrow-trending-up.svg" alt="Check" width={16} height={16} className="filter invert opacity-80" />
                    </div>
                    <span className="text-[var(--color-mint)] text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-[180ms] ${
                  plan.popular 
                    ? "bg-[var(--color-saffron)] text-[var(--color-oceanic)] hover:bg-[var(--color-forsythia)] hover:shadow-lg hover:-translate-y-1" 
                    : "bg-[var(--color-nocturnal)] text-[var(--color-arctic)] border border-[var(--color-mint)]/20 hover:bg-[var(--color-nocturnal)]/80 hover:border-[var(--color-mint)]/40"
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
