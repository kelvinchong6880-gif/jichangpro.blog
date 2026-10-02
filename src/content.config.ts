import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const planSchema = z.object({
  name: z.string(),
  currency: z.string(),
  /** 月付 / 年付 / 一次性 */
  cycle: z.string(),
  /** 月付价格；年付小包为 null */
  price: z.number().nullable(),
  /** 年付价格（年付小包或月付套餐的年付价） */
  yearlyPrice: z.number().nullable().optional(),
  /** 流量 GB：月付/年付为每月流量，一次性为总流量 */
  traffic: z.number().nullable(),
  type: z.enum(['monthly_refresh', 'one_time']).optional(),
  /** 标价与说明冲突时填写说明，该套餐不参与计算 */
  conflict: z.string().optional(),
});

const airportCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/airports' }),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    /** 官网宣称的线路/特点（一句话） */
    intro: z.string(),
    /** 编辑点评：适合人群（首页榜单使用） */
    fit: z.string().optional(),
    /** 编辑点评：套餐亮点（首页榜单使用） */
    summary: z.string().optional(),
    website: z.url().nullable(),
    promoLink: z.url().nullable(),
    promoCode: z.string().nullable().optional(),
    promoCodeNote: z.string().nullable().optional(),
    logo: z.object({
      square: z.string().nullable().optional(),
      horizontal: z.string().nullable().optional(),
    }).optional(),
    plans: z.array(planSchema),
    deviceLimit: z.number().nullable(),
    clients: z.array(z.string()),
    tags: z.array(z.string()),
    dataSource: z.string().nullable(),
    priceCheckDate: z.string().nullable(),
    testStatus: z.enum(['tested', 'untested', 'testing']),
    testDateRange: z.string().nullable(),
    testMethod: z.string().nullable(),
    testEvidence: z.string().nullable(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    reviewSlug: z.string().nullable(),
    showStatus: z.boolean(),
    isDemo: z.boolean().default(false),
  }),
});

const tutorialCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    publishedAt: z.date(),
    updatedAt: z.date(),
    draft: z.boolean().default(false),
    author: z.string().default('机场 Pro 编辑部'),
    relatedArticles: z.array(z.string()).default([]),
  }),
});

const reviewCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** 对应 airports 集合中的 id */
    serviceId: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date(),
    draft: z.boolean().default(false),
    author: z.string().default('机场 Pro 编辑部'),
    sources: z.array(z.string()).default([]),
    /** 第三方测评参考：只写摘要并注明来源，不当作本站实测 */
    thirdParty: z.array(z.object({
      source: z.string(),
      url: z.url(),
      date: z.string(),
      summary: z.string(),
    })).default([]),
    testNote: z.string(),
    disclosure: z.string().default('本文可能包含推广链接，通过链接购买我们可能会获得佣金。但这不影响我们的客观评测。'),
  }),
});

export const collections = {
  airports: airportCollection,
  tutorials: tutorialCollection,
  reviews: reviewCollection,
};
