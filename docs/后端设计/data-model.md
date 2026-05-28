# 数据模型设计

## 📊 模型总览

根据前端代码分析，共需以下核心数据模型：

| 模型 | 说明 | 主表/集合 |
|------|------|-----------|
| Server | 服务器基础信息 | servers |
| ServerMetric | 服务器监控指标 | server_metrics |
| Alert | 告警记录 | alerts |
| Conversation | AI对话记录 | conversations |
| User | 用户管理 | users |
| SystemConfig | 系统配置 | system_configs |

---

## 🖥️ 一、Server（服务器）

### 模型说明

服务器基础信息模型，对应前端 `ServerData` 类型。

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 说明 | 前端对应 |
|------|------|------|--------|------|----------|
| id | int | 是 | auto | 主键 | - |
| name | string(50) | 是 | - | 服务器名称 | name |
| ip | string(15) | 是 | - | IP地址 | ip |
| loc | string(50) | 否 | null | 机房位置 | loc |
| os | string(50) | 是 | - | 操作系统 | os |
| php | string(10) | 否 | null | PHP版本 | php |
| web | string(30) | 否 | null | Web服务器 | web |
| ssh_port | string(10) | 否 | "22" | SSH端口 | ssh_port |
| ram_total | string(20) | 否 | null | 内存总量 | ram_total |
| disk_total | string(20) | 否 | null | 磁盘总量 | disk_total |
| deploy | date | 否 | null | 部署日期 | deploy |
| notes | text | 否 | null | 备注信息 | notes |
| avatar | string(10) | 否 | "🟢" | 显示头像 | avatar |
| avatar_bg | string(10) | 否 | "#EAF3DE" | 头像背景色 | avatarBg |
| avatar_color | string(10) | 否 | "#3B6D11" | 头像文字色 | avatarColor |
| status | enum | 是 | "offline" | 状态: online/warn/offline | status |
| is_active | boolean | 是 | true | 是否激活 | - |
| created_at | timestamp | 是 | now | 创建时间 | - |
| updated_at | timestamp | 是 | now | 更新时间 | - |

### 虚拟字段（计算属性）

| 字段 | 说明 | 计算逻辑 |
|------|------|----------|
| cpu_pct | CPU使用率 | 从最新 metrics 获取 |
| ram_pct | 内存使用率 | 从最新 metrics 获取 |
| disk_pct | 磁盘使用率 | 从最新 metrics 获取 |
| ram_used | 内存已用 | 从最新 metrics 获取 |
| disk_used | 磁盘已用 | 从最新 metrics 获取 |
| uptime | 运行时间 | 从最新 metrics 获取 |
| domains | 域名数量 | 从关联表统计 |
| ssl_min | SSL最短剩余天数 | 从关联表计算 |
| ssl_warn | SSL是否预警 | ssl_min < 30 |

### JSON 示例

```json
{
  "id": 1,
  "name": "Web-Alpha",
  "ip": "103.12.1.10",
  "loc": "香港 HKG-01",
  "os": "Ubuntu 22.04 LTS",
  "php": "8.2",
  "web": "nginx 1.24",
  "ssh_port": "22",
  "ram_total": "4GB",
  "disk_total": "100GB",
  "deploy": "2024-12-01",
  "notes": "主站前端，运行稳定",
  "avatar": "🟢",
  "avatar_bg": "#EAF3DE",
  "avatar_color": "#3B6D11",
  "status": "online",
  "is_active": true,
  "created_at": "2024-01-01 00:00:00",
  "updated_at": "2024-12-29 10:30:00",
  // 虚拟字段（API响应时动态计算）
  "cpu_pct": 23,
  "ram_pct": 61,
  "disk_pct": 44,
  "ram_used": "2.4GB",
  "disk_used": "44GB",
  "uptime": "47天 12小时",
  "domains": 4,
  "ssl_min": 87,
  "ssl_warn": false
}
```

### 业务规则

