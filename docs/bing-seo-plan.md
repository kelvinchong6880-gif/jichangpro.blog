# Bing SEO 与上线准备计划

本文档规划了本站（机场 Pro）在 Bing Webmaster Tools 的部署、提交及后续排名追踪流程。

## 一、上线前检查 (Pre-launch Checklist)
- [x] **正式域名设置**：确保 `astro.config.mjs` 中的 `site` 属性已配置为正式上线域名（`https://jichangpro.blog`）。
- [x] **Canonical 标签**：检查全局 `<link rel="canonical">` 正常输出绝对路径。
- [x] **Robots 协议**：检查 `public/robots.txt` 已放开爬取，并附带 Sitemap 地址。
- [x] **Sitemap.xml**：检查构建输出的 Sitemap（确保 `draft: true` 的内容被成功拦截）。
- [x] **HTML 内链结构**：所有页面均通过 `<a href="/...">` 正常链接，不存在无意义的死胡同。
- [x] **草稿与未核实验证**：检查未发布草稿是否被过滤出 RSS 和索引。

*当前声明：未正式部署至公网，绝不伪造 Bing 收录、验证代码或承诺排名。*

## 二、上线后收录检查与提交流程
1. **控制台验证**：部署到正式服务器后，获取 Bing Webmaster Tools 的 DNS 或 HTML Tag 验证码并接入。
2. **提交 Sitemap**：向 Bing 提交 `https://jichangpro.blog/sitemap-index.xml`。
3. **IndexNow 配置**：
   - 准备接入 IndexNow API。
   - 建立自动化流程：每当新增内容、更新价格或删除旧套餐时，通过 IndexNow 即时 ping 通知搜索引擎。

## 三、五个核心词的查询与页面表现记录
我们将记录中国大陆市场、桌面/移动设备环境下，以下核心词的搜索表现（*注：平均位置不等同于每次搜索的固定排名*）：
1. **机场推荐** (首页)
2. **便宜机场推荐** (/cheap/)
3. **稳定机场推荐** (/stable/)
4. **性价比机场推荐** (/value/)
5. **机场综合对比表** (/compare/)

### 数据复查流程
- 根据 Bing Webmaster Tools 中的 **曝光(Impressions)**、**点击(Clicks)**、**CTR(点击率)** 及时分析。
- 高曝光低点击：检查 `title` 与 `description` 是否具有吸引力，或是否准确击中搜索意图。
- 排名下降：检查内容时效性（如“2026年”），补充真实测试、可核验的资料或进一步细化判断方法。

## 四、SEO 底线纪律
- **不承诺排名前五**：搜索排名受多种动态因素影响。
- **不采用黑帽手法**：坚决禁止购买垃圾外链、刷点击、使用隐藏文字或生成批量同义词门页。
- **核心竞争力**：致力于积累真实测试、可核验资料、清楚的判断说明以及保持定期的页面维护。

## 五、Bing 验证与提交步骤指南 (用户需执行)

### 1. Bing Webmaster Tools 验证
由于当前尚未接入域名，您需在部署后自行前往 [Bing Webmaster Tools](https://www.bing.com/webmasters/)：
- 添加站点：输入 `https://jichangpro.blog`。
- 验证身份：推荐使用 **DNS 验证**（将提供的 TXT 记录添加到您的 Cloudflare DNS 设置中）或下载 `BingSiteAuth.xml` 放在 `public/` 目录下重新部署。
*（本站暂未生成虚假的 BingSiteAuth 文件）*

### 2. 提交 Sitemap
- 验证成功后，在左侧导航栏选择 **Sitemaps** -> **Submit sitemap**。
- 填入地址：`https://jichangpro.blog/sitemap-index.xml`

### 3. IndexNow 接入步骤
- 在 Bing Webmaster Tools 或 Cloudflare 中启用 IndexNow。
- 如果在 Cloudflare 中启用：进入对应域名控制台的 **Caching** -> **Configuration**，打开 **Crawler Hints** 即可利用 Cloudflare 的网络自动通知 Bing 和 Yandex 页面更新。
- *当前并未生成假的 IndexNow API Key 文件。*
