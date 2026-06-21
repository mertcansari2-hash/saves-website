'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import LocaleSwitcher from './LocaleSwitcher';

const links = [
  {href: '/', key: 'home'},
  {href: '/work', key: 'work'},
  {href: '/services', key: 'services'},
  {href: '/about', key: 'about'},
  {href: '/contact', key: 'contact'}
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'bg-ink/85 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-8xl items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight"
          aria-label="Saves Dijital"
        >
          saves<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive(link.href)
                    ? 'text-paper'
                    : 'text-mist hover:text-paper'
                }`}
              >
                {t(link.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher />
          <Link
            href="/contact"
            className="rounded-full border border-paper/20 bg-paper px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-accent hover:border-accent"
          >
            {t('cta')}
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? t('close') : t('menu')}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 block h-px w-6 bg-paper transition-all duration-300 ${
                open ? 'top-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 block h-px w-6 bg-paper transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-6 bg-paper transition-all duration-300 ${
                open ? 'top-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-out-expo ${
          open ? 'max-h-[80vh]' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-line px-5 py-6 sm:px-8">
          {links.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-display py-3 text-2xl ${
                isActive(link.href) ? 'text-paper' : 'text-mist'
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="mt-6 flex items-center justify-between">
            <LocaleSwitcher />
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="rounded-full bg-paper px-5 py-2 text-sm font-medium text-ink"
            >
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
