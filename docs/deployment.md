# Cloudflare Pages 部署说明

## 一、当前环境与所需资源
本项目基于 `Astro` 框架构建，全部采用纯静态生成 (`static` mode)，完美适配 Cloudflare Pages。
在部署前，请确保您拥有：
1. **GitHub / GitLab 账号**：用于托管本项目代码。
2. **Cloudflare 账号**：用于接入 Pages 服务。
3. **域名所有权**：需将您拥有的域名接入 Cloudflare 或设置 CNAME 映射至 Pages 分配的子域名。

> ⚠️ 当前项目代码尚未推送至远程仓库（需用户自行完成 `git init` 提交并推送到远端仓库），暂未与真实的 Cloudflare 项目关联。

## 二、部署步骤

### 1. 代码提交流程
运行以下命令初始化并提交代码（已在 `.gitignore` 过滤了 `node_modules` 及各类密钥、临时更新脚本）：
```bash
git init
git add .
git commit -m "feat: 初版网站上线准备"
# 添加远程仓库地址并推送
git remote add origin https://github.com/您的用户名/您的仓库.git
git push -u origin main
```

### 2. Cloudflare Pages 极速配置
1. 登录 Cloudflare 控制台，进入 **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**。
2. 授权 GitHub/GitLab，选中刚才创建的仓库 `jichangpro.blog`。
3. 进入 **Set up builds and deployments**：
   - **Framework preset**: 选择 `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. 点击 **Save and Deploy**，等待 Cloudflare 自动执行构建流程。

### 3. 自定义域名接入
1. 部署成功后，在 Pages 项目设置页面进入 **Custom domains**。
2. 添加您的自定义域名（如 `jichangpro.blog`）。
3. 根据提示，在 Cloudflare DNS 区域添加指向该 Pages 的 CNAME 记录。

## 三、后续更新注意事项
- 任何提交并推送到 `main` 分支的改动，都会自动触发 Cloudflare Pages 的重新构建和缓存刷新。
- 如果需要紧急下线草稿或下线过期机场，修改本地 MD/JSON 后推送即可。
