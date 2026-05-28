// 详情卡片内容组件 - 使用通用 Modal
import type { ServerData } from '../types';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  ModalTitle,
  ModalAvatar 
} from './Modal';
import './DetailCardBody.css';

interface DetailCardBodyProps {
  server: ServerData | null;
  isOpen: boolean;
  onClose: () => void;
  onChat?: () => void;
}

// 根据百分比返回进度条颜色
function barColor(pct: number): string {
  if (pct >= 85) return '#A32D2D';
  if (pct >= 70) return '#854F0B';
  return '#3B6D11';
}

// 根据百分比返回CSS类名
function valClass(pct: number): string {
  if (pct >= 85) return 'err';
  if (pct >= 70) return 'warn';
  return 'ok';
}

export function DetailCardBody({ server, isOpen, onClose, onChat }: DetailCardBodyProps) {
  if (!server) return null;

  const handleSendPrompt = () => {
    const prompt = `帮我分析这台服务器的问题并给出优化建议：\n\n服务器名称: ${server.name}\nIP地址: ${server.ip}\n位置: ${server.loc || 'N/A'}\n操作系统: ${server.os}\nPHP版本: ${server.php || 'N/A'}\nWeb服务器: ${server.web || 'N/A'}\n\n性能指标:\n- CPU使用率: ${server.cpu_pct}%\n- 内存使用率: ${server.ram_pct}% (${server.ram_used || '?'}/${server.ram_total || '?'})\n- 磁盘使用率: ${server.disk_pct}% (${server.disk_used || '?'}/${server.disk_total || '?'})\n\n运行状态: ${server.status}\n运行时间: ${server.uptime || 'N/A'}\n域名数量: ${server.domains || 0}\nSSL最短剩余天数: ${server.ssl_min || 'N/A'}\n备注: ${server.notes || 'N/A'}`;
    
    console.log('AI分析提示词:', prompt);
    alert('提示词已生成，可在控制台查看！\n\n' + prompt.substring(0, 200) + '...');
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="md"
    >
      {/* 头部 */}
      <ModalHeader className="detail-header">
        <div className="detail-header-left">
          <ModalAvatar 
            emoji={server.avatar || (server.status === 'online' ? '🟢' : '⚠️')}
            bgColor={server.avatarBg || '#EAF3DE'}
            textColor={server.avatarColor || '#3B6D11'}
          />
          <ModalTitle subtitle={`${server.ip} · ${server.loc || '未知位置'}`}>
            {server.name}
          </ModalTitle>
        </div>
      </ModalHeader>
      
      {/* 主体内容 */}
      <ModalBody className="detail-body">
        {/* 左栏 - 基础配置 */}
        <div className="modal-section">
          <h4 className="modal-section-title">基础配置</h4>
          
          <div className="modal-row">
            <span className="modal-key">操作系统</span>
            <span className="modal-val">{server.os}</span>
          </div>
          
          {server.php && (
            <div className="modal-row">
              <span className="modal-key">PHP版本</span>
              <span className="modal-val">{server.php}</span>
            </div>
          )}
          
          {server.web && (
            <div className="modal-row">
              <span className="modal-key">Web服务器</span>
              <span className="modal-val">{server.web}</span>
            </div>
          )}
          
          {server.ssh_port && (
            <div className="modal-row">
              <span className="modal-key">SSH端口</span>
              <span className="modal-val">{server.ssh_port}</span>
            </div>
          )}
          
          {server.uptime && (
            <div className="modal-row">
              <span className="modal-key">运行时间</span>
              <span className="modal-val">{server.uptime}</span>
            </div>
          )}
          
          {server.deploy && (
            <div className="modal-row">
              <span className="modal-key">上次部署</span>
              <span className="modal-val">{server.deploy}</span>
            </div>
          )}
        </div>
        
        {/* 右栏 - 资源与SSL */}
        <div className="modal-section">
          <h4 className="modal-section-title">资源监控</h4>
          
          {/* CPU */}
          <div className="modal-bar-row">
            <span className="modal-bar-label">CPU</span>
            <div className="modal-bar-track">
              <div 
                className="modal-bar-fill" 
                style={{ width: `${server.cpu_pct}%`, background: barColor(server.cpu_pct) }}
              />
            </div>
            <span className={`modal-bar-pct ${valClass(server.cpu_pct)}`}>{server.cpu_pct}%</span>
          </div>
          
          {/* 内存 */}
          <div className="modal-bar-row">
            <span className="modal-bar-label">内存</span>
            <div className="modal-bar-track">
              <div 
                className="modal-bar-fill" 
                style={{ width: `${server.ram_pct}%`, background: barColor(server.ram_pct) }}
              />
            </div>
            <span className={`modal-bar-pct ${valClass(server.ram_pct)}`}>{server.ram_pct}%</span>
          </div>
          <div className="modal-row sub-row">
            <span className="modal-val">{server.ram_used || '?'}/{server.ram_total || '?'}</span>
          </div>
          
          {/* 磁盘 */}
          <div className="modal-bar-row">
            <span className="modal-bar-label">磁盘</span>
            <div className="modal-bar-track">
              <div 
                className="modal-bar-fill" 
                style={{ width: `${server.disk_pct}%`, background: barColor(server.disk_pct) }}
              />
            </div>
            <span className={`modal-bar-pct ${valClass(server.disk_pct)}`}>{server.disk_pct}%</span>
          </div>
          <div className="modal-row sub-row">
            <span className="modal-val">{server.disk_used || '?'}/{server.disk_total || '?'}</span>
          </div>
          
          {/* 域名与SSL */}
          {(server.domains !== undefined || server.ssl_min !== undefined) && (
            <h4 className="modal-section-title sub">域名与SSL</h4>
          )}
          
          {server.domains !== undefined && (
            <div className="modal-row">
              <span className="modal-key">域名数量</span>
              <span className="modal-val">{server.domains} 个</span>
            </div>
          )}
          
          {server.ssl_min !== undefined && (
            <div className="modal-row">
              <span className="modal-key">SSL剩余</span>
              <span className={`modal-val ${server.ssl_warn ? 'err' : ''}`}>
                {server.ssl_min} 天 {server.ssl_warn && '⚠️'}
              </span>
            </div>
          )}
          
          {server.notes && (
            <div className="modal-row notes">
              <span className="modal-key">备注</span>
              <span className="modal-val">{server.notes}</span>
            </div>
          )}
        </div>
      </ModalBody>
      
      {/* 底部 */}
      <ModalFooter className="detail-footer">
        <div className="detail-actions-left">
          <button className="modal-btn" onClick={onClose}>关闭</button>
          <button className="modal-btn secondary" onClick={handleSendPrompt}>
            📋 复制分析
          </button>
        </div>
        {onChat && (
          <button className="modal-btn primary detail-chat-btn" onClick={onChat}>
            💬 开始对话
          </button>
        )}
      </ModalFooter>
    </Modal>
  );
}
