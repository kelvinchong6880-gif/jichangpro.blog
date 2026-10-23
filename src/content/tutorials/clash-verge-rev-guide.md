---
title: "Clash Verge Rev 使用教程：Windows / macOS 安装、导入订阅与 TUN 模式"
description: "Clash Verge Rev 是目前 Windows 和 macOS 上最常用的 Clash 图形客户端（Mihomo 内核）。本文从下载、安装、导入机场订阅、选择节点、开启系统代理和 TUN 模式到常见报错，一步步讲清楚。"
category: "客户端设置"
tags: ["Clash Verge Rev", "Clash", "Windows", "macOS", "客户端教程"]
publishedAt: 2026-10-02
updatedAt: 2026-10-23
draft: false
relatedArticles: ["global-vs-rule-mode", "tun-mode-explain", "node-timeout-fix"]
author: "机场 Pro 编辑部"
---

**一句话说明：** Clash Verge Rev 是一款开源的 Clash 图形客户端，内置 [Mihomo（Clash Meta）](https://wiki.metacubex.one/)内核，支持 Windows、macOS 和 Linux，能直接导入机场的 Clash 订阅链接。本站收录的机场都支持它。

> 软件界面会随版本更新略有变化，本文以 2026 年的 2.x 版本为准。

## 第一步：下载与安装

1. 打开项目的 [GitHub Releases 页面](https://github.com/clash-verge-rev/clash-verge-rev/releases)，下载最新版本。**只从官方仓库下载**，网上的“汉化版”“破解版”可能被植入恶意程序。
2. 按系统选择安装包：
   - **Windows**：普通电脑选 `x64` 的 `setup.exe`；Surface 等 ARM 设备选 `arm64`。如果系统缺少 WebView2 组件，选带 WebView2 的版本。Windows 7 已不再支持。
   - **macOS**：M1/M2/M3/M4 芯片选 `aarch64` 的 `.dmg`；Intel 芯片选 `x64`。
3. 安装完成后打开软件。macOS 首次打开如果提示“无法验证开发者”，到“系统设置 → 隐私与安全性”中点“仍要打开”。

## 第二步：复制机场订阅链接

登录机场官网后台，在“仪表盘”或“一键订阅”中找到 **Clash 订阅**（有的机场叫“复制 Clash 订阅链接”），点击复制。

> 订阅链接等于你的账号密码，不要截图发给别人。泄露后请在机场后台“重置订阅”。

## 第三步：导入订阅

1. 在左侧菜单点击 **订阅（Profiles）**。
2. 在顶部输入框粘贴订阅链接，点击 **导入**。
3. 导入成功后，列表里会出现一个订阅卡片，显示已用流量和到期时间。**点击该卡片使其处于选中状态**（只有选中的订阅才会生效）。

导入失败时：检查链接是否完整复制；如果当前网络打不开机场的订阅地址，可以先换手机热点再导入。

## 第四步：选择节点

1. 点击左侧 **代理（Proxies）**。
2. 顶部模式选择 **规则（Rule）**——国内网站直连、境外网站走代理，日常使用最合适。详见 [规则模式和全局模式的区别](/tutorials/global-vs-rule-mode/)。
3. 在“节点选择”或“Proxy”策略组中，点击闪电图标测试延迟，选择一个延迟较低的节点（香港、日本、新加坡通常延迟最低）。

## 第五步：开启代理

在左侧 **设置（Settings）** 中：

- 打开 **系统代理**：浏览器等大多数软件即可走代理。这是最常用、最稳定的方式。
- 需要让游戏、命令行工具、部分不认系统代理的软件也走代理时，再打开 **TUN 模式（虚拟网卡）**。Windows 上首次开启需要按提示安装 **服务模式**，macOS 需要输入系统密码授权。详见 [TUN 模式是什么](/tutorials/tun-mode-explain/)。
- 建议同时打开 **开机自启**，并在“订阅”里给订阅设置自动更新间隔（例如 24 小时）。

打开浏览器访问 Google 或 YouTube，能打开即配置成功。

## 常见问题

**导入后节点全部超时？** 先确认套餐未过期、流量未用完，再点订阅卡片上的刷新按钮更新订阅，并校准电脑时间。完整排查步骤见 [节点超时怎么办](/tutorials/node-timeout-fix/)。

**开了系统代理，国内网站变慢？** 检查是否误选了“全局（Global）”模式，切回“规则”即可。

**和其他代理软件冲突？** 同时运行 v2rayN、其他 Clash 客户端或公司 VPN 时容易互相抢占系统代理，只保留一个。

**TUN 模式开启失败？** Windows 需先安装服务模式并以管理员身份运行；安装了安全软件的电脑可能拦截虚拟网卡驱动，需要放行。

## 相关阅读

- [v2rayN 使用教程](/tutorials/v2rayn-guide/)：Windows 上的另一款常用客户端
- [Shadowrocket 小火箭使用教程](/tutorials/shadowrocket-guide/)：iPhone / iPad 用户
- 还没买机场？看看 [机场综合对比表](/compare/)
