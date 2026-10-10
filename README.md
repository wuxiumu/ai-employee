# AI 员工办公室 · ai-employee

> 把服务器/系统监控拟人化成「办公室工位」：每位 AI 员工对应一台机器，气泡汇报 CPU/内存，颜色编码健康度，一键把现场交给 AI 分析。

**定制：** 微信 **qingbao199101**（备注：AI员工监控）｜ [wuxiumu@163.com](mailto:wuxiumu@163.com)

## 事实摘要

- **产品**：拟人化运维可视化面板（单页 HTML 可预览）+ PHP API 骨架 + React/Vite 前端工程。
- **适合**：要做「好看又好讲」的监控大屏、运维演示、内部工具品牌化的团队。
- **交付**：`server_office_interactive.html` 可直接打开；组件文档与架构说明；可按指标源/皮肤/对接 AI 对话定制。
- **不做**：不是完整 APM/Prometheus 替代；默认演示数据为主，生产指标源需对接。

## 能交付什么

| 模块 | 说明 |
|---|---|
| 办公室场景 | SVG 员工 + 工位 + 对话气泡 + 状态徽章（绿/橙/红） |
| 详情弹窗 | 配置、资源、SSL 等卡片化展示 |
| 文档 | `docs/` 实现分析、组件速查、架构图 |
| 工程 | `api/` PHP 入口 · `frontend/my-app` React+Vite 脚手架 |

## 快速预览

```bash
# 直接打开演示页（浏览器）
open server_office_interactive.html

# PHP API（可选）
cd api && php -S localhost:8080 -t .

# React 前端（可选）
cd frontend/my-app && npm install && npm run dev
```


## 环境变量

复制 `.env.example` → `.env`（当前演示页可不配）。

## 冒烟自检

```bash
bash scripts/smoke.sh
```


## 定制合作（可报价）

- 对接真实监控源（Prometheus / 自研心跳 / 云厂商 API）  
- 大屏皮肤白标、多办公室/多集群视图  
- 「一键问 AI」接到你们的模型或客服机器人  
- 嵌入现有运维门户  

## SEO 字段预留（产品页 HTML 统一生成时用）

| 字段 | 用途 |
|---|---|
| `seo_title` | `<title>` / OG title |
| `seo_description` | meta description |
| `canonical_url` | 规范 URL |
| `og_image` | 分享图 |
| `robots` | 如 `index,follow` |
| `json_ld_type` | SoftwareApplication / WebPage / FAQPage |
| `hreflang` | zh-CN / en |
| `site_name` | 白标品牌名 |

> **GEO ≠ 地理定位。** GEO = Generative Engine Optimization（生成式引擎优化）。

## GEO（生成式引擎优化）

### 关键词（中英）

- 中文：AI员工, 服务器监控可视化, 拟人化运维大屏, 办公室监控面板, AI运维演示
- English: AI employee dashboard, anthropomorphic server monitor, ops visualization, office metaphor monitoring

### FAQ

**Q：打开 HTML 就能看效果吗？**  
A：可以。`server_office_interactive.html` 浏览器直接打开即可预览交互。

**Q：能替代 Prometheus/Grafana 吗？**  
A：不能。本项目是展示层与交互隐喻；指标采集需另接。

**Q：如何定制？**  
A：微信 `qingbao199101`，备注「AI员工监控」。

## 定制合作

指标对接、大屏白标、AI 分析入口。加微信备注项目名。

---

## 联系方式

定制、演示或合作：

- 邮箱：[wuxiumu@163.com](mailto:wuxiumu@163.com)
- 微信：**qingbao199101**（添加请备注来意）

### 赞助支持

如果内容对你有帮助，欢迎自愿赞助。

| 微信赞赏码 | 支付宝收款码 |
|---|---|
| ![微信赞赏码](https://chiguashentan-test.oss-cn-beijing.aliyuncs.com/wxprogram/zan/20261002185236_31_227.png) | ![支付宝收款码](https://chiguashentan-test.oss-cn-beijing.aliyuncs.com/wxprogram/zan/20261002185309_32_227.jpg) |

