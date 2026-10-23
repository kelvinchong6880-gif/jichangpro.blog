---
title: "Hysteria2 和 TUIC 是什么？基于 QUIC 的机场节点快在哪里"
description: "Hysteria2 和 TUIC 都是基于 QUIC（UDP）的代理协议，在弱网、高丢包、晚高峰时往往比传统 TCP 协议更快。本文解释它们的原理、优缺点、客户端支持和使用时的注意事项。"
category: "线路与协议"
tags: ["Hysteria2", "TUIC", "QUIC", "UDP", "协议"]
publishedAt: 2026-10-02
updatedAt: 2026-10-23
draft: false
relatedArticles: ["shadowsocks-vs-vmess", "tun-mode-explain", "node-timeout-fix"]
author: "机场 Pro 编辑部"
---

**一句话：** Hysteria2 和 TUIC 都跑在 **QUIC（基于 UDP）** 上。网络丢包多、线路拥堵时，它们通常比 TCP 类协议（SS、VMess、Trojan）更能“跑满带宽”，所以很多机场会把它们作为晚高峰的补充节点。

## 为什么 QUIC 在弱网下更快？

传统 TCP 协议遇到丢包会主动降速，等确认后再慢慢恢复；跨境公网晚高峰丢包率高，速度就会明显下降。

QUIC 把拥塞控制放在应用层：
- **Hysteria2** 采用激进的拥塞控制，丢包时不轻易降速，尽量保持带宽；
- **TUIC** 更注重低延迟和连接复用，0-RTT 握手让建立连接更快。

> Hysteria2 是开源项目，官方文档见 [Hysteria 2 官网](https://v2.hysteria.network/)。

## 两者对比

| 对比 | Hysteria2 | TUIC（v5） |
| --- | --- | --- |
| 底层 | QUIC | QUIC |
| 侧重点 | 弱网下的吞吐量 | 低延迟、连接效率 |
| 伪装 | 可伪装成 HTTP/3 流量 | 依赖 TLS |
| 客户端支持 | 广泛（mihomo、Xray 新版、sing-box、Shadowrocket） | mihomo、sing-box、Shadowrocket 等 |

## 什么时候用 Hysteria2 节点？

- 晚高峰普通节点卡顿、速度掉得厉害时；
- 移动网络或信号不稳定的环境；
- 看 4K 视频、下载大文件需要带宽时。

## 什么时候不适合？

- **UDP 被限制的网络**：部分公司、学校、酒店网络会封锁或限速 UDP，Hysteria2 会连不上；
- **运营商 QoS**：有些地区运营商对大量 UDP 流量限速，夜间可能反而不如 TCP 稳定；
- **非常在意流量的用户**：激进的拥塞控制在丢包环境下会产生更多重传。

遇到连不上的情况，换回同地区的 SS/VLESS/Trojan 节点即可。

## 客户端注意事项

- 需要较新的内核：Clash 用户请使用 mihomo 内核的 [Clash Verge Rev](/tutorials/clash-verge-rev-guide/)，原版 Clash 不支持；
- v2rayN 新版本已支持 Hysteria2；
- 如果开了系统代理但某些软件不走 UDP，可以配合 [TUN 模式](/tutorials/tun-mode-explain/) 使用。

相关阅读：[5 种机场协议的区别](/tutorials/shadowsocks-vs-vmess/) ｜ [节点超时怎么办](/tutorials/node-timeout-fix/)
