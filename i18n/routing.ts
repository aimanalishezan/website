import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

// 'bn' is the native language of the studio, 'en' is the international
// audience. Both get their own indexable, hreflang-tagged URLs:
// /bn/... and /en/...
export const routing = defineRouting({
  locales: ['bn', 'en'],
  defaultLocale: 'bn',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
