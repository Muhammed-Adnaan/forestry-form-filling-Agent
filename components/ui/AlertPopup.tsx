import React, { useEffect, useState } from 'react';

export type AlertType = 'success' | 'failure' | 'alert';

interface AlertPopupProps {
  message: string;
  type: AlertType;
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function AlertPopup({ message, type, isOpen, onClose, duration = 5000 }: AlertPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Slight delay to allow CSS transition to take effect after mount
      const showTimer = setTimeout(() => setIsVisible(true), 10);

      let hideTimer: NodeJS.Timeout;
      let closeTimer: NodeJS.Timeout;

      if (duration > 0) {
        // Start fading out 500ms before duration ends
        hideTimer = setTimeout(() => {
          setIsVisible(false);
        }, duration - 500);

        // Actually unmount and call onClose when duration ends
        closeTimer = setTimeout(() => {
          setShouldRender(false);
          onClose();
        }, duration);
      }

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        clearTimeout(closeTimer);
      };
    } else {
      setIsVisible(false);
      const closeTimer = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(closeTimer);
    }
  }, [isOpen, duration, onClose]);

  if (!shouldRender) return null;

  let bgColor = '';
  let borderColor = '';
  let textColor = '';

  switch (type) {
    case 'success':
      bgColor = '#d4edda';
      borderColor = '#c3e6cb';
      textColor = '#155724';
      break;
    case 'failure':
      bgColor = '#f8d7da';
      borderColor = '#f5c6cb';
      textColor = '#721c24';
      break;
    case 'alert':
      bgColor = '#fff3cd';
      borderColor = '#ffeeba';
      textColor = '#856404';
      break;
    default:
      bgColor = '#fff3cd';
      borderColor = '#ffeeba';
      textColor = '#856404';
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: `translateX(-50%) translateY(${isVisible ? '0' : '-20px'})`,
        opacity: isVisible ? 1 : 0,
        transition: 'all 0.5s ease-in-out',
        zIndex: 99999,
        backgroundColor: bgColor,
        color: textColor,
        border: `1px solid ${borderColor}`,
        padding: '16px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '320px',
        maxWidth: '90%',
        fontWeight: '500',
        fontFamily: 'sans-serif',
        whiteSpace: 'pre-wrap', // To format multiline messages correctly
      }}
    >
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => {
            setShouldRender(false);
            onClose();
          }, 500);
        }}
        style={{
          background: 'none',
          border: 'none',
          color: textColor,
          fontSize: '24px',
          cursor: 'pointer',
          lineHeight: '1',
          marginLeft: '16px',
          padding: '0 4px',
          fontWeight: 'bold',
          opacity: 0.7,
          transition: 'opacity 0.2s',
        }}
        onMouseOver={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseOut={(e) => (e.currentTarget.style.opacity = '0.7')}
      >
        &times;
      </button>
    </div>
  );
}
