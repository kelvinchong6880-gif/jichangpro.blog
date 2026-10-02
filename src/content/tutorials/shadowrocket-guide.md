---
title: "Shadowrocket 小火箭使用教程：iPhone 下载、导入机场订阅与分流设置"
description: "Shadowrocket（小火箭）是 iPhone / iPad 上最常用的代理客户端。本文讲解如何获取小火箭（需要非中国大陆区 Apple ID）、导入机场订阅、选择节点、设置“配置”分流模式，以及常见问题。"
category: "客户端设置"
tags: ["Shadowrocket", "小火箭", "iOS", "iPhone", "客户端教程"]
publishedAt: 2026-10-02
updatedAt: 2026-10-02
draft: false
relatedArticles: ["global-vs-rule-mode", "update-subscription-error", "node-timeout-fix"]
author: "机场 Pro 编辑部"
---

**一句话说明：** Shadowrocket（俗称“小火箭”）是 iOS 上的付费代理客户端，支持 Shadowsocks、VMess、VLESS、Trojan、Hysteria2 等协议，可以直接导入机场订阅。本站收录的机场都支持它。

## 第一步：获取 Shadowrocket

Shadowrocket 在中国大陆区 App Store 已下架，需要使用**其他地区的 Apple ID**（如美国、香港、日本区）在 App Store 购买，价格为一次性付费（以当地商店显示为准）。

- 如果你自己有境外 Apple ID，直接登录 App Store 搜索 “Shadowrocket” 购买即可（[美区 App Store 页面](https://apps.apple.com/us/app/shadowrocket/id932747118)，美区售价 $2.99）。
- 部分机场会提供“共享 Apple ID”，**注意只在 App Store 里登录，千万不要在系统设置的 iCloud 中登录别人的账号**，否则可能被远程锁机。
- 认准开发者为 Shadow Launch Technology Limited，警惕名字相似的仿冒应用。

## 第二步：复制订阅链接

登录机场官网后台，找到 **Shadowrocket 订阅** 或 **通用订阅**，点击复制。很多机场还提供“一键导入 Shadowrocket”按钮，在 iPhone 浏览器中点击即可自动跳转导入。

## 第三步：导入订阅

1. 打开小火箭，点击首页右上角的 **“+”**。
2. “类型”选择 **Subscribe（订阅）**。
3. “URL”粘贴订阅链接，“备注”可填机场名称，点击右上角 **完成**。
4. 首页会出现订阅分组和节点列表。

## 第四步：选择节点并连接

1. 点击首页底部的 **连通性测试**，查看各节点延迟。
2. 点击选择一个延迟较低的节点（节点前出现黄点表示已选中）。
3. 打开顶部 **未连接** 右侧的开关。首次连接时，系统会提示“添加 VPN 配置”，点 **允许** 并验证密码或面容。
4. 状态栏出现 **VPN** 图标即连接成功。

## 第五步：设置全局路由

首页 **全局路由** 建议选择 **配置**：按配置文件中的规则分流，国内网站直连、境外网站走代理。

- **配置**：日常使用，最推荐；
- **代理**：所有流量走代理（相当于全局模式），排查问题时临时使用；
- **直连**：所有流量都不走代理。

在 **配置** 页面中，可以点击默认配置 → **更新**，获取最新的规则。详见 [规则模式和全局模式的区别](/tutorials/global-vs-rule-mode/)。

## 第六步：设置订阅自动更新

在 **设置 → 订阅** 中开启 **打开时更新** 或 **自动后台更新**，这样机场更换节点后不需要手动更新。

## 常见问题

**连接成功但网页打不开？** 先换一个节点；再检查订阅是否过期、流量是否用完；最后在首页下拉刷新订阅。参考 [节点超时怎么办](/tutorials/node-timeout-fix/)。

**订阅更新失败？** 见 [订阅更新失败怎么办](/tutorials/update-subscription-error/)。

**耗电明显增加？** 在“配置”模式下使用，避免长期开着“代理”模式；不用时可以关掉连接。

## 相关阅读

- 电脑端：[Clash Verge Rev 使用教程](/tutorials/clash-verge-rev-guide/)
- 还没买机场？看看 [2026 机场推荐](/)
