# 代码复用指南

本文档提供可复用的代码片段，帮助你快速构建类似的AI员工办公室系统。

---

## 📋 完整最小示例

### 基础版本（3个员工）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI员工办公室</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'JetBrains Mono',monospace;background:#f5f5f5;padding:20px}
        
        .office{background:#f0ede8;border-radius:16px;padding:28px 24px;max-width:900px;margin:0 auto}
        .office-title{font-size:10px;letter-spacing:.14em;color:#888780;text-transform:uppercase;margin-bottom:22px;text-align:center}
        .floor{display:flex;gap:16px;justify-content:center}
        
        .desk-unit{display:flex;flex-direction:column;align-items:center;width:260px;cursor:pointer;transition:transform .2s}
        .desk-unit:hover{transform:translateY(-2px)}
        
        .bubble{background:#fff;border:1.5px solid #d3d1c7;border-radius:12px;padding:10px 12px;font-size:10px;width:200px;margin-bottom:8px}
        .b-name{font-size:11px;font-weight:600;color:#2C2C2A;margin-bottom:4px}
        .b-row{display:flex;align-items:center;gap:6px;margin-top:3px}
        .b-label{color:#888780}
        .b-bar-wrap{flex:1;height:4px;background:#e8e5e0;border-radius:2px;overflow:hidden}
        .b-bar{height:100%;border-radius:2px;transition:.3s}
        .b-val{min-width:32px;text-align:right;font-size:10px}
        .b-ok{color:#3B6D11}
        .b-warn{color:#854F0B}
        .b-red{color:#A32D2D}
        
        .person-svg{width:40px;height:60px;margin:10px 0}
        
        .desk{width:200px;height:40px;background:#cac7c2;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:8px;padding:0 12px}
        .desk-monitor{width:30px;height:22px;background:#2C2C2A;border-radius:3px;display:flex;align-items:center;justify-content:center}
        .monitor-screen{width:22px;height:14px;font-size:6px;display:flex;align-items:center;justify-content:center}
        .ms-green{color:#3dd68c}
        .ms-red{color:#f05060}
        
        .nameplate{background:#2C2C2A;color:#e8e5e0;padding:3px 10px;font-size:9px;border-radius:3px;margin-top:5px}
        .status-badge{font-size:9px;padding:2px 8px;border-radius:99px;margin-top:5px}
        .badge-online{background:#EAF3DE;color:#3B6D11}
        .badge-warn{background:#FAEEDA;color:#854F0B}
        .badge-offline{background:#FCEBEB;color:#A32D2D}
    </style>
</head>
<body>
    <div class="office">
        <div class="office-title">AI员工办公室 · 系统监控</div>
        <div class="floor" id="floor"></div>
    </div>

    <script>
        const SERVERS = [
            { name: 'Web-01', cpu: 23, ram: 45, disk: 30, status: 'online' },
            { name: 'API-02', cpu: 78, ram: 82, disk: 65, status: 'warn' },
            { name: 'DB-03', cpu: 45, ram: 60, disk: 88, status: 'warn' },
        ];

        function barColor(pct) {
            if (pct >= 85) return '#A32D2D';
            if (pct >= 70) return '#854F0B';
            return '#3B6D11';
        }

        function valClass(pct) {
            if (pct >= 85) return 'b-red';
            if (pct >= 70) return 'b-warn';
            return 'b-ok';
        }

        function getBadgeClass(status) {
            return `badge-${status}`;
        }

        function renderServers() {
            const floor = document.getElementById('floor');
            
            SERVERS.forEach((s, idx) => {
                const unit = document.createElement('div');
                unit.className = 'desk-unit';
                unit.innerHTML = `
                    <div class="bubble">
                        <div class="b-name">${s.name}</div>
                        <div class="b-row">
                            <span class="b-label">CPU</span>
                            <div class="b-bar-wrap"><div class="b-bar" style="width:${s.cpu}%;background:${barColor(s.cpu)}"></div></div>
                            <span class="b-val ${valClass(s.cpu)}">${s.cpu}%</span>
                        </div>
                        <div class="b-row">
                            <span class="b-label">内存</span>
                            <div class="b-bar-wrap"><div class="b-bar" style="width:${s.ram}%;background:${barColor(s.ram)}"></div></div>
                            <span class="b-val ${valClass(s.ram)}">${s.ram}%</span>
                        </div>
                        <div class="b-row">
                            <span class="b-label">磁盘</span>
                            <div class="b-bar-wrap"><div class="b-bar" style="width:${s.disk}%;background:${barColor(s.disk)}"></div></div>
                            <span class="b-val ${valClass(s.disk)}">${s.disk}%</span>
                        </div>
                    </div>
                    
                    <svg class="person-svg" viewBox="0 0 40 60">
                        <ellipse cx="20" cy="12" rx="10" ry="10" fill="#f5c5a3"/>
                        <ellipse cx="16" cy="11" rx="1.5" ry="1.5" fill="#2C2C2A"/>
                        <ellipse cx="24" cy="11" rx="1.5" ry="1.5" fill="#2C2C2A"/>
                        <rect x="10" y="22" width="20" height="25" rx="3" fill="#2C2C2A"/>
                        <rect x="14" y="47" width="5" height="10" rx="2" fill="#444441"/>
                        <rect x="21" y="47" width="5" height="10" rx="2" fill="#444441"/>
                    </svg>
                    
                    <div class="desk">
                        <div class="desk-monitor">
                            <div class="monitor-screen ${s.status === 'online' ? 'ms-green' : 'ms-red'}">
                                ${s.status === 'online' ? 'OK' : '!'}
                            </div>
                        </div>
                    </div>
                    <div class="nameplate">${s.name}</div>
                    <div class="status-badge ${getBadgeClass(s.status)}">
                        ${s.status === 'online' ? '● 在线' : '⚠ 预警'}
                    </div>
                `;
                
                unit.onclick = () => alert(`服务器: ${s.name}\nCPU: ${s.cpu}%\n内存: ${s.ram}%\n磁盘: ${s.disk}%`);
                floor.appendChild(unit);
            });
        }

        renderServers();
    </script>
</body>
</html>
```

---

## 🔌 数据源适配

### 1. REST API 适配

```javascript
// API响应格式
const API_RESPONSE = {
    servers: [
        {
            id: 1,
            name: "web-alpha",
            hostname: "web-alpha.company.com",
            ip: "10.0.1.5",
            status: "running",
            metrics: {
                cpu_percent: 23.5,
                memory_percent: 61.2,
                disk_percent: 44.8,
                uptime_seconds: 4123456
            },
            location: "us-west-1",
            tags: ["web", "production"]
        }
    ]
};

// 数据转换器
function transformAPIData(apiData) {
    return apiData.servers.map(server => ({
        name: server.name,
        ip: server.ip,
        loc: server.location,
        cpu_pct: Math.round(server.metrics.cpu_percent),
        ram_pct: Math.round(server.metrics.memory_percent),
        disk_pct: Math.round(server.metrics.disk_percent),
        status: server.status === 'running' ? 'online' : 
                server.status === 'warning' ? 'warn' : 'offline',
        uptime: formatUptime(server.metrics.uptime_seconds),
        avatar: getStatusEmoji(server.status),
        avatarBg: getStatusBg(server.status),
        avatarColor: getStatusColor(server.status),
    }));
}

// 格式化运行时间
function formatUptime(seconds) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}天 ${hours}小时`;
}

// 状态映射
function getStatusEmoji(status) {
    const map = { running: '🟢', warning: '⚠', stopped: '🔴' };
    return map[status] || '⚪';
}

// 自动刷新
async function loadAndRender() {
    try {
        const res = await fetch('/api/servers');
        const data = await res.json();
        SERVERS.length = 0;
        SERVERS.push(...transformAPIData(data));
        renderServers();
    } catch (err) {
        console.error('加载失败:', err);
    }
}

// 每30秒刷新
setInterval(loadAndRender, 30000);
loadAndRender(); // 初始加载
```

### 2. WebSocket 实时推送

```javascript
class ServerMonitor {
    constructor() {
        this.ws = null;
        this.reconnectInterval = 5000;
        this.servers = new Map();
    }

    connect() {
        this.ws = new WebSocket('wss://your-server.com/monitor');
        
        this.ws.onopen = () => {
            console.log('监控连接已建立');
        };
        
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.handleUpdate(data);
        };
        
        this.ws.onclose = () => {
            console.log('连接断开，尝试重连...');
            setTimeout(() => this.connect(), this.reconnectInterval);
        };
    }

    handleUpdate(data) {
        switch(data.type) {
            case 'metrics':
                this.updateMetrics(data.serverId, data.metrics);
                break;
            case 'status':
                this.updateStatus(data.serverId, data.status);
                break;
            case 'alert':
                this.showAlert(data);
                break;
        }
    }

    updateMetrics(serverId, metrics) {
        const server = this.servers.get(serverId);
        if (server) {
            server.cpu_pct = Math.round(metrics.cpu);
            server.ram_pct = Math.round(metrics.memory);
            server.disk_pct = Math.round(metrics.disk);
            this.updateUI(serverId);
        }
    }

    updateUI(serverId) {
        // 更新对应的DOM元素
        const unit = document.querySelector(`[data-server-id="${serverId}"]`);
        if (unit) {
            // 更新进度条和数值
            const server = this.servers.get(serverId);
            // ... 更新逻辑
        }
    }
}

// 使用
const monitor = new ServerMonitor();
monitor.connect();
```

---

## 🎨 自定义主题

### 暗色主题

```css
/* 暗色主题覆盖 */
.office.dark {
    background: #1a1a1a;
}

.office.dark .bubble {
    background: #2d2d2d;
    border-color: #3d3d3d;
    color: #e0e0e0;
}

.office.dark .b-name {
    color: #fff;
}

.office.dark .desk {
    background: #3d3d3d;
}

.office.dark .nameplate {
    background: #0d0d0d;
    color: #888;
}

/* 切换按钮 */
.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 8px 16px;
    background: #2C2C2A;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
```

```javascript
// 主题切换
document.querySelector('.theme-toggle').onclick = () => {
    document.querySelector('.office').classList.toggle('dark');
};
```

---

## 📱 响应式适配

### 移动端优化

```css
/* 平板 */
@media (max-width: 768px) {
    .floor {
        flex-wrap: wrap;
    }
    
    .desk-unit {
        width: 200px;
    }
    
    .bubble {
        width: 160px;
    }
}

/* 手机 */
@media (max-width: 480px) {
    .office {
        padding: 16px;
    }
    
    .floor {
        flex-direction: column;
        align-items: center;
    }
    
    .desk-unit {
        width: 100%;
        max-width: 300px;
    }
}
```

---

## 🔧 实用工具函数

```javascript
// 工具函数库
const Utils = {
    // 格式化字节
    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // 格式化时间
    formatDuration(seconds) {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (days > 0) return `${days}天${hours}小时`;
        if (hours > 0) return `${hours}小时${mins}分`;
        return `${mins}分钟`;
    },

    // 颜色插值
    interpolateColor(pct) {
        // 从绿到红的渐变
        if (pct < 50) return '#3B6D11';
        if (pct < 75) return '#854F0B';
        return '#A32D2D';
    },

    // 防抖
    debounce(fn, delay) {
        let timer = null;
        return function(...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    // 节流
    throttle(fn, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 使用示例
const optimizedRender = Utils.throttle(renderServers, 1000);
window.addEventListener('resize', optimizedRender);
```

---

## 🧪 测试示例

```javascript
// 模拟数据生成器
function generateMockData(count = 5) {
    const names = ['Web', 'API', 'DB', 'Cache', 'Queue', 'Worker'];
    const regions = ['HK', 'BJ', 'SH', 'SZ', 'SG', 'JP'];
    
    return Array.from({ length: count }, (_, i) => {
        const cpu = Math.floor(Math.random() * 100);
        const ram = Math.floor(Math.random() * 100);
        const disk = Math.floor(Math.random() * 100);
        
        let status = 'online';
        if (cpu > 80 || ram > 85) status = 'warn';
        if (Math.random() < 0.1) status = 'offline';
        
        return {
            name: `${names[i % names.length]}-${i + 1}`,
            ip: `10.0.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`,
            loc: `${regions[i % regions.length]}-0${i + 1}`,
            cpu_pct: cpu,
            ram_pct: ram,
            disk_pct: disk,
            status: status,
            uptime: `${Math.floor(Math.random() * 100)}天`,
        };
    });
}

// 性能测试
function performanceTest() {
    const start = performance.now();
    const mockData = generateMockData(100);
    SERVERS.push(...mockData);
    renderServers();
    const end = performance.now();
    console.log(`渲染 ${mockData.length} 个工位耗时: ${(end - start).toFixed(2)}ms`);
}
```

---

## 📦 完整模块化版本

```javascript
// office-monitor.js
class OfficeMonitor {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            refreshInterval: 30000,
            maxServers: 100,
            ...options
        };
        this.servers = [];
        this.init();
    }

    init() {
        this.renderContainer();
        this.bindEvents();
        if (this.options.autoLoad) {
            this.loadData();
        }
    }

    renderContainer() {
        this.container.innerHTML = `
            <div class="office">
                <div class="office-title">${this.options.title || '服务器监控'}</div>
                <div class="floor"></div>
                <div class="modal-layer">
                    <div class="modal-card">...</div>
                </div>
            </div>
        `;
    }

    setData(servers) {
        this.servers = servers.slice(0, this.options.maxServers);
        this.render();
    }

    render() {
        const floor = this.container.querySelector('.floor');
        floor.innerHTML = '';
        this.servers.forEach((server, idx) => {
            floor.appendChild(this.createDeskUnit(server, idx));
        });
    }

    createDeskUnit(server, idx) {
        const unit = document.createElement('div');
        unit.className = 'desk-unit';
        unit.dataset.index = idx;
        // ... 创建逻辑
        return unit;
    }

    async loadData() {
        // 加载数据逻辑
    }

    openModal(idx) {
        // 打开弹窗逻辑
    }

    closeModal() {
        // 关闭弹窗逻辑
    }

    destroy() {
        // 清理资源
    }
}

// 导出
window.OfficeMonitor = OfficeMonitor;
```

```html
<!-- 使用模块化版本 -->
<script src="office-monitor.js"></script>
<script>
    const monitor = new OfficeMonitor('monitor-container', {
        title: '我的服务器',
        autoLoad: true,
        refreshInterval: 30000
    });
</script>
```
