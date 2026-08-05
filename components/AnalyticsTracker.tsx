'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

/**
 * Fire-and-forget first-party pageview logger. Writes into the
 * `page_views` table so the dashboard's Analytics page has real traffic
 * data without needing a third-party script. Safe no-op when Supabase
 * isn't configured yet.
 */
export default function AnalyticsTracker({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('page_views')
      .insert({
        path: pathname,
        locale,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent
      })
      .then(() => {});
  }, [pathname, locale]);

  return null;
}
