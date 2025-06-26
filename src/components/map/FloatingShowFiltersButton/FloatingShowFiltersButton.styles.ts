import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  filterIcon: {
    fontSize: '18px',
  },

  floatingButton: {
    '& .ant-btn': {
      '&:hover': {
        backgroundColor: theme.hoverBackground,
        color: theme.primary,
      },
      alignItems: 'center',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '50%',
      color: theme.headerColor,
      display: 'flex',
      height: '100%',
      justifyContent: 'center',

      width: '100%',
    },
    '&:hover': {
      WebkitBackdropFilter: 'blur(16px) saturate(180%)',
      backdropFilter: 'blur(16px) saturate(180%)',
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(30, 35, 45, 0.7)'
          : 'rgba(255, 255, 255, 0.5)',
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.25)'
          : 'rgba(255, 255, 255, 0.6)'
      }`,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 12px 32px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 12px 32px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 0 0 1px rgba(255, 255, 255, 0.7)',
      transform: 'scale(1.05) translateY(-2px)',
    },
    '@supports (backdrop-filter: blur(1px))': {
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(30, 35, 45, 0.5)'
          : 'rgba(255, 255, 255, 0.3)',
    },
    '@supports not (backdrop-filter: blur(1px))': {
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(30, 35, 45, 0.9)'
          : 'rgba(255, 255, 255, 0.9)',
    },
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    backdropFilter: 'blur(12px) saturate(180%)',
    background:
      theme.colorScheme === 'dark'
        ? 'rgba(30, 35, 45, 0.5)'
        : 'rgba(255, 255, 255, 0.3)',
    border: `1px solid ${
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(255, 255, 255, 0.4)'
    }`,
    borderRadius: '50%',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.15) inset, 0 0 0 1px rgba(255, 255, 255, 0.05)'
        : '0 8px 24px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 0 0 1px rgba(255, 255, 255, 0.5)',
    height: '48px',
    left: '20px',
    position: 'absolute',

    top: '20px',

    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

    width: '48px',

    zIndex: 1000,
  },
}));

export default useStyles;
