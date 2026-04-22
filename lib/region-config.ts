export const REGION_CONFIG = {
  "en-IN": { country: "India", city: "Hyderabad", currency: "INR" },
  "te-IN": { country: "India", city: "Hyderabad", currency: "INR" },
  "hi-IN": { country: "India", city: "Hyderabad", currency: "INR" },
  "en-US": { country: "USA", city: "Delaware", currency: "USD" },
  "en-GB": { country: "UK", city: "London", currency: "GBP" },
  "de-DE": { country: "Germany", city: "Berlin", currency: "EUR" },
  "fr-FR": { country: "France", city: "Paris", currency: "EUR" }
} as const;

export type SupportedLocale = keyof typeof REGION_CONFIG;

export const getRegionData = (locale: string) => {
  return REGION_CONFIG[locale as SupportedLocale] || REGION_CONFIG["en-US"];
};

export const formatCurrency = (amount: number, locale: string) => {
  const region = getRegionData(locale);
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: region.currency,
      maximumFractionDigits: 0
    }).format(amount);
  } catch (e) {
    // Fallback if locale/currency combination is unsupported by Intl
    return `${region.currency} ${amount.toLocaleString()}`;
  }
};
