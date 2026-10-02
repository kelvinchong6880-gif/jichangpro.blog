import rss from '@astrojs/rss';
import { siteConfig } from '../config';
import { getPublishedReviews, getPublishedTutorials } from '../utils/data';

/** @param {import('astro').APIContext} context */
export async function GET(context) {
  const [reviews, tutorials] = await Promise.all([getPublishedReviews(), getPublishedTutorials()]);

  const items = [...reviews, ...tutorials]
    .map(post => ({
      title: post.data.title,
      pubDate: post.data.publishedAt,
      description: post.data.description,
      link: `/${post.collection}/${post.id}/`,
    }))
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site ?? siteConfig.url,
    items,
    customData: '<language>zh-cn</language>',
  });
}
