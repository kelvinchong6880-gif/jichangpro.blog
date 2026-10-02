# 内容维护指南

## 1. 新增/更新机场数据
所有的机场数据存储在 `src/content/airports/` 目录下，为 JSON 格式。

### 必填字段与类型验证
请参考 `src/content/config.ts` 中的严格类型定义。缺失的数据必须设为 `null`，不能写 0，也不能瞎编。
如果某个机场用于演示，设置 `"isDemo": true`。
发布真实机场时，确保 `"showStatus": true` 且 `"isDemo": false`。

## 2. 发布评测与教程
文章存放于 `src/content/tutorials/` 与 `src/content/reviews/`。
- 新增 Markdown 文件，配置 Frontmatter。
- 草稿阶段，将 `draft: true` 设置为开启，此时不会生成静态路由，也不会进入 Sitemap 和搜索索引。
- 发布时，将 `draft: false` 即可。

注意：时间字段 `publishedAt` 与 `updatedAt` 必须真实，不能通过脚本在每次构建时自动刷新。
