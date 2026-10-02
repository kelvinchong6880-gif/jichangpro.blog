import { siteConfig } from '../config';

/** 结构化数据（JSON-LD）工具函数 */

export interface Faq {
  q: string;
  a: string;
}

const siteUrl = siteConfig.url;

export const organizationRef = { '@id': `${siteUrl}/#organization` };

export function organization() {
  return {
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: siteConfig.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}/logo.jpg`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: siteConfig.email,
      availableLanguage: ['zh-CN'],
    },
  };
}

export function faqPage(faqs: Faq[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

interface ArticleInput {
  title: string;
  description: string;
  path: string;
  author: string;
  published: Date;
  updated: Date;
  about?: Record<string, unknown>;
}

export function article(input: ArticleInput) {
  const url = new URL(input.path, siteUrl).toString();
  return {
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url,
    mainEntityOfPage: url,
    inLanguage: 'zh-CN',
    image: `${siteUrl}/og-image.png`,
    author: { '@type': 'Organization', name: input.author, url: `${siteUrl}/about/` },
    publisher: organization(),
    datePublished: toDateString(input.published),
    dateModified: toDateString(input.updated),
    ...(input.about ? { about: input.about } : {}),
  };
}

/** 把多个节点包成一个 @graph */
export function graph(...nodes: (Record<string, unknown> | null | undefined | false)[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

export function toDateString(d: Date) {
  return d.toISOString().split('T')[0];
}
