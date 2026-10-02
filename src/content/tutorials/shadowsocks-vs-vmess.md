---
title: "Shadowsocks、VMess、VLESS、Trojan、Hysteria2 有什么区别？机场协议一文看懂"
description: "机场节点常见的 Shadowsocks、VMess、VLESS（Reality）、Trojan、Hysteria2 协议各有什么特点？哪个更快、更稳、更抗封锁？本文用通俗语言对比 5 种主流协议，并说明普通用户需不需要关心。"
category: "线路与协议"
tags: ["Shadowsocks", "VMess", "VLESS", "Trojan", "Hysteria2", "协议"]
publishedAt: 2026-10-02
updatedAt: 2026-10-02
draft: false
relatedArticles: ["hysteria2-tuic", "iplc-iepl-difference", "v2rayn-guide"]
author: "机场 Pro 编辑部"
---

**先说结论：** 对大多数用户来说，**协议不是选机场的重点**——线路质量（专线还是直连）和机场的运维水平对体验的影响更大。只要你的客户端支持机场提供的协议即可，订阅导入后客户端会自动识别。

## 5 种主流协议对比

| 协议 | 特点 | 优点 | 缺点 |
| --- | --- | --- | --- |
| Shadowsocks（SS） | 轻量的加密代理，历史最久 | 简单、速度快、几乎所有客户端都支持 | 直连时特征相对容易被识别，多用于中转/专线节点 |
| VMess | V2Ray 的原生协议 | 功能丰富，可配合 WebSocket、TLS 伪装 | 依赖设备时间，时间误差过大会连不上 |
| VLESS（含 Reality） | VMess 的轻量化版本 | 开销小；配合 Reality 可伪装成访问正常网站，抗识别能力强 | 需要较新的客户端（Xray / mihomo / sing-box 内核） |
| Trojan | 伪装成普通 HTTPS 流量 | 特征接近正常网页访问，稳定 | 需要有效的 TLS 证书，配置要求高（由机场负责） |
| Hysteria2 | 基于 QUIC（UDP）的协议 | 弱网、高丢包环境下速度表现好 | 部分网络会限制 UDP；运营商 QoS 可能影响 |

> 想深入了解协议细节，可以看各项目的官方文档：[Shadowsocks](https://shadowsocks.org/)、[Project V（V2Fly）](https://www.v2fly.org/)、[Project X（Xray）](https://xtls.github.io/)、[Hysteria 2](https://v2.hysteria.network/)。

## 为什么同一家机场会有多种协议？

机场通常根据线路类型选择协议：

- **专线/中转节点**：流量在国内入口进入专线，不直接面对公网审查，常用轻量的 Shadowsocks，速度快、开销小；
- **直连节点**：需要更强的伪装，常用 VLESS Reality、Trojan；
- **弱网或晚高峰补充**：提供 Hysteria2 节点，在丢包较多时表现更好。

## 客户端支持情况

| 客户端 | SS | VMess | VLESS Reality | Trojan | Hysteria2 |
| --- | --- | --- | --- | --- | --- |
| Clash Verge Rev（mihomo 内核） | ✓ | ✓ | ✓ | ✓ | ✓ |
| v2rayN（Xray / sing-box） | ✓ | ✓ | ✓ | ✓ | ✓ |
| Shadowrocket | ✓ | ✓ | ✓ | ✓ | ✓ |

> 老版本的 Clash（原版内核，已停止维护）不支持 VLESS 和 Hysteria2。如果导入后部分节点不显示或报错，请更换为 [Clash Verge Rev](/tutorials/clash-verge-rev-guide/) 等使用 mihomo 内核的客户端。

## 普通用户怎么选节点？

1. 先看**地区和延迟**，选离你近、延迟低的节点；
2. 再看**倍率**，日常用 ×1 节点；
3. 某个节点不稳定时，换同地区不同协议的节点试试；
4. 公司或校园网限制 UDP 时，Hysteria2 节点可能连不上，换 TCP 类协议即可。

相关阅读：[Hysteria2 与 TUIC 是什么](/tutorials/hysteria2-tuic/) ｜ [IPLC 和 IEPL 专线的区别](/tutorials/iplc-iepl-difference/)
