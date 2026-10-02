# 上线前检查清单 (Launch Checklist)

## 1. 内容与数据（每次更新都要做）
- [ ] 核对 9 家机场官网价格，修改 `src/content/airports/*.json` 中的套餐与 `priceCheckDate`。
- [ ] 修改 `src/config.ts` 的 `lastUpdated`（首页、分类页、sitemap 都读取这个日期）。
- [ ] 评测文章更新后，同步修改该文 frontmatter 的 `updatedAt`。
- [ ] 完成实测后，在评测中补充测试日期、测速截图，并更新 `testNote`。

## 2. 草稿规则
- [ ] 模板生成、没有真实内容的教程保持 `draft: true`，写完真实内容再改为 `false`。
- [ ] 已发布教程见 `src/content/tutorials/` 中 `draft: false` 的文件（目前 21 篇）；faq-topic-* 与部分客户端教程仍为草稿。

## 3. 构建检查
- [ ] `npm run build` 无报错。
- [ ] `dist/sitemap-0.xml` 中没有草稿页面和 404。
- [ ] `src/config.ts` 中 `isDemoMode` 为 `false`。

## 4. 上线后（Bing）
- [ ] Bing Webmaster Tools 添加站点并验证（推荐 Cloudflare DNS TXT 验证）。
- [ ] 提交 `https://jichangpro.blog/sitemap-index.xml`。
- [ ] Cloudflare → Caching → Configuration → 打开 Crawler Hints（自动 IndexNow）。
- [ ] Cloudflare → Security → Bots：确认 Bot Fight Mode 不拦截 Bingbot（已验证的搜索引擎爬虫应放行）。
- [ ] 用 Bing Webmaster 的 URL 检查工具测试首页，确认可抓取、结构化数据无错误。
- [ ] 每月在 Bing Webmaster 查看“机场推荐”等核心词的曝光、点击、平均排名。

## 5. 本轮新增文档
- `docs/test-protocol.md`：本站实测流程（测完把截图交给编辑写入评测）
- `docs/backlink-plan.md`：外链与品牌信号计划
- `docs/cn-bing.md`：国内版 Bing 检测与应对
- `docs/github-readme-template.md`：GitHub 仓库 README 模板
