'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import dynamic from 'next/dynamic'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

if (typeof window !== 'undefined') {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';
  
  if (key && key !== 'phc_placeholder_key') {
    posthog.init(key, {
      api_host: host,
      person_profiles: 'always', 
      capture_pageview: false, 
    })
  }
}

export function PHProvider({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PostHogProvider>
  )
}
