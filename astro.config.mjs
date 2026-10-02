import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './src/config.ts';

const siteLastUpdated = siteConfig.lastUpdated;

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
  integrations: [sitemap({
    filter: (page) => !page.includes('demo') && !page.includes('/404'),
    // 每次更新内容后同步修改 src/config.ts 里的 lastUpdated
    lastmod: new Date(`${siteLastUpdated}T00:00:00+08:00`),
    changefreq: 'weekly',
  })],
  trailingSlash: 'always',
  // 鼠标悬停在站内链接上时预加载页面，切换更快
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  build: {
    format: 'directory'
  }
});
