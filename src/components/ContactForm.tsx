'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';

export default function ContactForm({formspreeId}: {formspreeId?: string}) {
  const t = useTranslations('contact.form');
  const budgetOptions = t.raw('budgetOptions') as string[];
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>(
    'idle'
  );

  // Hem tam URL'yi hem de sadece ID'yi kabul et
  const formId = (formspreeId || '')
    .trim()
    .replace(/\/+$/, '')
    .split('/')
    .pop();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;

    if (!formId) {
      // Form ID henüz girilmemiş — simülasyon
      setTimeout(() => setStatus('done'), 800);
      return;
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {Accept: 'application/json'},
        body: new FormData(form)
      });
      setStatus(res.ok ? 'done' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const fieldClass =
    'w-full border-b border-line bg-transparent py-3 text-paper placeholder:text-mist/60 focus:border-accent focus:outline-none transition-colors';

  if (status === 'done') {
    return (
      <div className="flex min-h-64 flex-col items-start justify-center rounded-2xl border border-line bg-graphite p-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent text-accent">
          ✓
        </span>
        <p className="mt-6 max-w-md text-lg leading-relaxed">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow">{t('name')}</span>
          <input
            type="text"
            name="name"
            required
            placeholder={t('namePh')}
            className={`mt-2 ${fieldClass}`}
          />
        </label>
        <label className="block">
          <span className="eyebrow">{t('email')}</span>
          <input
            type="email"
            name="email"
            required
            placeholder={t('emailPh')}
            className={`mt-2 ${fieldClass}`}
          />
        </label>
        <label className="block">
          <span className="eyebrow">{t('company')}</span>
          <input
            type="text"
            name="company"
            placeholder={t('companyPh')}
            className={`mt-2 ${fieldClass}`}
          />
        </label>
        <label className="block">
          <span className="eyebrow">{t('budget')}</span>
          <select name="budget" className={`mt-2 ${fieldClass} text-mist`}>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt} className="bg-graphite text-paper">
                {opt}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="eyebrow">{t('message')}</span>
        <textarea
          name="message"
          required
          rows={4}
          placeholder={t('messagePh')}
          className={`mt-2 resize-none ${fieldClass}`}
        />
      </label>

      {status === 'error' && (
        <p className="text-sm text-red-400">{t('required')}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="rounded-full bg-paper px-8 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-accent disabled:opacity-60"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
