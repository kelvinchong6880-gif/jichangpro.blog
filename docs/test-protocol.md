# 本站实测流程（每家机场统一执行）

目的：让每篇评测都有可复核的“本站实测”数据，替换掉目前的“第三方测评参考”作为主要依据。

## 一、测试准备
- 每家机场购买**最低档月付**（与普通用户一致）。
- 记录测试环境：所在城市、运营商（电信/联通/移动）、宽带带宽、客户端名称与版本。
- 统一客户端：Windows 用 Clash Verge Rev；手机用 Shadowrocket 或 Clash Meta for Android。

## 二、测试项目与截图（每家至少 5 个晚上）
| 项目 | 方法 | 需要的截图 |
| --- | --- | --- |
| 晚高峰速度 | 20:00–23:00，香港 / 日本 / 新加坡 / 美国各选 1 个节点，用 Speedtest 或 fast.com 测速 | 每个节点 1 张测速结果，画面带时间 |
| YouTube 4K | 播放 4K 视频，打开“详细统计信息” | 1 张统计信息截图（连接速度、丢帧） |
| 延迟稳定性 | 白天和晚高峰各做一次客户端“延迟测试” | 2 张节点列表截图 |
| 流媒体 / AI | 打开 Netflix、ChatGPT，或用 RegionRestrictionCheck 检测 | 1 张检测结果 |
| 订阅导入 | Clash 与 Shadowrocket 各导入一次 | 可选 |

## 三、交给编辑写入评测
把截图按“品牌名/日期/项目”命名（例：`sogo_2026-10-08_hk-speedtest.png`），连同测试环境说明一起发给编辑。
写入评测时：
1. 在评测中新增“本站实测（测试日期：xxxx）”一节，放截图和数据表；
2. 更新 frontmatter 的 `updatedAt` 与 `testNote`；
3. 在 `src/content/airports/<品牌>.json` 中把 `testStatus` 改为 `tested`，填写 `testDateRange` 与 `testMethod`；
4. 第三方测评参考可以保留，但放在本站实测之后。

## 四、原则
- 不修图、不挑最好的一次，取多次结果的范围或中位数。
- 测试失败、超时也如实记录。
- 截图压缩为 webp（宽度 1200px 以内）后放入 `public/images/tests/`。
