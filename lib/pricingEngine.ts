import {
  Currency,
  BillingCycle,
  CURRENCIES,
  REGIONAL_TARIFFS,
  ANNUAL_DISCOUNT_RATE,
} from "./pricingConfig";

export interface CalculatePriceParams {
  basePriceUsdMonthly: number;
  currency: Currency;
  billingCycle: BillingCycle;
}

export function calculatePrice({
  basePriceUsdMonthly,
  currency,
  billingCycle,
}: CalculatePriceParams): number {
  if (basePriceUsdMonthly === 0) return 0;

  const rate = CURRENCIES[currency].rate;
  const tariff = REGIONAL_TARIFFS[currency];
  
  // Base x Currency Rate x Regional Tariff
  let finalPrice = basePriceUsdMonthly * rate * tariff;

  if (billingCycle === "Annual") {
    // Apply 20% discount
    finalPrice = finalPrice * (1 - ANNUAL_DISCOUNT_RATE);
  }

  // Return rounded to nearest whole number
  return Math.round(finalPrice);
}

export function formatPrice(price: number, currency: Currency): string {
  const symbol = CURRENCIES[currency].symbol;
  // Use Intl.NumberFormat for proper formatting based on currency?
  // We can just use a simple string for this challenge
  return `${symbol}${price.toLocaleString("en-US")}`;
}