1. **name 唯一性**: 服务器名称必须唯一
2. **IP 格式验证**: 必须为标准 IPv4 格式
3. **状态自动更新**: 根据 metrics 数据自动计算
4. **软删除**: 使用 is_active 标记删除，不物理删除

---

## 📈 二、ServerMetric（监控指标）

### 模型说明

服务器实时监控数据，支持时序存储。

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | bigint | 是 | auto | 主键 |
| server_id | int | 是 | - | 关联服务器ID |
| cpu_pct | tinyint | 是 | 0 | CPU使用率 0-100 |
| ram_pct | tinyint | 是 | 0 | 内存使用率 0-100 |
| disk_pct | tinyint | 是 | 0 | 磁盘使用率 0-100 |
| ram_used | string(20) | 否 | null | 内存已用 |
| ram_total | string(20) | 否 | null | 内存总量 |
| disk_used | string(20) | 否 | null | 磁盘已用 |
| disk_total | string(20) | 否 | null | 磁盘总量 |
| load_avg | decimal(4,2) | 否 | null | 平均负载 |
| network_in | bigint | 否 | null | 网络流入(字节) |
| network_out | bigint | 否 | null | 网络流出(字节) |
| processes | int | 否 | null | 进程数 |
| connections | int | 否 | null | 连接数 |
| uptime | string(50) | 否 | null | 运行时长字符串 |
| uptime_seconds | bigint | 否 | null | 运行时长(秒) |
| ssl_min | int | 否 | null | SSL最短剩余天数 |
| domains | int | 否 | null | 域名数量 |
| collected_at | timestamp | 是 | now | 数据采集时间 |
| created_at | timestamp | 是 | now | 记录创建时间 |

### 索引设计

```sql
-- 按服务器和时间查询
CREATE INDEX idx_metrics_server_time ON server_metrics(server_id, collected_at);

-- 按时间范围查询（时序数据）
CREATE INDEX idx_metrics_collected_at ON server_metrics(collected_at);

-- 复合索引（常用查询）
CREATE INDEX idx_metrics_status ON server_metrics(server_id, collected_at, cpu_pct, ram_pct, disk_pct);
```

### 数据保留策略

| 数据精度 | 保留时间 | 处理方式 |
|----------|----------|----------|
| 原始数据 | 7天 | 自动删除或归档 |
| 5分钟聚合 | 30天 | 降采样存储 |
| 1小时聚合 | 90天 | 降采样存储 |
| 1天聚合 | 永久 | 保留统计数据 |

### JSON 示例

```json
{
  "id": 1000001,
  "server_id": 1,
  "cpu_pct": 23,
  "ram_pct": 61,
  "disk_pct": 44,
  "ram_used": "2.4GB",
  "ram_total": "4GB",
  "disk_used": "44GB",
  "disk_total": "100GB",
  "load_avg": 0.45,
  "network_in": 1250000,
  "network_out": 850000,
  "processes": 142,
  "connections": 23,
  "uptime": "47天 12小时",
  "uptime_seconds": 4093200,
  "ssl_min": 87,
  "domains": 4,
  "collected_at": "2024-12-29 10:30:00",
  "created_at": "2024-12-29 10:30:05"
}
```

---

## 🚨 三、Alert（告警）

### 模型说明

服务器告警记录，支持多种告警类型。

### 告警类型枚举

| 类型 | 代码 | 说明 |
|------|------|------|
| CPU_HIGH | cpu_high | CPU使用率过高 |
| RAM_HIGH | ram_high | 内存使用率过高 |
| DISK_HIGH | disk_high | 磁盘空间不足 |
| DISK_FULL | disk_full | 磁盘已满 |
| SSL_EXPIRING | ssl_expiring | SSL证书即将过期 |
| SSL_EXPIRED | ssl_expired | SSL证书已过期 |
| OFFLINE | offline | 服务器离线 |
| RECOVERY | recovery | 服务恢复 |

### 严重程度枚举

