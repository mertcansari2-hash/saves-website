'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import {useTransition} from 'react';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchTo(next: string) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, {locale: next});
    });
  }

  return (
    <div
      className="flex items-center gap-1 text-xs font-medium tracking-wide"
      aria-busy={isPending}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1">
          {i > 0 && <span className="text-line">/</span>}
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === locale ? 'true' : undefined}
            className={`uppercase transition-colors ${
              loc === locale
                ? 'text-paper'
                : 'text-mist hover:text-paper'
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
