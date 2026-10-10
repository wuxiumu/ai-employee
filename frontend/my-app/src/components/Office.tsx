// AI员工办公室主组件
import { useState, useEffect } from 'react';
import type { ServerData } from '../types';
import { SERVERS } from '../types';
import { DeskUnit } from './DeskUnit';
import { DetailCardBody } from './DetailCardBody';
import { ChatModal } from './ChatModal';
import { fetchServers } from '../services/api';
import './Office.css';

export function Office() {
  const [servers, setServers] = useState<ServerData[]>(SERVERS);
  const [selectedServer, setSelectedServer] = useState<ServerData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 加载服务器数据
  const loadServers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchServers();
      setServers(data);
    } catch (error) {
      console.error('Failed to load servers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    loadServers();
  }, []);

  // 自动刷新（每30秒）
  useEffect(() => {
    const interval = setInterval(() => {
      loadServers();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // 打开详情弹窗
  const handleOpenDetail = (index: number) => {
    setSelectedServer(servers[index]);
    setIsDetailOpen(true);
    setIsChatOpen(false);
  };

  // 关闭详情弹窗
  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setTimeout(() => {
      if (!isChatOpen) {
        setSelectedServer(null);
      }
    }, 300);
  };

  // 打开聊天弹窗
  const handleOpenChat = () => {
    setIsDetailOpen(false);
    setIsChatOpen(true);
  };

  // 关闭聊天弹窗
  const handleCloseChat = () => {
    setIsChatOpen(false);
    setTimeout(() => setSelectedServer(null), 300);
  };

  return (
    <div className="office">
      {/* 标题 */}
      <h1 className="office-title">
        Server Office · 员工总览
        {isLoading && <span className="loading-indicator">⟳</span>}
      </h1>
      
      {/* 刷新按钮 */}
      <div className="toolbar">
        <button className="refresh-btn" onClick={loadServers} disabled={isLoading}>
          {isLoading ? '刷新中...' : '↻ 刷新数据'}
        </button>
        <span className="server-count">
          共 {servers.length} 台服务器
        </span>
      </div>
      
      {/* 工位区域 */}
      <div className="floor">
        {servers.map((server, index) => (
          <DeskUnit 
            key={server.name} 
            server={server} 
            index={index}
            onClick={handleOpenDetail}
          />
        ))}
      </div>
      
      {/* 详情弹窗 - 使用独立的 DetailCardBody 组件 */}
      <DetailCardBody 
        server={selectedServer}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onChat={handleOpenChat}
      />

      {/* 聊天弹窗 */}
      <ChatModal 
        server={selectedServer}
        isOpen={isChatOpen}
        onClose={handleCloseChat}
      />
    </div>
  );
}
