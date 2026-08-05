'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { supabase } from '@/lib/supabase';

const NAME_MAX = 120;
const EMAIL_MAX = 254;
const MESSAGE_MAX = 3000;

// RFC-5322-ish, practical email check (client-side UX only — the real
// guard is the server-side constraint in schema.sql + Supabase's
// parameterized queries, which is what actually stops injection).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(input: string) {
  // Strip control characters and collapse excess whitespace. This is
  // defence-in-depth for display purposes — it is NOT what prevents SQL
  // injection. Supabase's client library sends values as bound query
  // parameters (never string-concatenated SQL), so injection isn't
  // possible through this form regardless of what's typed here.
  return input.replace(/[\u0000-\u001F\u007F]/g, '').trim();
}

export default function ContactForm() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function validate(name: string, email: string, message: string, honeypot: string) {
    const next: Record<string, string> = {};

    if (honeypot) {
      // Hidden field — a human never fills this in. If it's set, silently
      // drop the submission instead of telling the bot why.
      return { _bot: 'blocked' };
    }

    if (!name || name.length < 2) next.name = 'Please enter your name.';
    else if (name.length > NAME_MAX) next.name = `Name must be under ${NAME_MAX} characters.`;

    if (!email) next.email = 'Please enter your email address.';
    else if (email.length > EMAIL_MAX || !EMAIL_REGEX.test(email)) next.email = 'Please enter a valid email address.';

    if (!message || message.length < 5) next.message = 'Please enter a message (at least 5 characters).';
    else if (message.length > MESSAGE_MAX) next.message = `Message must be under ${MESSAGE_MAX} characters.`;

    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const form = e.currentTarget;
    const name = sanitize((form.elements.namedItem('name') as HTMLInputElement).value);
    const email = sanitize((form.elements.namedItem('email') as HTMLInputElement).value).toLowerCase();
    const message = sanitize((form.elements.namedItem('message') as HTMLTextAreaElement).value);
    const honeypot = (form.elements.namedItem('company') as HTMLInputElement).value;

    const validationErrors = validate(name, email, message, honeypot);

    if (validationErrors._bot) {
      // Pretend it worked so the bot moves on; nothing is sent.
      setStatus('sent');
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('sending');

    if (supabase) {
      // supabase-js sends `name`/`email`/`message` as bound parameters to
      // PostgREST — never interpolated into a SQL string — so this call
      // cannot be used for SQL injection. Row Level Security additionally
      // restricts this to INSERT-only for anonymous visitors (see
      // schema.sql), and a CHECK constraint enforces the same length/
      // format rules server-side in case this form is bypassed entirely.
      const { error } = await supabase.from('messages').insert({ name, email, message });

      if (error) {
        setFormError('Something went wrong sending your message. Please try again.');
        setStatus('idle');
        return;
      }
    }

    setStatus('sent');
    form.reset();
  }

  if (status === 'sent') {
    return <p className="rounded border border-gold/40 bg-gold/5 px-6 py-5 text-ink">{t('formSuccess')}</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from real users via CSS, off-screen for screen
          readers via tabIndex/aria-hidden. Bots that auto-fill every field
          will fill this one too, and get silently rejected above. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-ink/60">{t('formName')}</label>
        <input
          name="name"
          required
          maxLength={NAME_MAX}
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          className="w-full border-b border-ink/20 bg-transparent py-2 outline-none focus:border-gold"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-ink/60">{t('formEmail')}</label>
        <input
          type="email"
          name="email"
          required
          maxLength={EMAIL_MAX}
          autoComplete="email"
          inputMode="email"
          aria-invalid={Boolean(errors.email)}
          className="w-full border-b border-ink/20 bg-transparent py-2 outline-none focus:border-gold"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-widest2 text-ink/60">{t('formMessage')}</label>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={MESSAGE_MAX}
          aria-invalid={Boolean(errors.message)}
          className="w-full border-b border-ink/20 bg-transparent py-2 outline-none focus:border-gold"
        />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message}</p>}
      </div>

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="border border-ink px-8 py-3 text-xs uppercase tracking-widest2 transition hover:border-gold hover:bg-gold hover:text-ink disabled:opacity-50"
      >
        {status === 'sending' ? '…' : t('formSubmit')}
      </button>
    </form>
  );
}
