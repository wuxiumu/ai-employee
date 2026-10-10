// AI员工聊天组件 - 使用通用 Modal
import { useState, useEffect, useRef } from 'react';
import type { ServerData } from '../types';
import { STATUS_CONFIG } from '../types';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  ModalTitle 
} from './Modal';
import './ChatModal.css';

interface ChatModalProps {
  server: ServerData | null;
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
  timestamp: Date;
}

// 根据状态生成AI汇报内容
function generateWorkReport(server: ServerData): string[] {
  const reports: string[] = [];
  
  reports.push(`您好！我是${server.name}，正在${server.loc || '机房'}值班。`);
  
  if (server.status === 'online') {
    reports.push(`目前系统运行正常，我已经连续工作${server.uptime || '很长时间'}了，状态良好！☕`);
  } else if (server.status === 'warn') {
    reports.push(`⚠️ 报告！目前系统处于预警状态，需要您关注一下。`);
  } else {
    reports.push(`🚨 紧急情况！系统出现故障，需要立即处理！`);
  }
  
  reports.push(`【性能指标汇报】\n• CPU使用率：${server.cpu_pct}%\n• 内存使用率：${server.ram_pct}% (${server.ram_used || '?'}/${server.ram_total || '?'})\n• 磁盘使用率：${server.disk_pct}% (${server.disk_used || '?'}/${server.disk_total || '?'})`);
  
  if (server.cpu_pct >= 85) {
    reports.push(`CPU负载较高！建议检查是否有异常进程或考虑扩容。`);
  } else if (server.cpu_pct >= 70) {
    reports.push(`CPU使用率达到${server.cpu_pct}%，处于正常偏高水平，建议留意。`);
  } else {
    reports.push(`CPU使用率${server.cpu_pct}%，非常健康！`);
  }
  
  if (server.ram_pct >= 85) {
    reports.push(`🚨 内存告急！使用率${server.ram_pct}%，可能会导致系统卡顿，建议清理缓存或扩容。`);
  } else if (server.ram_pct >= 70) {
    reports.push(`内存使用率${server.ram_pct}%，还算可以，但建议关注。`);
  } else {
    reports.push(`内存充足，使用率${server.ram_pct}%，运行很流畅。`);
  }
  
  if (server.disk_pct >= 85) {
    reports.push(`⚠️ 磁盘空间不足！仅剩${100 - server.disk_pct}%空间，请尽快清理日志文件或扩容。`);
  } else if (server.disk_pct >= 70) {
    reports.push(`磁盘使用${server.disk_pct}%，空间还够用，但建议规划一下。`);
  } else {
    reports.push(`磁盘空间充足，使用了${server.disk_pct}%。`);
  }
  
  if (server.web || server.php) {
    reports.push(`【软件环境】\n运行环境：${server.os}\n${server.web ? `Web服务器：${server.web}` : ''}\n${server.php ? `PHP版本：${server.php}` : ''}`);
  }
  
  if (server.ssl_warn && server.ssl_min !== undefined) {
    reports.push(`🔒 SSL证书即将过期！仅剩${server.ssl_min}天，请及时续期，避免服务中断。`);
  } else if (server.ssl_min !== undefined && server.ssl_min < 30) {
    reports.push(`SSL证书还剩${server.ssl_min}天，建议提前续期。`);
  }
  
  if (server.notes) {
    reports.push(`【备注】${server.notes}`);
  }
  
  reports.push(`汇报完毕！还有什么需要我为您查询的吗？您可以问：\n1. 帮我分析优化建议\n2. 查看历史趋势\n3. 生成诊断报告`);
  
  return reports;
}

