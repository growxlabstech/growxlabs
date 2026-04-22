import { REGION_CONFIG } from "@/lib/region-config";

export function getCurrency(locale: string) {
  const region = (REGION_CONFIG as any)[locale] || REGION_CONFIG["en-US"];
  
  // Map our region config to the format expected by consumption points
  const symbolMap: Record<string, string> = {
    'INR': '₹',
    'USD': '$',
    'GBP': '£',
    'EUR': '€'
  };

  return {
    symbol: symbolMap[region.currency] || '$',
    code: region.currency
  };
}
