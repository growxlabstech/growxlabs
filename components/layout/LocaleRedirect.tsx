"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/navigation";

export function LocaleRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if we are at the root path without a locale
    const segments = pathname.split("/");
    const currentLocale = segments[1];
    
    // If the first segment is not a valid locale, detect and redirect
    if (!locales.includes(currentLocale as any)) {
      const storedLocale = localStorage.getItem("growx_user_locale");
      const browserLocale = navigator.language;
      
      let targetLocale = "en-US";
      
      if (storedLocale && locales.includes(storedLocale as any)) {
        targetLocale = storedLocale;
      } else if (browserLocale) {
        // Attempt to match browser locale
        if (browserLocale.startsWith("hi")) targetLocale = "hi-IN";
        else if (browserLocale.startsWith("te")) targetLocale = "te-IN";
        else if (browserLocale.includes("IN")) targetLocale = "en-IN";
        else if (browserLocale.includes("GB")) targetLocale = "en-GB";
        else if (browserLocale.includes("DE")) targetLocale = "de-DE";
        else if (browserLocale.includes("FR")) targetLocale = "fr-FR";
      }
      
      // Save it for future visits
      localStorage.setItem("growx_user_locale", targetLocale);
      
      // Perform the redirect to the detected locale
      // Note: In Next.js with next-intl, the middleware usually handles this, 
      // but this client-side check ensures preference persistence.
      if (currentLocale === "") { // Only if we are at / root
         router.replace(`/${targetLocale}`);
      }
    } else {
      // If we are already on a locale-prefixed path, update the preference
      localStorage.setItem("growx_user_locale", currentLocale);
    }
  }, [pathname, router]);

  return null;
}
