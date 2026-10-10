// 员工工位组件
import type { ServerData } from '../types';
import { STATUS_CONFIG } from '../types';
import { PersonSVG } from './PersonSVG';

interface DeskUnitProps {
  server: ServerData;
  index: number;
  onClick: (index: number) => void;
}

// 根据百分比返回进度条颜色
function barColor(pct: number): string {
  if (pct >= 85) return '#A32D2D';  // 红色 - 危险
  if (pct >= 70) return '#854F0B';  // 橙色 - 警告
  return '#3B6D11';  // 绿色 - 正常
}

// 根据百分比返回CSS类名
function valClass(pct: number): string {
  if (pct >= 85) return 'err';
  if (pct >= 70) return 'warn';
  return 'ok';
}

export function DeskUnit({ server, index, onClick }: DeskUnitProps) {
  const config = STATUS_CONFIG[server.status];
  const cpuColor = barColor(server.cpu_pct);
  const ramColor = barColor(server.ram_pct);
  const diskColor = barColor(server.disk_pct);

  return (
    <div className="desk-unit" onClick={() => onClick(index)}>
      {/* 对话气泡 */}
      <div className="bubble">
        <div className="b-name">{server.name}</div>
        
        {/* CPU */}
        <div className="b-row">
          <span className="b-label">CPU</span>
          <div className="b-bar-wrap">
            <div 
              className="b-bar" 
              style={{ width: `${server.cpu_pct}%`, background: cpuColor }}
            />
          </div>
          <span className={`b-val ${valClass(server.cpu_pct)}`}>{server.cpu_pct}%</span>
        </div>
        
        {/* 内存 */}
        <div className="b-row">
          <span className="b-label">内存</span>
          <div className="b-bar-wrap">
            <div 
              className="b-bar" 
              style={{ width: `${server.ram_pct}%`, background: ramColor }}
            />
          </div>
          <span className={`b-val ${valClass(server.ram_pct)}`}>{server.ram_pct}%</span>
        </div>
        
        {/* 磁盘 */}
        <div className="b-row">
          <span className="b-label">磁盘</span>
          <div className="b-bar-wrap">
            <div 
              className="b-bar" 
              style={{ width: `${server.disk_pct}%`, background: diskColor }}
            />
          </div>
          <span className={`b-val ${valClass(server.disk_pct)}`}>{server.disk_pct}%</span>
        </div>
      </div>
      
      {/* 人物区域 */}
      <div className="person-area">
        <div className="person-wrap">
          <PersonSVG status={server.status} />
        </div>
      </div>
      
      {/* 办公桌 */}
      <div className="desk">
        {/* 显示器 */}
        <div className="desk-monitor">
          <div className={`monitor-screen ${config.screenClass}`}>
            <span dangerouslySetInnerHTML={{ __html: config.screenText }} />
          </div>
        </div>
        
        {/* 技术标签 */}
        <div className="desk-info">
          {server.web && <span className="desk-tag">{server.web.split(' ')[0]}</span>}
          {server.php && <span className="desk-tag">PHP {server.php}</span>}
          {!server.web && !server.php && <span className="desk-tag">{server.os?.split(' ')[0]}</span>}
        </div>
      </div>
      
      {/* 桌腿 */}
      <div className="desk-leg" />
      
      {/* 姓名牌 */}
      <div className="nameplate">
        <span className="nameplate-text">{server.name}</span>
      </div>
      
      {/* 运行时间 */}
      {server.uptime && (
        <div className="uptime-tag">
          <span>{server.uptime}</span>
        </div>
      )}
      
      {/* 状态徽章 */}
      <div className={`status-badge ${config.badgeClass}`}>
        <span>{config.badgeText}</span>
      </div>
    </div>
  );
}
