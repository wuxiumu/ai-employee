# AI员工办公室 - 组件速查手册

## 🚀 快速开始

### 基础用法
```html
<!-- 1. 引入样式（内嵌在HTML中） -->
<style>
  /* CSS样式... */
</style>

<!-- 2. 添加办公室容器 -->
<div class="office">
  <div class="floor">
    <!-- 员工工位 -->
  </div>
</div>

<!-- 3. 引入脚本 -->
<script>
  const SERVERS = [...];
</script>
```

---

## 📦 组件清单

### 外层容器
| 类名 | 作用 | 必需 |
|------|------|------|
| `.office` | 办公室主容器 | ✅ |
| `.office-title` | 标题栏 | ❌ |
| `.floor` | 工位排列区域 | ✅ |

### 工位单元
| 类名 | 作用 | 层级 |
|------|------|------|
| `.desk-unit` | 单个员工工位 | 父级 |
| `.bubble` | 对话气泡 | 子级 |
| `.bubble.right` | 右对齐气泡 | 子级 |
| `.person-area` | 人物容器 | 子级 |
| `.person-wrap` | 人物SVG容器 | 孙级 |
| `.desk` | 办公桌 | 子级 |
| `.desk-monitor` | 显示器 | 孙级 |
| `.monitor-screen` | 屏幕内容 | 曾孙级 |
| `.desk-info` | 技术标签区 | 孙级 |
| `.desk-tag` | 单个标签 | 曾孙级 |
| `.nameplate` | 姓名牌 | 子级 |
| `.desk-leg` | 桌腿 | 子级 |
| `.uptime-tag` | 运行时间 | 子级 |
| `.status-badge` | 状态徽章 | 子级 |
| `.divider` | 分隔线 | 同级 |

### 弹窗组件
| 类名 | 作用 |
|------|------|
| `.modal-layer` | 弹窗外层 |
| `.modal-layer.open` | 打开状态 |
| `.modal-card` | 弹窗卡片 |
| `.modal-head` | 弹窗头部 |
| `.modal-head-left` | 头部左侧 |
| `.modal-avatar` | 头像 |
| `.modal-title` | 标题 |
| `.modal-sub` | 副标题 |
| `.modal-close` | 关闭按钮 |
| `.modal-body` | 弹窗主体 |
| `.modal-foot` | 弹窗底部 |
| `.m-section` | 内容区块 |
| `.m-section-title` | 区块标题 |
| `.m-row` | 信息行 |
| `.m-key` | 键名 |
| `.m-val` | 值 |
| `.m-btn` | 按钮 |
| `.m-btn.primary` | 主按钮 |

---

## 🎨 CSS变量参考

### 颜色变量（建议提取）
```css
:root {
    /* 背景 */
    --bg-primary: #f0ede8;
    --bg-secondary: #fff;
    --bg-modal: #f8f6f2;
    
    /* 文字 */
    --text-primary: #2C2C2A;
    --text-secondary: #5F5E5A;
    --text-muted: #888780;
    
    /* 边框 */
    --border-color: #d3d1c7;
    --border-light: #e8e5e0;
    
    /* 状态 */
    --status-ok: #3B6D11;
    --status-warn: #854F0B;
    --status-error: #A32D2D;
    
    /* 强调 */
    --accent-blue: #185FA5;
}
```

### 间距规范
| 名称 | 值 | 用途 |
|------|-----|------|
| xs | 4px | 内部间距 |
| sm | 8px | 紧凑间距 |
| md | 12px | 标准间距 |
| lg | 16px | 组件间距 |
| xl | 24px | 区块间距 |
| xxl | 28px | 页面边距 |

### 圆角规范
| 名称 | 值 | 用途 |
|------|-----|------|
| sm | 2px | 小标签 |
| md | 4px | 按钮、输入框 |
| lg | 6px | 卡片、气泡 |
| xl | 8px | 工位卡片 |
| xxl | 12px | 大容器 |
| full | 99px | 徽章 |

---

## 🔧 JavaScript API

### 全局变量
```javascript
SERVERS          // 服务器数据数组
currentServer    // 当前选中的服务器字符串
open             // 弹窗状态布尔值
```

### 函数列表

#### 核心函数
| 函数 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `barColor(pct)` | 百分比数字 | 颜色字符串 | 根据百分比返回进度条颜色 |
| `valClass(pct)` | 百分比数字 | CSS类名 | 根据百分比返回值样式类 |
| `openModal(idx)` | 服务器索引 | 无 | 打开详情弹窗 |
| `closeModal()` | 无 | 无 | 关闭弹窗 |
| `sendPrompt(prompt)` | 提示文本 | 无 | 发送AI分析请求 |