| 级别 | 代码 | 阈值条件 |
|------|------|----------|
| CRITICAL | critical | CPU/RAM/Disk >= 85% 或 离线 |
| WARNING | warning | CPU/RAM/Disk >= 70% 或 SSL < 30天 |
| INFO | info | 一般提示信息 |

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int | 是 | auto | 主键 |
| server_id | int | 是 | - | 关联服务器ID |
| type | enum | 是 | - | 告警类型 |
| severity | enum | 是 | - | 严重程度 |
| title | string(100) | 是 | - | 告警标题 |
| message | text | 是 | - | 告警详情 |
| details | json | 否 | null | 扩展信息 |
| status | enum | 是 | "active" | 状态: active/resolved/ignored |
| resolved_at | timestamp | 否 | null | 解决时间 |
| resolved_by | int | 否 | null | 解决人ID |
| notification_sent | boolean | 是 | false | 是否已通知 |
| created_at | timestamp | 是 | now | 创建时间 |
| updated_at | timestamp | 是 | now | 更新时间 |

### JSON 示例

```json
{
  "id": 1,
  "server_id": 2,
  "type": "ssl_expiring",
  "severity": "warning",
  "title": "SSL证书即将过期",
  "message": "服务器 Shop-Gamma 的SSL证书将在23天后过期",
  "details": {
    "ssl_min": 23,
    "domains": ["example.com", "shop.example.com"]
  },
  "status": "active",
  "resolved_at": null,
  "resolved_by": null,
  "notification_sent": true,
  "created_at": "2024-12-29 10:00:00",
  "updated_at": "2024-12-29 10:00:00"
}
```

---

## 💬 四、Conversation（AI对话）

### 模型说明

存储用户与AI员工的对话记录。

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int | 是 | auto | 主键 |
| server_id | int | 是 | - | 关联服务器ID |
| user_id | int | 是 | - | 用户ID |
| session_id | string(50) | 是 | - | 会话标识 |
| role | enum | 是 | - | 角色: user/assistant/system |
| content | text | 是 | - | 消息内容 |
| tokens_used | int | 否 | null | Token消耗 |
| model | string(30) | 否 | null | AI模型版本 |
| is_analysis | boolean | 是 | false | 是否为分析报告 |
| analysis_type | string(20) | 否 | null | 分析类型 |
| metadata | json | 否 | null | 扩展数据 |
| created_at | timestamp | 是 | now | 创建时间 |

### JSON 示例

```json
{
  "id": 1,
  "server_id": 1,
  "user_id": 1,
  "session_id": "sess_abc123",
  "role": "assistant",
  "content": "您好！我是Web-Alpha，正在香港 HKG-01值班...",
  "tokens_used": 256,
  "model": "gpt-4",
  "is_analysis": false,
  "metadata": {
    "suggestions": ["CPU使用率正常", "关注内存趋势"]
  },
  "created_at": "2024-12-29 10:30:00"
}
```

---

## 👤 五、User（用户）

### 模型说明

系统用户管理，支持多角色权限。

### 角色枚举

| 角色 | 代码 | 权限 |
|------|------|------|
| 超级管理员 | super_admin | 所有权限 |
| 管理员 | admin | 管理服务器、查看告警 |
| 运维人员 | operator | 查看、操作服务器 |
| 只读用户 | viewer | 仅查看 |

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int | 是 | auto | 主键 |
| username | string(50) | 是 | - | 用户名（唯一） |
| email | string(100) | 是 | - | 邮箱（唯一） |
| password | string(255) | 是 | - | 加密密码 |
| display_name | string(50) | 否 | null | 显示名称 |
| avatar | string(255) | 否 | null | 头像URL |
| role | enum | 是 | "viewer" | 用户角色 |
| is_active | boolean | 是 | true | 是否激活 |
| last_login_at | timestamp | 否 | null | 最后登录时间 |
| last_login_ip | string(45) | 否 | null | 最后登录IP |
| email_verified_at | timestamp | 否 | null | 邮箱验证时间 |
| created_at | timestamp | 是 | now | 创建时间 |
| updated_at | timestamp | 是 | now | 更新时间 |

