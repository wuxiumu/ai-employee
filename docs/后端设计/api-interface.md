# API 接口规范

## 📋 接口总览

基于前端代码分析，共需要以下接口：

| 类别 | 接口数 | 说明 |
|------|--------|------|
| 服务器管理 | 5个 | CRUD + 批量操作 |
| 监控数据 | 4个 | 实时数据 + 历史趋势 |
| 统计分析 | 3个 | 状态统计 + 告警统计 |
| AI 服务 | 2个 | 对话 + 分析报告 |
| 系统服务 | 2个 | 健康检查 + 配置 |

**总计: 16个接口**

---

## 🔐 基础信息

### Base URL

```
开发环境: http://localhost:8080/api/v1
生产环境: https://api.example.com/api/v1
```

### 请求头

```http
Content-Type: application/json
Authorization: Bearer {token}
X-Request-ID: {uuid}
```

### 响应格式

```json
{
  "code": 200,
  "message": "success",
  "data": { },
  "timestamp": 1704067200,
  "request_id": "uuid-string"
}
```

---

## 🖥️ 一、服务器管理接口

### 1.1 获取服务器列表

**GET** `/servers`

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | int | 否 | 页码，默认1 |
| per_page | int | 否 | 每页数量，默认20 |
| status | string | 否 | 状态筛选: online/warn/offline |
| search | string | 否 | 名称/IP搜索 |
| sort_by | string | 否 | 排序字段: cpu_pct/ram_pct/disk_pct |
| sort_order | string | 否 | 排序方向: asc/desc |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "servers": [
      {
        "id": 1,
        "name": "Web-Alpha",
        "ip": "103.12.1.10",
        "loc": "香港 HKG-01",
        "os": "Ubuntu 22.04 LTS",
        "php": "8.2",
        "web": "nginx 1.24",
        "cpu_pct": 23,
        "ram_pct": 61,
        "disk_pct": 44,
        "ram_used": "2.4GB",
        "ram_total": "4GB",
        "disk_used": "44GB",
        "disk_total": "100GB",
        "uptime": "47天 12小时",
        "status": "online",
        "domains": 4,
        "ssl_min": 87,
        "ssl_warn": false,
        "ssh_port": "22",
        "deploy": "2024-12-01",
        "notes": "主站前端，运行稳定",
        "avatar": "🟢",
        "avatar_bg": "#EAF3DE",
        "avatar_color": "#3B6D11",
        "created_at": "2024-01-01 00:00:00",
        "updated_at": "2024-12-29 10:30:00"
      }
    ],
    "pagination": {
      "page": 1,
      "per_page": 20,
      "total": 50,
      "total_pages": 3
    }
  },
  "timestamp": 1704067200,
  "request_id": "uuid-string"
}
```

#### 前端调用

```typescript
// services/api.ts
async function fetchServers(params?: ServerListParams): Promise<ServerListResponse>
```

---

### 1.2 获取单个服务器详情

**GET** `/servers/{id}`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "id": 1,
    "name": "Web-Alpha",
    "ip": "103.12.1.10",
    // ... 完整服务器数据
    "metrics": {
      "cpu_trend": [23, 25, 28, 24, 22],
      "ram_trend": [61, 62, 60, 63, 61],
      "disk_trend": [44, 44, 45, 44, 44]
    }
  }
}
```

---

### 1.3 创建服务器

**POST** `/servers`

#### 请求体

```json
{
  "name": "New-Server",
  "ip": "192.168.1.100",
  "loc": "上海 SHA-01",
  "os": "Ubuntu 22.04 LTS",
  "php": "8.2",
  "web": "nginx 1.24",
  "ssh_port": "22",
  "ram_total": "8GB",
  "disk_total": "200GB",
  "notes": "新建服务器"
}
```

#### 响应示例

```json
{
  "code": 201,
  "message": "Server created successfully",
  "data": {
    "id": 51,
    "name": "New-Server",
    // ... 完整数据
  }
}
```

---

### 1.4 更新服务器

**PUT** `/servers/{id}`

#### 请求体

```json
{
  "name": "Web-Alpha-New",
  "loc": "新加坡 SGP-01",
  "notes": "已迁移至新加坡"
}
```

---

### 1.5 删除服务器

**DELETE** `/servers/{id}`

#### 响应示例

```json
{
  "code": 204,
  "message": "Server deleted successfully",
  "data": null
}
```

---

### 1.6 批量更新服务器状态

**POST** `/servers/batch`

#### 请求体

```json
{
  "ids": [1, 2, 3],
  "action": "restart",
  "params": {}
}
```

---

## 📊 二、监控数据接口

### 2.1 获取实时指标

