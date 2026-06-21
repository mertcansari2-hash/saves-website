import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {setRequestLocale, getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/navigation';
import {getPost, getPostSlugs} from '@/sanity/content';
import PortableBody from '@/components/PortableBody';
import CtaBand from '@/components/CtaBand';

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}): Promise<Metadata> {
  const {slug} = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {title: post.title, description: post.excerpt};
}

export default async function PostPage({
  params
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const {locale, slug} = await params;
  setRequestLocale(locale);

  const post = await getPost(slug);
  // Yazı yoksa veya bu dile ait değilse 404
  if (!post || post.language !== locale) notFound();

  const t = await getTranslations('blog');
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString(locale === 'en' ? 'en-US' : 'tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

  return (
    <>
      <article className="px-5 pt-36 sm:px-8 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="text-sm text-mist transition-colors hover:text-paper"
          >
            ← {t('backToBlog')}
          </Link>

          <div className="mt-8 flex items-center gap-3 text-sm text-mist">
            <span>{fmt(post.publishedAt)}</span>
            {post.author && (
              <>
                <span className="text-line">·</span>
                <span>{post.author}</span>
              </>
            )}
          </div>

          <h1 className="display mt-5 text-4xl leading-tight sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-xl leading-relaxed text-mist">
              {post.excerpt}
            </p>
          )}
        </div>

        {post.coverUrl && (
          <div className="mx-auto mt-12 max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverUrl}
              alt={post.title}
              className="aspect-[16/9] w-full rounded-2xl border border-line object-cover"
            />
          </div>
        )}

        <div className="mx-auto mt-14 max-w-3xl">
          <PortableBody value={post.body} />
        </div>
      </article>

      <div className="mt-20">
        <CtaBand />
      </div>
    </>
  );
}
