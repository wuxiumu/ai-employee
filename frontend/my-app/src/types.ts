// AI员工办公室 - 数据类型定义

export type ServerStatus = 'online' | 'warn' | 'offline';

export interface ServerData {
  // 基础信息
  name: string;
  ip: string;
  loc?: string;

  // 软件环境
  os: string;
  php?: string;
  web?: string;

  // 性能指标
  cpu_pct: number;
  ram_pct: number;
  disk_pct: number;
  ram_used?: string;
  ram_total?: string;
  disk_used?: string;
  disk_total?: string;

  // 运行状态
  uptime?: string;
  status: ServerStatus;

  // 域名SSL
  domains?: number;
  ssl_min?: number;
  ssl_warn?: boolean;

  // 其他
  ssh_port?: string;
  deploy?: string;
  notes?: string;

  // UI配置
  avatar?: string;
  avatarBg?: string;
  avatarColor?: string;
}

// 状态配置
export const STATUS_CONFIG = {
  online: {
    badgeClass: 'badge-online',
    badgeText: '● 在线',
    screenClass: 'ms-green',
    screenText: '$ ok<br>▮',
    dotColor: '#3B6D11',
  },
  warn: {
    badgeClass: 'badge-warn',
    badgeText: '⚠ 预警',
    screenClass: 'ms-red',
    screenText: 'WARN<br>SSL!',
    dotColor: '#854F0B',
  },
  offline: {
    badgeClass: 'badge-offline',
    badgeText: '● 离线',
    screenClass: 'ms-gray',
    screenText: 'OFFLINE',
    dotColor: '#A32D2D',
  },
};

// 示例服务器数据
export const SERVERS: ServerData[] = [
  {
    name: 'Web-Alpha',
    ip: '103.12.1.10',
    loc: '香港 HKG-01',
    os: 'Ubuntu 22.04 LTS',
    php: '8.2',
    web: 'nginx 1.24',
    cpu_pct: 23,
    ram_pct: 61,
    disk_pct: 44,
    ram_used: '2.4GB',
    ram_total: '4GB',
    disk_used: '44GB',
    disk_total: '100GB',
    uptime: '47天 12小时',
    status: 'online',
    domains: 4,
    ssl_min: 87,
    ssl_warn: false,
    ssh_port: '22',
    deploy: '2024-12-01',
    notes: '主站前端，运行稳定',
    avatar: '🟢',
    avatarBg: '#EAF3DE',
    avatarColor: '#3B6D11',
  },
  {
    name: 'Shop-Gamma',
    ip: '103.12.1.12',
    loc: '新加坡 SGP-02',
    os: 'CentOS 8',
    php: '8.1',
    web: 'nginx 1.22',
    cpu_pct: 78,
    ram_pct: 82,
    disk_pct: 67,
    ram_used: '6.5GB',
    ram_total: '8GB',
    disk_used: '134GB',
    disk_total: '200GB',
    uptime: '12天 6小时',
    status: 'warn',
    domains: 8,
    ssl_min: 23,
    ssl_warn: true,
    ssh_port: '2202',
    deploy: '2024-11-15',
    notes: '电商平台，高峰期负载较高',
    avatar: '⚠️',
    avatarBg: '#FAEED8',
    avatarColor: '#854F0B',
  },
  {
    name: 'DB-Master',
    ip: '192.168.1.50',
    loc: '上海 SHA-01',
    os: 'Debian 12',
    php: '',
    web: '',
    cpu_pct: 45,
    ram_pct: 55,
    disk_pct: 38,
    ram_used: '11GB',
    ram_total: '20GB',
    disk_used: '380GB',
    disk_total: '1TB',
    uptime: '90天 4小时',
    status: 'online',
    domains: 0,
    ssl_min: 365,
    ssl_warn: false,
    ssh_port: '22',
    deploy: '2024-06-01',
    notes: '主数据库服务器，RAID10',
    avatar: '🟢',
    avatarBg: '#EAF3DE',
    avatarColor: '#3B6D11',
  },
  {
    name: 'Cache-Redis',
    ip: '192.168.1.60',
    loc: '上海 SHA-01',
    os: 'Ubuntu 20.04 LTS',
    php: '',
    web: '',
    cpu_pct: 15,
    ram_pct: 89,
    disk_pct: 12,
    ram_used: '7.1GB',
    ram_total: '8GB',
    disk_used: '12GB',
    disk_total: '100GB',
    uptime: '60天 18小时',
    status: 'warn',
    domains: 0,
    ssl_min: 0,
    ssl_warn: false,
    ssh_port: '22',
    deploy: '2024-08-20',
    notes: 'Redis缓存集群节点1',
    avatar: '⚠️',
    avatarBg: '#FAEED8',
    avatarColor: '#854F0B',
  },
  {
    name: 'Legacy-API',
    ip: '103.12.1.15',
    loc: '香港 HKG-02',
    os: 'Ubuntu 18.04 LTS',
    php: '7.4',
    web: 'Apache 2.4',
    cpu_pct: 91,
    ram_pct: 88,
    disk_pct: 92,
    ram_used: '3.5GB',
    ram_total: '4GB',
    disk_used: '92GB',
    disk_total: '100GB',
    uptime: '120天 8小时',
    status: 'offline',
    domains: 2,
    ssl_min: 15,
    ssl_warn: true,
    ssh_port: '2222',
    deploy: '2024-01-10',
    notes: '旧版API服务，计划迁移',
    avatar: '🔴',
    avatarBg: '#FCEBEA',
    avatarColor: '#A32D2D',
  },
  {
    name: 'Backup-NAS',
    ip: '192.168.1.100',
    loc: '本地机房',
    os: 'TrueNAS 13.0',
    php: '',
    web: '',
    cpu_pct: 12,
    ram_pct: 34,
    disk_pct: 76,
    ram_used: '2.7GB',
    ram_total: '8GB',
    disk_used: '7.6TB',
    disk_total: '10TB',
    uptime: '180天 2小时',
    status: 'online',
    domains: 0,
    ssl_min: 120,
    ssl_warn: false,
    ssh_port: '22',
    deploy: '2024-03-01',
    notes: '备份存储，每晚自动同步',
    avatar: '🟢',
    avatarBg: '#EAF3DE',
    avatarColor: '#3B6D11',
  },
];
