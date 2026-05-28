// 通用弹窗组件
import { useEffect, useRef } from 'react';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  preventBodyScroll?: boolean;
}

export function Modal({
  isOpen,
  onClose,
  children,
  size = 'md',
  className = '',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  preventBodyScroll = true,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // ESC键关闭
  useEffect(() => {
    if (!closeOnEsc) return;
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose, closeOnEsc]);

  // 禁止背景滚动
  useEffect(() => {
    if (!preventBodyScroll) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, preventBodyScroll]);

  // 点击遮罩关闭
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay" 
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className={`modal-container modal-size-${size} ${className}`}
        ref={modalRef}
      >
        {showCloseButton && (
          <button 
            className="modal-close-btn" 
            onClick={onClose}
            aria-label="关闭弹窗"
          >
            ✕
          </button>
        )}
        {children}
      </div>
    </div>
  );
}

// Modal 子组件 - 头部
export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalHeader({ children, className = '' }: ModalHeaderProps) {
  return (
    <div className={`modal-header ${className}`}>
      {children}
    </div>
  );
}

// Modal 子组件 - 主体
export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return (
    <div className={`modal-body ${className}`}>
      {children}
    </div>
  );
}

// Modal 子组件 - 底部
export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function ModalFooter({ children, className = '' }: ModalFooterProps) {
  return (
    <div className={`modal-footer ${className}`}>
      {children}
    </div>
  );
}

// Modal 子组件 - 标题
export interface ModalTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  className?: string;
}

export function ModalTitle({ children, subtitle, className = '' }: ModalTitleProps) {
  return (
    <div className={`modal-title-wrapper ${className}`}>
      <h3 className="modal-title">{children}</h3>
      {subtitle && <p className="modal-subtitle">{subtitle}</p>}
    </div>
  );
}

// Modal 子组件 - 头像
export interface ModalAvatarProps {
  emoji?: string;
  bgColor?: string;
  textColor?: string;
  status?: 'online' | 'warn' | 'offline';
  className?: string;
}

export function ModalAvatar({ 
  emoji = '🟢', 
  bgColor = '#EAF3DE', 
  textColor = '#3B6D11',
  className = ''
}: ModalAvatarProps) {
  return (
    <div 
      className={`modal-avatar ${className}`}
      style={{ background: bgColor, color: textColor }}
    >
      {emoji}
    </div>
  );
}
