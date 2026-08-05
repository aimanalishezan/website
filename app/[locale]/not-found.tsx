import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="font-display text-4xl">Page not found</h1>
      <Link href="/" className="link-underline mt-8 text-sm uppercase tracking-widest2">
        Back home
      </Link>
    </div>
  );
}
