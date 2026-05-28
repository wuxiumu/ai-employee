// AI员工 - SVG人物组件
import type { ServerStatus } from '../types';

interface PersonSVGProps {
  status: ServerStatus;
}

export function PersonSVG({ status }: PersonSVGProps) {
  const isWarn = status === 'warn' || status === 'offline';

  if (isWarn) {
    // 预警/离线状态 - 灰色西装、皱眉表情、手持警示文件、额头汗珠
    return (
      <svg width="100" height="140" viewBox="0 0 100 140" className="person-svg warn">
        {/* 腿 */}
        <rect x="35" y="90" width="12" height="40" fill="#374151" />
        <rect x="53" y="90" width="12" height="40" fill="#374151" />
        
        {/* 身体 - 灰色西装 */}
        <path d="M25 55 L75 55 L70 95 L30 95 Z" fill="#6B7280" />
        
        {/* 领带 */}
        <path d="M48 55 L52 55 L50 75 Z" fill="#374151" />
        
        {/* 白衬衫 */}
        <path d="M40 55 L50 75 L60 55" fill="#F9FAFB" />
        
        {/* 头 */}
        <circle cx="50" cy="40" r="20" fill="#FDBA74" />
        
        {/* 头发 */}
        <path d="M30 35 Q30 15 50 15 Q70 15 70 35 L70 40 L65 38 L60 40 L50 38 L40 40 L35 38 L30 40 Z" fill="#1F2937" />
        
        {/* 眼睛 - 眯眼担忧 */}
        <path d="M42 38 L46 40" stroke="#1F2937" strokeWidth="1.5" />
        <path d="M54 40 L58 38" stroke="#1F2937" strokeWidth="1.5" />
        
        {/* 眉毛 - 八字眉 */}
        <path d="M40 34 L46 36" stroke="#1F2937" strokeWidth="1.5" />
        <path d="M54 36 L60 34" stroke="#1F2937" strokeWidth="1.5" />
        
        {/* 嘴巴 - 抿嘴 */}
        <path d="M46 52 L54 52" stroke="#1F2937" strokeWidth="1.5" />
        
        {/* 汗珠 */}
        <circle cx="65" cy="28" r="2" fill="#60A5FA" opacity="0.8" />
        <circle cx="68" cy="32" r="1.5" fill="#60A5FA" opacity="0.6" />
        
        {/* 左手 - 拿着警示文件 */}
        <rect x="20" y="65" width="20" height="25" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1" />
        <text x="25" y="78" fontSize="8" fill="#EF4444">!</text>
        <rect x="22" y="60" width="3" height="5" fill="#F59E0B" />
        
        {/* 右手 - 自然下垂 */}
        <rect x="75" y="65" width="8" height="25" rx="4" fill="#FDBA74" />
        
        {/* 警示标识 */}
        <circle cx="75" cy="30" r="8" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
        <text x="71" y="34" fontSize="10" fill="#EF4444" fontWeight="bold">!</text>
      </svg>
    );
  }

  // 正常状态 - 黑色西装、标准表情、手持咖啡杯
  return (
    <svg width="100" height="140" viewBox="0 0 100 140" className="person-svg online">
      {/* 腿 */}
      <rect x="35" y="90" width="12" height="40" fill="#1F2937" />
      <rect x="53" y="90" width="12" height="40" fill="#1F2937" />
      
      {/* 身体 - 黑色西装 */}
      <path d="M25 55 L75 55 L70 95 L30 95 Z" fill="#1F2937" />
      
      {/* 领带 - 蓝色 */}
      <path d="M48 55 L52 55 L50 75 Z" fill="#3B82F6" />
      
      {/* 白衬衫 */}
      <path d="M40 55 L50 75 L60 55" fill="#F9FAFB" />
      
      {/* 头 */}
      <circle cx="50" cy="40" r="20" fill="#FDBA74" />
      
      {/* 头发 */}
      <path d="M30 35 Q30 15 50 15 Q70 15 70 35 L70 40 L65 38 L60 40 L50 38 L40 40 L35 38 L30 40 Z" fill="#1F2937" />
      
      {/* 眼睛 */}
      <circle cx="43" cy="40" r="2" fill="#1F2937" />
      <circle cx="57" cy="40" r="2" fill="#1F2937" />
      
      {/* 眉毛 */}
      <path d="M40 34 L46 34" stroke="#1F2937" strokeWidth="1.5" />
      <path d="M54 34 L60 34" stroke="#1F2937" strokeWidth="1.5" />
      
      {/* 嘴巴 - 微笑 */}
      <path d="M45 50 Q50 55 55 50" stroke="#1F2937" strokeWidth="1.5" fill="none" />
      
      {/* 咖啡杯 */}
      <rect x="22" y="65" width="14" height="18" rx="2" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1" />
      <rect x="24" y="67" width="10" height="12" fill="#92400E" opacity="0.8" />
      {/* 咖啡把手 */}
      <path d="M36 70 Q40 70 40 74 Q40 78 36 78" stroke="#D1D5DB" strokeWidth="2" fill="none" />
      {/* 热气 */}
      <path d="M26 60 Q28 55 26 50" stroke="#9CA3AF" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M30 58 Q32 53 30 48" stroke="#9CA3AF" strokeWidth="1.5" fill="none" opacity="0.4" />
      
      {/* 右手 - 自然下垂 */}
      <rect x="75" y="65" width="8" height="25" rx="4" fill="#FDBA74" />
    </svg>
  );
}
