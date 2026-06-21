import type {Metadata} from 'next';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import SectionHeading from '@/components/SectionHeading';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import {getPosts} from '@/sanity/content';

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'blog.page'});
  return {title: t('title')};
}

export default async function BlogPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('blog');
  const posts = await getPosts(locale);

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

  return (
    <>
      <section className="px-5 pb-12 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-8xl">
          <SectionHeading
            eyebrow={t('page.eyebrow')}
            title={t('page.title')}
            intro={t('page.intro')}
          />
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
        <div className="mx-auto max-w-8xl">
          {posts.length === 0 ? (
            <p className="py-16 text-mist">{t('empty')}</p>
          ) : (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post._id} delay={i * 0.06}>
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line">
                      {post.coverUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.coverUrl}
                          alt={post.title}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="media-placeholder absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
                      )}
                    </div>
                    <div className="mt-5">
                      <span className="eyebrow text-mist/70">
                        {fmt(post.publishedAt)}
                      </span>
                      <h2 className="mt-3 text-xl font-medium leading-snug transition-colors group-hover:text-accent">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mist">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-block text-sm text-accent">
                        {t('readMore')} →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