#### barColor 返回值
```javascript
barColor(23)   // → '#3B6D11' (绿色)
barColor(78)   // → '#854F0B' (橙色)
barColor(91)   // → '#A32D2D' (红色)
```

#### valClass 返回值
```javascript
valClass(23)   // → 'ok'
valClass(78)   // → 'warn'
valClass(91)   // → 'err'
```

---

## 📊 数据结构模板

### 基础模板
```javascript
{
    // 必填字段
    name: 'Server-Name',
    ip: '192.168.1.1',
    cpu_pct: 50,
    ram_pct: 50,
    disk_pct: 50,
    status: 'online',  // online | warn | offline
    
    // 可选字段
    loc: '机房位置',
    os: 'Ubuntu 22.04',
    php: '8.2',
    web: 'nginx 1.24',
    ram_used: '2GB',
    ram_total: '4GB',
    disk_used: '50GB',
    disk_total: '100GB',
    uptime: '30天',
    domains: 5,
    ssl_min: 30,
    ssl_warn: false,
    notes: '备注信息',
    avatar: '🟢',
    avatarBg: '#EAF3DE',
    avatarColor: '#3B6D11',
}
```

### 状态配置映射
```javascript
const STATUS_CONFIG = {
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
```

---

## 🎯 常用代码片段

### 1. 动态添加工位
```javascript
function addServerToDOM(server, index) {
    const floor = document.querySelector('.floor');
    const deskUnit = document.createElement('div');
    deskUnit.className = 'desk-unit';
    deskUnit.onclick = () => openModal(index);
    
    // 根据状态设置颜色
    const cpuColor = barColor(server.cpu_pct);
    const status = server.status === 'online' ? 'online' : 'warn';
    
    deskUnit.innerHTML = `
        <div class="bubble">
            <div class="b-name">${server.name}</div>
            <div class="b-row">
                <span class="b-label">CPU</span>
                <div class="b-bar-wrap">
                    <div class="b-bar" style="width:${server.cpu_pct}%;background:${cpuColor}"></div>
                </div>
                <span class="b-val ${valClass(server.cpu_pct)}">${server.cpu_pct}%</span>
            </div>
            <!-- 更多指标... -->
        </div>
        <!-- 人物和办公桌... -->
    `;
    
    floor.appendChild(deskUnit);
}
```

### 2. 定时刷新数据
```javascript
// 每30秒刷新一次
setInterval(() => {
    fetch('/api/servers')
        .then(r => r.json())
        .then(data => {
            SERVERS.length = 0;
            SERVERS.push(...data);
            renderAllServers();
        });
}, 30000);
```

### 3. 筛选显示
```javascript
function filterServers(status) {
    const units = document.querySelectorAll('.desk-unit');
    units.forEach((unit, idx) => {
        const server = SERVERS[idx];
        unit.style.display = server.status === status ? 'flex' : 'none';
    });
}

// 使用
filterServers('online');  // 只显示在线的
filterServers('warn');    // 只显示预警的
```

### 4. 批量操作
```javascript
function getSelectedServers() {
    return SERVERS.filter(s => s.selected);
}

function batchRestart() {
    const selected = getSelectedServers();
    selected.forEach(s => {
        console.log(`重启服务器: ${s.name}`);
        // 调用重启API
    });
}
```

---

## 🐛 常见问题

### Q1: 弹窗不显示
**检查**:
- `modalLayer` 元素是否存在
- CSS中 `.modal-layer.open` 是否正确设置 `min-height`
- 浏览器控制台是否有JS错误

### Q2: 进度条不动画
**解决**: 确保CSS中添加了 `transition: width .3s ease`

### Q3: 响应式适配
**建议**: 在小屏幕上添加横向滚动
```css
.floor {
    flex-wrap: nowrap;
    overflow-x: auto;
    padding-bottom: 10px;
}
```

### Q4: 数据不更新
**排查**:
- 检查 `SERVERS` 数组是否被正确修改
- 确认 `openModal` 中读取的是最新数据
- 考虑添加强制刷新机制

---

## 🔗 相关文档

- [实现逻辑分析](./ai-office-implementation-analysis.md) - 详细设计说明
- [架构图](./architecture-diagram.md) - 系统架构可视化
