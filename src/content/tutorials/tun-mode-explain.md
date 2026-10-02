---
title: "TUN 模式是什么？和系统代理有什么区别，什么时候需要开"
description: "TUN 模式通过创建虚拟网卡接管电脑的全部网络流量，能让不支持系统代理的软件（游戏、命令行、部分客户端）也走代理。本文解释 TUN 与系统代理的区别、开启方法和常见问题。"
category: "客户端设置"
tags: ["TUN 模式", "系统代理", "虚拟网卡", "Clash", "v2rayN"]
publishedAt: 2026-10-02
updatedAt: 2026-10-02
draft: false
relatedArticles: ["clash-verge-rev-guide", "global-vs-rule-mode", "dns-leak-test"]
author: "机场 Pro 编辑部"
---

**一句话：** 系统代理是“告诉软件去走代理”，软件不听就不走；TUN 模式是“在系统层面接管网络”，所有软件的流量都会经过代理客户端，再按规则分流。

## 系统代理 vs TUN 模式

| 对比 | 系统代理 | TUN 模式 |
| --- | --- | --- |
| 原理 | 设置系统 HTTP/SOCKS 代理，软件自愿遵守 | 创建虚拟网卡，在网络层接管流量 |
| 覆盖范围 | 浏览器和大多数常用软件 | 几乎所有软件，包括游戏、命令行、UDP 流量 |
| 权限 | 不需要 | Windows 需要服务模式/管理员，macOS 需要授权 |
| 稳定性 | 高，出问题影响小 | 与安全软件、其他 VPN 可能冲突 |
| DNS | 由软件自行解析 | 由代理客户端接管，防泄漏更好 |

## 什么时候需要开 TUN？

- 游戏客户端、Steam 下载等不认系统代理；
- 命令行工具（git、npm、pip、curl 等）需要走代理；
- 部分 AI 桌面客户端、通讯软件不走系统代理；
- 想避免 [DNS 泄漏](/tutorials/dns-leak-test/)。

日常只用浏览器的话，**系统代理就够了**，不必开 TUN。

## 怎么开启？

**Clash Verge Rev：** 设置 → 打开“TUN 模式（虚拟网卡）”。Windows 首次需要按提示安装服务模式；macOS 输入系统密码授权。详见 [Clash Verge Rev 使用教程](/tutorials/clash-verge-rev-guide/)。

**v2rayN：** 主界面底部勾选“启用 TUN”，需要以管理员身份运行。

**手机端：** Shadowrocket、Clash Meta for Android 本身就是以 VPN（类似 TUN）的方式工作，不需要额外设置。

> 开启 TUN 后，系统代理可以关掉，二者同时开一般也没问题。

## 常见问题

**开启 TUN 后断网？** 关闭 TUN，检查是否有其他 VPN、加速器、安全软件冲突；Windows 上重新安装服务模式后再试。

**开启后国内网站变慢？** 确认代理模式是“规则”而不是“全局”，见 [规则模式和全局模式](/tutorials/global-vs-rule-mode/)。

**公司电脑能开吗？** 公司电脑通常有管理软件和内网 VPN，开 TUN 可能影响内网访问，请遵守公司规定。

相关阅读：[DNS 泄漏怎么检测](/tutorials/dns-leak-test/) ｜ [2026 机场推荐](/)