---

## ⚙️ 六、SystemConfig（系统配置）

### 模型说明

系统级配置参数。

### 字段定义

| 字段 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| id | int | 是 | auto | 主键 |
| key | string(50) | 是 | - | 配置键（唯一） |
| value | text | 否 | null | 配置值 |
| type | enum | 是 | "string" | 值类型: string/int/bool/json |
| description | text | 否 | null | 配置说明 |
| is_editable | boolean | 是 | true | 是否可编辑 |
| created_at | timestamp | 是 | now | 创建时间 |
| updated_at | timestamp | 是 | now | 更新时间 |

### 预设配置项

| key | 默认值 | 说明 |
|-----|--------|------|
| threshold.cpu.warning | 70 | CPU预警阈值 |
| threshold.cpu.critical | 85 | CPU危险阈值 |
| threshold.ram.warning | 70 | 内存预警阈值 |
| threshold.ram.critical | 85 | 内存危险阈值 |
| threshold.disk.warning | 70 | 磁盘预警阈值 |
| threshold.disk.critical | 85 | 磁盘危险阈值 |
| threshold.ssl.warning_days | 30 | SSL预警天数 |
| refresh_interval | 30 | 前端刷新间隔(秒) |
| ai.enabled | true | 是否启用AI |
| ai.model | gpt-4 | AI模型 |

---

## 🔗 模型关系图

```
┌─────────────────┐     ┌─────────────────────┐     ┌─────────────────┐
│     User        │     │      Server         │     │   SystemConfig  │
├─────────────────┤     ├─────────────────────┤     ├─────────────────┤
│ id (PK)         │─────│ id (PK)             │     │ id (PK)         │
│ username        │     │ name                │     │ key             │
│ email           │     │ ip                  │     │ value           │
│ password        │     │ status              │     │ type            │
│ role            │     │ os                  │     └─────────────────┘
└─────────────────┘     │ ...                 │
                        └─────────────────────┘
                                  │
            ┌─────────────────────┼─────────────────────┐
            │                     │                     │
            ▼                     ▼                     ▼
┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────────────┐
│  ServerMetric       │  │      Alert          │  │   Conversation      │
├─────────────────────┤  ├─────────────────────┤  ├─────────────────────┤
│ id (PK)             │  │ id (PK)             │  │ id (PK)             │
│ server_id (FK)      │  │ server_id (FK)      │  │ server_id (FK)      │
│ cpu_pct             │  │ type                │  │ user_id (FK)        │
│ ram_pct             │  │ severity            │  │ role                │
│ disk_pct            │  │ status              │  │ content             │
│ collected_at        │  │ message             │  │ tokens_used         │
└─────────────────────┘  └─────────────────────┘  └─────────────────────┘
```

---

## 📋 字段命名规范

### 命名规则

1. **表名**: 小写下划线，复数形式
   - ✅ `servers`, `server_metrics`
   - ❌ `server`, `ServerMetrics`

2. **字段名**: 小写下划线
   - ✅ `cpu_pct`, `created_at`
   - ❌ `cpuPct`, `createdAt`

3. **枚举值**: 小写下划线
   - ✅ `online`, `ssl_expiring`
   - ❌ `ONLINE`, `SslExpiring`

4. **外键**: 关联表名_id
   - ✅ `server_id`, `user_id`
   - ❌ `serverId`, `sid`

5. **时间戳**: 动作_at
   - ✅ `created_at`, `updated_at`
   - ❌ `createTime`, `updateTime`

### JSON 序列化

API响应使用 camelCase：

```php
// Laravel 示例
protected $casts = [
    'created_at' => 'datetime:Y-m-d H:i:s',
];

// API 响应自动转换
public function toArray() {
    return [
        'cpuPct' => $this->cpu_pct,  // snake_case -> camelCase
        'createdAt' => $this->created_at,
    ];
}
```

---

*文档版本: v1.0*  
*最后更新: 2024-12-29*
