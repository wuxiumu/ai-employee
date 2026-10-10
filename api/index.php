<?php
/**
 * AI员工办公室 - PHP API
 * 
 * 提供服务器数据的REST API接口
 */

// 设置响应头
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// 处理OPTIONS请求（CORS预检）
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// 路由处理
$path = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

// 移除查询字符串
if (($pos = strpos($path, '?')) !== false) {
    $path = substr($path, 0, $pos);
}

// API路由
switch ($path) {
    case '/api/servers':
        if ($method === 'GET') {
            getServers();
        } else {
            errorResponse(405, 'Method Not Allowed');
        }
        break;
        
    case '/api/servers/status':
        if ($method === 'GET') {
            getServerStatus();
        } else {
            errorResponse(405, 'Method Not Allowed');
        }
        break;
        
    case '/api/health':
        healthCheck();
        break;
        
    default:
        errorResponse(404, 'Not Found');
}

/**
 * 获取服务器列表
 */
function getServers(): void {
    $servers = [
        [
            'name' => 'Web-Alpha',
            'ip' => '103.12.1.10',
            'loc' => '香港 HKG-01',
            'os' => 'Ubuntu 22.04 LTS',
            'php' => '8.2',
            'web' => 'nginx 1.24',
            'cpu_pct' => rand(10, 80),
            'ram_pct' => rand(40, 90),
            'disk_pct' => rand(30, 80),
            'ram_used' => '2.4GB',
            'ram_total' => '4GB',
            'disk_used' => '44GB',
            'disk_total' => '100GB',
            'uptime' => '47天 12小时',
            'status' => 'online',
            'domains' => 4,
            'ssl_min' => 87,
            'ssl_warn' => false,
            'ssh_port' => '22',
            'deploy' => '2024-12-01',
            'notes' => '主站前端，运行稳定',
            'avatar' => '🟢',
            'avatarBg' => '#EAF3DE',
            'avatarColor' => '#3B6D11',
        ],
        [
            'name' => 'Shop-Gamma',
            'ip' => '103.12.1.12',
            'loc' => '新加坡 SGP-02',
            'os' => 'CentOS 8',
            'php' => '8.1',
            'web' => 'nginx 1.22',
            'cpu_pct' => rand(60, 95),
            'ram_pct' => rand(70, 95),
            'disk_pct' => rand(50, 85),
            'ram_used' => '6.5GB',
            'ram_total' => '8GB',
            'disk_used' => '134GB',
            'disk_total' => '200GB',
            'uptime' => '12天 6小时',
            'status' => 'warn',
            'domains' => 8,
            'ssl_min' => 23,
            'ssl_warn' => true,
            'ssh_port' => '2202',
            'deploy' => '2024-11-15',
            'notes' => '电商平台，高峰期负载较高',
            'avatar' => '⚠️',
            'avatarBg' => '#FAEED8',
            'avatarColor' => '#854F0B',
        ],
        [
            'name' => 'DB-Master',
            'ip' => '192.168.1.50',
            'loc' => '上海 SHA-01',
            'os' => 'Debian 12',
            'php' => '',
            'web' => '',
            'cpu_pct' => rand(20, 60),
            'ram_pct' => rand(30, 70),
            'disk_pct' => rand(20, 60),
            'ram_used' => '11GB',
            'ram_total' => '20GB',
            'disk_used' => '380GB',
            'disk_total' => '1TB',
            'uptime' => '90天 4小时',
            'status' => 'online',
            'domains' => 0,
            'ssl_min' => 365,
            'ssl_warn' => false,
            'ssh_port' => '22',
            'deploy' => '2024-06-01',
            'notes' => '主数据库服务器，RAID10',
            'avatar' => '🟢',
            'avatarBg' => '#EAF3DE',
            'avatarColor' => '#3B6D11',
        ],
        [
            'name' => 'Cache-Redis',
            'ip' => '192.168.1.60',
            'loc' => '上海 SHA-01',
            'os' => 'Ubuntu 20.04 LTS',
            'php' => '',
            'web' => '',
            'cpu_pct' => rand(10, 40),
            'ram_pct' => rand(70, 95),
            'disk_pct' => rand(5, 20),
            'ram_used' => '7.1GB',
            'ram_total' => '8GB',
            'disk_used' => '12GB',
            'disk_total' => '100GB',
            'uptime' => '60天 18小时',
            'status' => rand(0, 1) ? 'warn' : 'online',
            'domains' => 0,
            'ssl_min' => 0,
            'ssl_warn' => false,
            'ssh_port' => '22',
            'deploy' => '2024-08-20',
            'notes' => 'Redis缓存集群节点1',
            'avatar' => '⚠️',
            'avatarBg' => '#FAEED8',
            'avatarColor' => '#854F0B',
        ],
        [
            'name' => 'Backup-NAS',
            'ip' => '192.168.1.100',
            'loc' => '本地机房',
            'os' => 'TrueNAS 13.0',
            'php' => '',
            'web' => '',
            'cpu_pct' => rand(5, 25),
            'ram_pct' => rand(20, 50),
            'disk_pct' => rand(60, 85),
            'ram_used' => '2.7GB',
            'ram_total' => '8GB',
            'disk_used' => '7.6TB',
            'disk_total' => '10TB',
            'uptime' => '180天 2小时',
            'status' => 'online',
            'domains' => 0,
            'ssl_min' => 120,
            'ssl_warn' => false,
            'ssh_port' => '22',
            'deploy' => '2024-03-01',
            'notes' => '备份存储，每晚自动同步',
            'avatar' => '🟢',
            'avatarBg' => '#EAF3DE',
            'avatarColor' => '#3B6D11',
        ],
    ];
    
    successResponse($servers);
}

/**
 * 获取服务器整体状态统计
 */
function getServerStatus(): void {
    $status = [
        'total' => 5,
        'online' => 4,
        'warn' => 1,
        'offline' => 0,
        'timestamp' => date('Y-m-d H:i:s'),
    ];
    
    successResponse($status);
}

/**
 * 健康检查
 */
function healthCheck(): void {
    successResponse([
        'status' => 'healthy',
        'service' => 'AI员工办公室API',
        'version' => '1.0.0',
        'timestamp' => date('Y-m-d H:i:s'),
    ]);
}

/**
 * 成功响应
 */
function successResponse(array $data): void {
    echo json_encode([
        'success' => true,
        'data' => $data,
        'timestamp' => time(),
    ], JSON_UNESCAPED_UNICODE);
}

/**
 * 错误响应
 */
function errorResponse(int $code, string $message): void {
    http_response_code($code);
    echo json_encode([
        'success' => false,
        'error' => $message,
        'code' => $code,
        'timestamp' => time(),
    ], JSON_UNESCAPED_UNICODE);
}
