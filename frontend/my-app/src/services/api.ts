// API服务 - 与PHP后端通信
import type { ServerData } from '../types';
import { SERVERS as MOCK_SERVERS } from '../types';

const API_BASE_URL = 'http://localhost:8080';

// 检查是否使用模拟数据
const USE_MOCK = true; // 开发时使用，生产环境设为false

/**
 * 获取服务器列表
 */
export async function fetchServers(): Promise<ServerData[]> {
  if (USE_MOCK) {
    // 模拟数据，添加一些随机性
    return MOCK_SERVERS.map(server => ({
      ...server,
      cpu_pct: Math.max(5, Math.min(95, server.cpu_pct + Math.floor(Math.random() * 20 - 10))),
      ram_pct: Math.max(10, Math.min(95, server.ram_pct + Math.floor(Math.random() * 20 - 10))),
      disk_pct: Math.max(10, Math.min(95, server.disk_pct + Math.floor(Math.random() * 10 - 5))),
    }));
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/servers`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
    
    throw new Error(result.error || 'Failed to fetch servers');
  } catch (error) {
    console.error('API Error:', error);
    // 出错时返回模拟数据
    return MOCK_SERVERS;
  }
}

/**
 * 获取服务器状态统计
 */
export async function fetchServerStatus(): Promise<{ total: number; online: number; warn: number; offline: number }> {
  if (USE_MOCK) {
    const online = MOCK_SERVERS.filter(s => s.status === 'online').length;
    const warn = MOCK_SERVERS.filter(s => s.status === 'warn').length;
    const offline = MOCK_SERVERS.filter(s => s.status === 'offline').length;
    
    return {
      total: MOCK_SERVERS.length,
      online,
      warn,
      offline,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/servers/status`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
    
    throw new Error(result.error || 'Failed to fetch status');
  } catch (error) {
    console.error('API Error:', error);
    return { total: 0, online: 0, warn: 0, offline: 0 };
  }
}

/**
 * 健康检查
 */
export async function healthCheck(): Promise<{ status: string; version: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    }
    
    throw new Error('Health check failed');
  } catch (error) {
    console.error('Health Check Error:', error);
    return { status: 'unhealthy', version: 'unknown' };
  }
}
