export type Currency = "USD" | "INR" | "EUR";
export type BillingCycle = "Monthly" | "Annual";

export const CURRENCIES: Record<Currency, { symbol: string; rate: number }> = {
  USD: { symbol: "$", rate: 1 },
  EUR: { symbol: "€", rate: 0.92 }, // Approximate fallback rate
  INR: { symbol: "₹", rate: 83.5 }, // Approximate fallback rate
};

export const REGIONAL_TARIFFS: Record<Currency, number> = {
  USD: 1, // Base
  EUR: 1.05, // 5% additional tariff
  INR: 0.8, // 20% regional discount
};

export const ANNUAL_DISCOUNT_RATE = 0.20; // 20% discount

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  basePriceUsdMonthly: number;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small teams.",
    basePriceUsdMonthly: 29,
    features: [
      "Up to 10,000 requests/mo",
      "Basic Analytics",
      "Community Support",
      "48-hour response time",
    ],
    ctaText: "Start for free",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Advanced tools for scaling businesses.",
    basePriceUsdMonthly: 79,
    popular: true,
    features: [
      "Up to 100,000 requests/mo",
      "Advanced Analytics",
      "Priority Email Support",
      "Custom integrations",
      "12-hour response time",
    ],
    ctaText: "Upgrade to Pro",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Custom solutions for large organizations.",
    basePriceUsdMonthly: 249,
    features: [
      "Unlimited requests",
      "Custom Analytics",
      "24/7 Dedicated Support",
      "SLA 99.99%",
      "1-hour response time",
    ],
    ctaText: "Contact Sales",
  },
];
