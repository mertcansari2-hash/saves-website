import {getLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getServices, getSiteSettings} from '@/sanity/content';
import {pick} from '@/data/types';
import SocialLinks from './SocialLinks';

const navLinks = [
  {href: '/work', key: 'work'},
  {href: '/services', key: 'services'},
  {href: '/blog', key: 'blog'},
  {href: '/about', key: 'about'},
  {href: '/contact', key: 'contact'}
] as const;

export default async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices()
  ]);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-graphite">
      <div className="mx-auto max-w-8xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="font-display text-2xl font-semibold tracking-tight"
            >
              saves<span className="text-accent">.</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist">
              {t('footer.tagline')}
            </p>
            <SocialLinks settings={settings} className="mt-6" />
          </div>

          <div>
            <h3 className="eyebrow mb-5">{t('footer.navHeading')}</h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-mist transition-colors hover:text-paper"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">{t('footer.servicesHeading')}</h3>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s._id} className="text-mist">
                  {pick(s.title, locale)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-5">{t('footer.contactHeading')}</h3>
            <ul className="space-y-3 text-sm text-mist">
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="transition-colors hover:text-paper"
                  >
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.phone && <li>{settings.phone}</li>}
              {settings?.address && <li>{pick(settings.address, locale)}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-line pt-8 text-xs text-mist sm:flex-row sm:items-center">
          <p>
            © {year} Saves Dijital. {t('footer.rights')}
          </p>
          <p className="uppercase tracking-widest">İstanbul · 360°</p>
        </div>
      </div>
    </footer>
  );
}