**GET** `/servers/{id}/metrics/realtime`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "server_id": 1,
    "timestamp": "2024-12-29 10:30:00",
    "cpu_pct": 23,
    "ram_pct": 61,
    "disk_pct": 44,
    "load_avg": 0.45,
    "network_in": "1.2MB/s",
    "network_out": "0.8MB/s",
    "processes": 142,
    "connections": 23
  }
}
```

---

### 2.2 获取历史趋势

**GET** `/servers/{id}/metrics/history`

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| metric | string | 是 | 指标: cpu/ram/disk/network |
| period | string | 是 | 周期: 1h/24h/7d/30d |
| interval | string | 否 | 间隔: 1m/5m/1h/1d |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "metric": "cpu",
    "period": "24h",
    "data_points": [
      {
        "timestamp": "2024-12-28 10:30:00",
        "value": 23,
        "unit": "%"
      },
      {
        "timestamp": "2024-12-28 11:30:00",
        "value": 25,
        "unit": "%"
      }
    ],
    "statistics": {
      "avg": 24.5,
      "max": 45,
      "min": 15,
      "current": 23
    }
  }
}
```

---

### 2.3 批量获取服务器指标

**GET** `/metrics/batch`

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| ids | array | 是 | 服务器ID列表 |
| fields | array | 否 | 字段筛选: cpu_pct,ram_pct,disk_pct |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "servers": [
      {
        "id": 1,
        "name": "Web-Alpha",
        "cpu_pct": 23,
        "ram_pct": 61,
        "disk_pct": 44,
        "status": "online"
      }
    ],
    "updated_at": "2024-12-29 10:30:00"
  }
}
```

---

### 2.4 上报监控数据

**POST** `/servers/{id}/metrics`

> 供 Agent 或监控脚本调用

#### 请求体

```json
{
  "cpu_pct": 23,
  "ram_pct": 61,
  "disk_pct": 44,
  "ram_used": "2.4GB",
  "ram_total": "4GB",
  "disk_used": "44GB",
  "disk_total": "100GB",
  "uptime": "47天 12小时",
  "ssl_min": 87,
  "ssl_warn": false,
  "timestamp": "2024-12-29 10:30:00"
}
```

---

## 📈 三、统计分析接口

### 3.1 获取状态统计

**GET** `/statistics/status`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "total": 50,
    "online": 45,
    "warn": 3,
    "offline": 2,
    "by_location": {
      "香港": 20,
      "新加坡": 15,
      "上海": 10,
      "其他": 5
    },
    "by_os": {
      "Ubuntu": 35,
      "CentOS": 10,
      "Debian": 5
    },
    "updated_at": "2024-12-29 10:30:00"
  }
}
```

---

### 3.2 获取资源统计

**GET** `/statistics/resources`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "cpu": {
      "high": 5,
      "medium": 25,
      "low": 20,
      "avg_usage": 35.5
    },
    "ram": {
      "high": 8,
      "medium": 30,
      "low": 12,
      "avg_usage": 62.3
    },
    "disk": {
      "high": 3,
      "medium": 22,
      "low": 25,
      "avg_usage": 48.7
    },
    "alerts": {
      "ssl_expiring": 5,
      "disk_full": 2,
      "high_load": 8
    }
  }
}
```

---

### 3.3 获取告警列表

**GET** `/alerts`

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| status | string | 否 | 状态: active/resolved/all |
| severity | string | 否 | 级别: critical/warning/info |
| page | int | 否 | 页码 |

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "alerts": [
      {
        "id": 1,
        "server_id": 2,
        "server_name": "Shop-Gamma",
        "type": "ssl_expiring",
        "severity": "warning",
        "message": "SSL证书将在23天后过期",
        "details": {
          "ssl_min": 23,
          "domains": ["example.com"]
        },
        "status": "active",
        "created_at": "2024-12-29 10:00:00",
        "resolved_at": null
      }
    ],
    "pagination": {
      "page": 1,
      "per_page": 20,
      "total": 15
    }
  }
}
```

---

## 🤖 四、AI 服务接口

### 4.1 AI 对话

**POST** `/ai/chat`

#### 请求体

```json
{
  "server_id": 1,
  "message": "帮我分析这台服务器的性能",
  "context": [
    {"role": "user", "content": "你好"},
    {"role": "assistant", "content": "您好！我是Web-Alpha..."}
  ],
  "language": "zh"
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "message": "根据当前数据，您的服务器CPU使用率为23%...",
    "suggestions": [
      "CPU使用率正常，无需担心",
      "建议关注内存使用趋势"
    ],
    "actions": [
      {"type": "view_chart", "label": "查看CPU趋势"},
      {"type": "optimize", "label": "获取优化建议"}
    ],
    "conversation_id": "conv-uuid-string",
    "tokens_used": 256
  }
}
```

---

### 4.2 生成分析报告

**POST** `/ai/analysis`

