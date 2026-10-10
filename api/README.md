# AI员工办公室 - PHP API

## 简介

这是AI员工办公室的PHP后端API，提供服务器监控数据的RESTful接口。

## 快速开始

### 环境要求

- PHP >= 7.4
- Apache/Nginx 或其他支持PHP的Web服务器

### 运行方式

#### 方式1: PHP内置服务器（开发）

```bash
cd api
php -S localhost:8080
```

#### 方式2: Apache/Nginx（生产）

将项目部署到Web服务器，配置指向 `api/` 目录。

### 使用Composer（可选）

```bash
composer install
composer run serve
```

## API接口

### 1. 获取服务器列表

```
GET /api/servers
```

**响应示例：**
```json
{
  "success": true,
  "data": [
    {
      "name": "Web-Alpha",
      "ip": "103.12.1.10",
      "cpu_pct": 23,
      "ram_pct": 61,
      "disk_pct": 44,
      "status": "online",
      ...
    }
  ],
  "timestamp": 1704067200
}
```

### 2. 获取服务器状态统计

```
GET /api/servers/status
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "online": 4,
    "warn": 1,
    "offline": 0,
    "timestamp": "2024-12-01 12:00:00"
  },
  "timestamp": 1704067200
}
```

### 3. 健康检查

```
GET /api/health
```

**响应示例：**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "service": "AI员工办公室API",
    "version": "1.0.0",
    "timestamp": "2024-12-01 12:00:00"
  },
  "timestamp": 1704067200
}
```

## 文件结构

```
api/
├── index.php       # 主入口文件，路由处理
├── composer.json   # Composer配置
└── README.md       # 本文档
```

## 扩展开发

### 添加新接口

在 `index.php` 中添加新的路由case：

```php
case '/api/your-endpoint':
    if ($method === 'GET') {
        yourHandler();
    } else {
        errorResponse(405, 'Method Not Allowed');
    }
    break;
```

### 连接真实数据源

修改 `getServers()` 函数，从数据库或其他监控系统获取数据：

```php
function getServers(): void {
    // 连接数据库
    $pdo = new PDO('mysql:host=localhost;dbname=monitoring', 'user', 'password');
    $stmt = $pdo->query('SELECT * FROM servers');
    $servers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    successResponse($servers);
}
```

## 跨域配置

API已默认配置CORS支持，允许所有域名访问。如需限制，请修改：

```php
header('Access-Control-Allow-Origin: http://your-frontend-domain.com');
```

## 许可证

MIT