export function ChatModal({ server, isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && server && messages.length === 0) {
      const reports = generateWorkReport(server);
      let delay = 0;
      
      reports.forEach((report, index) => {
        delay += index === 0 ? 300 : 800 + Math.random() * 500;
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            addMessage('ai', report);
            setIsTyping(false);
          }, 500 + Math.random() * 500);
        }, delay);
      });
    }
  }, [isOpen, server, messages.length]);
  
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setInputValue('');
    }
  }, [isOpen]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const addMessage = (type: 'ai' | 'user', content: string) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      type,
      content,
      timestamp: new Date(),
    }]);
  };
  
  const handleSend = () => {
    if (!inputValue.trim() || !server) return;
    
    addMessage('user', inputValue);
    setInputValue('');
    
    setIsTyping(true);
    setTimeout(() => {
      const response = generateAIResponse(inputValue, server);
      addMessage('ai', response);
      setIsTyping(false);
    }, 1000);
  };
  
  const generateAIResponse = (input: string, srv: ServerData): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('优化') || lowerInput.includes('建议')) {
      return generateOptimizationAdvice(srv);
    }
    if (lowerInput.includes('趋势') || lowerInput.includes('历史')) {
      return `【历史趋势分析】\n过去7天平均CPU使用率：${Math.max(5, srv.cpu_pct - 10)}% - ${srv.cpu_pct}%\n内存使用趋势：平稳\n磁盘增长：每天约0.5GB\n\n建议：${srv.disk_pct > 80 ? '磁盘增长较快，建议设置自动清理策略。' : '各项指标正常，继续保持！'}`;
    }
    if (lowerInput.includes('诊断') || lowerInput.includes('报告')) {
      return `【诊断报告】\n服务器：${srv.name}\n健康度：${srv.status === 'online' ? '95%' : srv.status === 'warn' ? '70%' : '40%'}\n风险项：${srv.disk_pct > 80 ? '磁盘空间' : ''} ${srv.ram_pct > 80 ? '内存使用' : ''}\n\n综合评价：${srv.status === 'online' ? '运行良好，建议定期维护。' : '存在风险，需要关注。'}`;
    }
    if (lowerInput.includes('你好') || lowerInput.includes('hi')) {
      return `您好！我是${srv.name}，随时准备为您服务！有什么可以帮助您的吗？`;
    }
    if (lowerInput.includes('谢谢')) {
      return '不客气！这是我的职责。有其他问题随时找我 😊';
    }
    if (lowerInput.includes('bye') || lowerInput.includes('再见')) {
      return '再见！祝您工作愉快，我会继续监控服务器状态的！';
    }
    
    return `我理解了您的问题"${input}"。\n\n作为${srv.name}，我目前${srv.status === 'online' ? '运行正常' : '需要关注'}。如果您需要更详细的分析，可以尝试询问：\n• "帮我分析优化建议"\n• "查看历史趋势"\n• "生成诊断报告"`;
  };
  
  const generateOptimizationAdvice = (srv: ServerData): string => {
    const advices: string[] = ['【优化建议】'];
    
    if (srv.cpu_pct >= 70) {
      advices.push('1. CPU优化：\n   - 检查高CPU进程\n   - 考虑升级CPU或使用负载均衡\n   - 优化应用程序代码');
    }
    if (srv.ram_pct >= 70) {
      advices.push('2. 内存优化：\n   - 清理不必要的缓存\n   - 检查内存泄漏\n   - 考虑增加内存或优化配置');
    }
    if (srv.disk_pct >= 70) {
      advices.push('3. 磁盘优化：\n   - 清理日志文件\n   - 删除临时文件\n   - 考虑扩容或使用对象存储');
    }
    if (srv.ssl_warn) {
      advices.push('4. SSL证书：\n   - 尽快续期SSL证书\n   - 设置自动续期提醒');
    }
    
    if (advices.length === 1) {
      advices.push('目前系统运行良好，暂无特别需要优化的项目。建议定期进行安全更新和备份检查。');
    }
    
    return advices.join('\n\n');
  };
  
  if (!server) return null;
  
  const config = STATUS_CONFIG[server.status];
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="sm"
      className="chat-modal-wrapper"
    >
      {/* 头部 */}
      <ModalHeader className="chat-header">
        <div className="chat-header-left">
          <div 
            className="chat-avatar" 
            style={{ background: server.avatarBg || '#EAF3DE' }}
          >
            <PersonIcon status={server.status} />
          </div>
          <ModalTitle>
            {server.name}
          </ModalTitle>
          <span className={`chat-status ${server.status}`}>
            {config.badgeText}
          </span>
        </div>
      </ModalHeader>
      
      {/* 聊天内容 */}
      <ModalBody className="chat-body">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-message ${msg.type}`}
            >
              {msg.type === 'ai' && (
                <div 
                  className="chat-avatar-small"
                  style={{ background: server.avatarBg || '#EAF3DE' }}
                >
                  <PersonIcon status={server.status} size="small" />
                </div>
              )}
              <div className="chat-bubble">
                <div className="chat-content">
                  {msg.content.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('【') ? 'chat-title' : ''}>
                      {line}
                    </p>
                  ))}
                </div>
                <span className="chat-time">
                  {msg.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="chat-message ai typing">
              <div 
                className="chat-avatar-small"
                style={{ background: server.avatarBg || '#EAF3DE' }}
              >
                <PersonIcon status={server.status} size="small" />
              </div>
              <div className="chat-bubble typing">
                <span className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ModalBody>
      
      {/* 输入区域 */}
      <ModalFooter className="chat-footer">
        <div className="chat-quick-actions">
          <button onClick={() => { setInputValue('帮我分析优化建议'); handleSend(); }}>
            💡 优化建议
          </button>
          <button onClick={() => { setInputValue('查看历史趋势'); handleSend(); }}>
            📊 历史趋势
          </button>
          <button onClick={() => { setInputValue('生成诊断报告'); handleSend(); }}>
            📋 诊断报告
          </button>
        </div>
        <div className="chat-input-row">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="输入消息..."
            className="chat-input"
          />
          <button 
            className="chat-send-btn" 
            onClick={handleSend}
            disabled={!inputValue.trim()}
          >
            发送
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
}

// 人物图标组件
function PersonIcon({ status, size = 'normal' }: { status: string; size?: 'normal' | 'small' }) {
  const isWarn = status === 'warn' || status === 'offline';
  const s = size === 'small' ? 0.6 : 1;
  
  return (
    <svg width={40 * s} height={56 * s} viewBox="0 0 40 56">
      <rect x="14" y="36" width="5" height="16" fill="#374151" />
      <rect x="21" y="36" width="5" height="16" fill="#374151" />
      <path d="M10 22 L30 22 L28 38 L12 38 Z" fill={isWarn ? "#6B7280" : "#1F2937"} />
      <path d="M19 22 L21 22 L20 30 Z" fill={isWarn ? "#374151" : "#3B82F6"} />
      <circle cx="20" cy="16" r="8" fill="#FDBA74" />
      <path d="M12 14 Q12 6 20 6 Q28 6 28 14 L28 16 L26 15 L24 16 L20 15 L16 16 L14 15 L12 16 Z" fill="#1F2937" />
      {isWarn ? (
        <>
          <path d="M17 15 L19 16" stroke="#1F2937" strokeWidth="1" />
          <path d="M21 16 L23 15" stroke="#1F2937" strokeWidth="1" />
          <path d="M18 21 L22 21" stroke="#1F2937" strokeWidth="1" />
        </>
      ) : (
        <>
          <circle cx="17" cy="16" r="1" fill="#1F2937" />
          <circle cx="23" cy="16" r="1" fill="#1F2937" />
          <path d="M17 20 Q20 22 23 20" stroke="#1F2937" strokeWidth="1" fill="none" />
        </>
      )}
    </svg>
  );
}
