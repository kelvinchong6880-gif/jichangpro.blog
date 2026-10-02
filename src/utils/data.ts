import { getCollection, type CollectionEntry } from 'astro:content';
import { siteConfig } from '../config';

export type AirportData = CollectionEntry<'airports'>['data'];
export type Plan = AirportData['plans'][number];
export type Airport = AirportData & { collectionId: string };

/** 推荐顺序（白名单）：不在列表中的机场不会展示 */
export const recommendationOrder = [
  'sogo',
  'feimao',
  'guangsu',
  'xingdaomeng',
  'ermao',
  'quanqiu',
  'yuzhou',
  'yifan',
  'jilian',
] as const;

const orderIndex = (id: string) => (recommendationOrder as readonly string[]).indexOf(id);

/** 判断套餐是否为“真实月付”（有月付价、按月重置、无资料冲突） */
const isMonthly = (p: Plan): p is Plan & { price: number } =>
  p.type === 'monthly_refresh' && p.cycle === '月付' && p.price !== null && !p.conflict;

/** 根据价格与线路宣称自动补充分类标签（不修改原始数据） */
function deriveTags(data: AirportData): string[] {
  const tags = new Set(data.tags);
  const monthly = data.plans.filter(isMonthly);
  const minMonthly = monthly.length ? Math.min(...monthly.map(p => p.price)) : Infinity;

  if (minMonthly <= 25) tags.add('便宜');
  if (minMonthly > 20 && minMonthly <= 50) tags.add('性价比');
  if (tags.has('专线') || tags.has('BGP优化')) tags.add('稳定');
  return [...tags];
}

let airportsCache: Promise<Airport[]> | null = null;

/** 获取所有可展示的机场（已过滤、排序、补充标签）。构建期间只读取一次。 */
export function getAirports(): Promise<Airport[]> {
  airportsCache ??= (async () => {
    const all = await getCollection('airports');
    return all
      .filter(entry =>
        orderIndex(entry.id) !== -1 &&
        entry.data.showStatus &&
        (siteConfig.isDemoMode || !entry.data.isDemo))
      .map(entry => ({ ...entry.data, tags: deriveTags(entry.data), collectionId: entry.id }))
      .sort((a, b) => orderIndex(a.id) - orderIndex(b.id));
  })();
  return airportsCache;
}

export async function getPublishedTutorials() {
  const all = await getCollection('tutorials');
  return all.filter(entry => !entry.data.draft);
}

export async function getPublishedReviews() {
  const all = await getCollection('reviews');
  return all
    .filter(entry => !entry.data.draft)
    .sort((a, b) => orderIndex(a.data.serviceId) - orderIndex(b.data.serviceId));
}

export interface SimplePlan {
  name: string;
  price: number;
  traffic: number;
}

export interface PlanStats {
  /** 最低真实月付价格 */
  minMonthly: number | null;
  /** 最低月付套餐的流量 */
  entryTraffic: number | null;
  /** 最低月付套餐每 GB 成本 */
  entryPerGb: number | null;
  /** 月付套餐最大月流量 */
  maxTraffic: number | null;
  /** 最低年付价格（含年付小包与月付套餐的年付价） */
  minYearly: number | null;
  /** 最便宜的年付小包（只有年付价的套餐） */
  minYearlySmall: SimplePlan | null;
  /** 最便宜的不限时套餐 */
  minOneTime: SimplePlan | null;
  oneTimeCount: number;
  monthlyPlans: SimplePlan[];
  oneTimePlans: SimplePlan[];
  /** 是否有套餐存在资料冲突 */
  hasConflict: boolean;
}

/** 计算一个机场的套餐统计数据（首页、分类页、对比表、评测页共用） */
export function getPlanStats(airport: Pick<AirportData, 'plans'>): PlanStats {
  const plans = airport.plans.filter(p => !p.conflict);
  const toSimple = (p: Plan, price: number): SimplePlan => ({ name: p.name, price, traffic: p.traffic ?? 0 });

  const monthlyPlans = plans
    .filter(isMonthly)
    .map(p => toSimple(p, p.price))
    .sort((a, b) => a.price - b.price || b.traffic - a.traffic);

  const yearlySmall = plans
    .filter(p => p.type === 'monthly_refresh' && p.price === null && p.yearlyPrice)
    .map(p => toSimple(p, p.yearlyPrice!))
    .sort((a, b) => a.price - b.price);

  const yearlyPrices = plans
    .filter(p => p.type === 'monthly_refresh' && p.yearlyPrice)
    .map(p => p.yearlyPrice!);

  const oneTimePlans = plans
    .filter(p => p.type === 'one_time' && p.price !== null)
    .map(p => toSimple(p, p.price!))
    .sort((a, b) => a.price - b.price);

  const entry = monthlyPlans[0] ?? null;
  const traffic = monthlyPlans.map(p => p.traffic).filter(t => t > 0);

  return {
    minMonthly: entry?.price ?? null,
    entryTraffic: entry?.traffic ?? null,
    entryPerGb: entry && entry.traffic ? entry.price / entry.traffic : null,
    maxTraffic: traffic.length ? Math.max(...traffic) : null,
    minYearly: yearlyPrices.length ? Math.min(...yearlyPrices) : null,
    minYearlySmall: yearlySmall[0] ?? null,
    minOneTime: oneTimePlans[0] ?? null,
    oneTimeCount: oneTimePlans.length,
    monthlyPlans,
    oneTimePlans,
    hasConflict: airport.plans.some(p => !!p.conflict),
  };
}
