---
title: "DNS 泄漏是什么？怎么检测和解决机场 DNS 泄漏"
description: "开了代理，DNS 查询却还在走本地运营商，这就是 DNS 泄漏，可能导致访问异常、AI 服务风控。本文介绍 DNS 泄漏的原因、检测方法，以及在 Clash、v2rayN、手机端的解决办法。"
category: "常见问题"
tags: ["DNS 泄漏", "DNS", "隐私", "TUN 模式", "ChatGPT"]
publishedAt: 2026-10-02
updatedAt: 2026-10-02
draft: false
relatedArticles: ["tun-mode-explain", "chatgpt-access-denied", "global-vs-rule-mode"]
author: "机场 Pro 编辑部"
---

**一句话：** DNS 泄漏是指你访问境外网站时，**域名解析请求没有经过代理，而是发给了本地运营商的 DNS**。这样一来，运营商能看到你访问了哪些网站，部分服务也可能因为“IP 和 DNS 地区不一致”而触发风控。

## 为什么会泄漏？

- 只开了**系统代理**，某些软件自己做 DNS 解析，不经过代理；
- 浏览器开启了“安全 DNS / DoH”，指向了国内 DNS 服务；
- 客户端的 DNS 设置不当（例如没有开启 fake-ip 或远程 DNS）；
- 使用了 IPv6，而代理只接管了 IPv4。

## 如何检测？

1. 连接代理，选择一个境外节点；
2. 用浏览器打开 DNS 泄漏检测网站（如 [BrowserLeaks DNS 测试](https://browserleaks.com/dns)、[dnsleaktest.com](https://www.dnsleaktest.com/)），运行“扩展测试”；
3. 查看结果中列出的 DNS 服务器：
   - 全部是境外节点所在地区或公共 DNS（如 Cloudflare、Google）→ **没有泄漏**；
   - 出现中国电信、联通、移动等国内运营商 → **存在泄漏**。

## 怎么解决？

**Clash Verge Rev（mihomo 内核）：**
- 开启 [TUN 模式](/tutorials/tun-mode-explain/)，DNS 由客户端接管；
- 在设置中确认 DNS 使用 fake-ip 模式（多数机场订阅已默认配置）。

**v2rayN：**
- 开启 TUN，或在 DNS 设置中为境外域名配置远程 DNS。

**浏览器：**
- Chrome / Edge：设置 → 隐私和安全 → 使用安全 DNS，关闭或改为“使用当前服务提供商”，让代理客户端统一处理。

**IPv6：**
- 如果检测到泄漏来自 IPv6，可以在客户端开启 IPv6 支持，或在系统中临时关闭 IPv6。

**手机端：**
- Shadowrocket、Clash Meta for Android 以 VPN 方式工作，一般不容易泄漏；如仍有问题，在客户端 DNS 设置中改用加密 DNS。

## 需要在意吗？

普通浏览网页影响不大；但如果你使用 ChatGPT、Claude 等对风控敏感的服务，或在意隐私，建议排查一次。相关问题见 [ChatGPT 提示无法访问怎么办](/tutorials/chatgpt-access-denied/)。

相关阅读：[TUN 模式是什么](/tutorials/tun-mode-explain/) ｜ [2026 机场推荐](/)
