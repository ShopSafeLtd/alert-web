import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { useThemeLanguage } from 'hooks/useThemeLanguage';
import React from 'react';
import { useIntl } from 'react-intl';

interface Props {
  visible: boolean;
}

const LoadingOverlay = ({ visible }: Props): JSX.Element | null => {
  const intl = useIntl();
  const { theme } = useThemeLanguage();
  const isDark = theme === 'dark';

  if (!visible) return null;

  return (
    <div
      style={{
        alignItems: 'center',
        backgroundColor: isDark
          ? 'rgba(30, 30, 30, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        borderRadius: '8px',
        bottom: '24px',
        boxShadow: isDark
          ? '0 4px 12px rgba(0, 0, 0, 0.5)'
          : '0 4px 12px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        gap: '12px',
        left: '50%',
        padding: '12px 24px',
        pointerEvents: 'none',
        position: 'fixed',
        transform: 'translateX(-50%)',
        zIndex: 9999,
      }}
    >
      <Spin indicator={<LoadingOutlined spin style={{ fontSize: 20 }} />} />
      <span
        style={{
          color: isDark ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        {intl.formatMessage({ defaultMessage: 'Loading more...' })}
      </span>
    </div>
  );
};

export default LoadingOverlay;
