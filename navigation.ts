import React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { redirect as nextRedirect } from 'next/navigation';

export const locales = ['en', 'en-IN', 'en-US', 'en-GB', 'en-AU'] as const;

export const localePrefix = 'always'; 

export const Link = React.forwardRef<HTMLAnchorElement, React.ComponentPropsWithoutRef<typeof NextLink>>(
  ({ href, ...props }, ref) => {
    let cleanHref = href;
    if (typeof href === 'string') {
      cleanHref = href.replace(/^\/(en-IN|en-US|en-GB|en-AU|en|ar)(\/|$)/, '/');
      if (cleanHref === '') cleanHref = '/';
    }
    return React.createElement(NextLink, { ref, href: cleanHref, ...props });
  }
);
Link.displayName = 'Link';

export const redirect = nextRedirect;