#### 请求体

```json
{
  "server_id": 1,
  "type": "performance",
  "period": "7d"
}
```

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "report_id": "report-uuid-string",
    "type": "performance",
    "summary": "服务器整体运行良好...",
    "findings": [
      {
        "category": "cpu",
        "level": "info",
        "message": "CPU使用率稳定在20-30%",
        "recommendation": "无需特别处理"
      },
      {
        "category": "ssl",
        "level": "warning",
        "message": "SSL证书将在30天内过期",
        "recommendation": "建议提前续期"
      }
    ],
    "recommendations": [
      "定期进行安全更新",
      "设置SSL续期提醒"
    ],
    "created_at": "2024-12-29 10:30:00"
  }
}
```

---

### 4.3 获取对话历史

**GET** `/ai/conversations`

#### 请求参数

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| server_id | int | 否 | 筛选特定服务器 |
| page | int | 否 | 页码 |

---

## 🔧 五、系统服务接口

### 5.1 健康检查

**GET** `/health`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "status": "healthy",
    "service": "AI员工办公室API",
    "version": "1.0.0",
    "timestamp": "2024-12-29 10:30:00",
    "checks": {
      "database": "connected",
      "redis": "connected",
      "ai_service": "available"
    },
    "uptime": "30天 12小时"
  }
}
```

---

### 5.2 获取系统配置

**GET** `/config`

#### 响应示例

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "version": "1.0.0",
    "features": {
      "ai_chat": true,
      "websocket": true,
      "alerts": true
    },
    "thresholds": {
      "cpu_warning": 70,
      "cpu_critical": 85,
      "ram_warning": 70,
      "ram_critical": 85,
      "disk_warning": 70,
      "disk_critical": 85
    },
    "refresh_interval": 30
  }
}
```

---

## 📋 接口汇总表

| 序号 | 接口 | 方法 | 说明 | 前端使用 |
|------|------|------|------|----------|
| 1 | `/servers` | GET | 获取服务器列表 | ✅ 已使用 |
| 2 | `/servers/{id}` | GET | 获取服务器详情 | ✅ DeskUnit点击 |
| 3 | `/servers` | POST | 创建服务器 | ⬜ 管理后台 |
| 4 | `/servers/{id}` | PUT | 更新服务器 | ⬜ 管理后台 |
| 5 | `/servers/{id}` | DELETE | 删除服务器 | ⬜ 管理后台 |
| 6 | `/servers/batch` | POST | 批量操作 | ⬜ 批量管理 |
| 7 | `/servers/{id}/metrics/realtime` | GET | 实时指标 | ✅ 自动刷新 |
| 8 | `/servers/{id}/metrics/history` | GET | 历史趋势 | ✅ AI聊天调用 |
| 9 | `/metrics/batch` | GET | 批量指标 | ✅ 首页加载 |
| 10 | `/servers/{id}/metrics` | POST | 上报数据 | ⬜ Agent使用 |
| 11 | `/statistics/status` | GET | 状态统计 | ✅ 工具栏显示 |
| 12 | `/statistics/resources` | GET | 资源统计 | ⬜ 仪表盘 |
| 13 | `/alerts` | GET | 告警列表 | ⬜ 告警中心 |
| 14 | `/ai/chat` | POST | AI对话 | ✅ 聊天功能 |
| 15 | `/ai/analysis` | POST | 分析报告 | ✅ 优化建议 |
| 16 | `/health` | GET | 健康检查 | ✅ API检测 |

---

## 🔒 认证说明

### JWT Token

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

### Token 获取

**POST** `/auth/login`

```json
{
  "username": "admin",
  "password": "password"
}
```

### Token 刷新

**POST** `/auth/refresh`

```json
{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

## 🚀 开发建议

### 优先级划分

**P0 - 必须实现**
- [ ] GET /servers (列表)
- [ ] GET /servers/{id} (详情)
- [ ] GET /metrics/batch (批量指标)
- [ ] GET /health (健康检查)

**P1 - 核心功能**
- [ ] GET /servers/{id}/metrics/realtime (实时数据)
- [ ] GET /statistics/status (状态统计)
- [ ] POST /ai/chat (AI对话)
- [ ] POST /ai/analysis (分析报告)

**P2 - 增强功能**
- [ ] GET /servers/{id}/metrics/history (历史趋势)
- [ ] GET /alerts (告警列表)
- [ ] GET /statistics/resources (资源统计)

**P3 - 管理功能**
- [ ] POST /servers (创建)
- [ ] PUT /servers/{id} (更新)
- [ ] DELETE /servers/{id} (删除)
- [ ] POST /servers/batch (批量)
- [ ] POST /servers/{id}/metrics (数据上报)

---

*文档版本: v1.0*  
*最后更新: 2024-12-29*
