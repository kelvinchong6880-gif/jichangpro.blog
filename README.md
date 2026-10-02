# 机场 Pro (jichangpro.blog)

面向中国用户的机场推荐与综合对比导航站，基于 Astro 构建的纯静态极速网站。

## 本地开发与启动

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发服务器：
   ```bash
   npm run dev
   ```
3. 访问 `http://localhost:4321` 预览效果。

## 项目构建
```bash
npm run check   # 类型检查（提交前建议运行）
npm run build   # 构建，静态文件生成在 dist 目录
```

## 目录结构
- `src/config.ts`：站点名称、域名、**最后更新日期 lastUpdated**
- `src/content/`：机场数据（JSON）、评测与教程（Markdown）
- `src/utils/data.ts`：数据读取与套餐统计（价格、流量、每 GB 成本）
- `src/utils/schema.ts`：结构化数据（JSON-LD）工具函数
- `src/components/`：页面组件（对比表、FAQ、面包屑、Logo 等）
- `src/styles/global.css`：全站样式与颜色变量
- `public/_headers`：Cloudflare Pages 缓存与安全响应头

## 内容维护
- **机场数据**：修改 `src/content/airports/*.json`（`fit`、`summary` 为首页榜单的编辑点评）
- **评测文章**：修改 `src/content/reviews/*.md`
- **教程文章**：修改 `src/content/tutorials/*.md`

详细说明请参考 `docs/` 目录下的文档：
- `docs/content-guide.md`: 机场、评测与教程的添加步骤
- `docs/tutorial-plan.md`: 50 篇教程规划大纲
- `docs/launch-checklist.md`: 上线前检查清单
- `docs/deployment.md`: 部署指南
