"use client";

import { usePathname as useNextPathname, useRouter as useNextRouter } from "next/navigation";

export { Link, locales, localePrefix, redirect } from "./navigation";

export function usePathname() {
  const pathname = useNextPathname();
  if (!pathname) return pathname;
  const cleaned = pathname.replace(/^\/(en-IN|en-US|en-GB|en-AU|en|ar)(\/|$)/, "/");
  return cleaned;
}

export function useRouter() {
  const router = useNextRouter();
  return {
    ...router,
    push: (href: string, options?: any) => {
      const cleanHref = href.replace(/^\/(en-IN|en-US|en-GB|en-AU|en|ar)(\/|$)/, "/");
      router.push(cleanHref === "" ? "/" : cleanHref, options);
    },
    replace: (href: string, options?: any) => {
      const cleanHref = href.replace(/^\/(en-IN|en-US|en-GB|en-AU|en|ar)(\/|$)/, "/");
      router.replace(cleanHref === "" ? "/" : cleanHref, options);
    }
  };
}
