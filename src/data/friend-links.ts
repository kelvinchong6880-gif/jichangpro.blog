/** 友情链接：新增或删除友链只需修改这个列表 */
export interface FriendLink {
  name: string;
  url: string;
  description: string;
}

export const friendLinks: FriendLink[] = [
  { name: '好用机场', url: 'https://haoyongjichang.com/', description: '机场横向评测与推荐排名，覆盖游戏加速、流媒体解锁、商务办公等场景' },
  { name: '机场推荐与网络工具指南', url: 'https://jichangtuijian.pro/', description: '机场套餐资料、机场知识与 Windows / macOS / iPhone / Android 客户端教程' },
  { name: '机场推荐 PRO', url: 'https://jichangtuijianpro.com/', description: '汇总多家机场官方套餐、价格与流量，按性价比、便宜、排行榜等维度筛选' },
  { name: '推荐机场数据库', url: 'https://tuijianjichang.blog/', description: '机场套餐价格、流量与线路资料库，可按 IPLC/IEPL、AI、流媒体等条件筛选' },
  { name: '机场选购笔记', url: 'https://jichangshop.shop/', description: '基于事实的机场套餐收录与避坑指南，按预算和流量需求理性选择' },
];
