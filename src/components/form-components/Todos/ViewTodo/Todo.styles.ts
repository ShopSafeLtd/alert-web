import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  // Glassed action bar styling
  actionBarGlassed: {
    WebkitBackdropFilter: 'blur(10px)',
    backdropFilter: 'blur(10px)',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(40, 49, 66, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
    borderTop:
      theme.colorScheme === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.08)'
        : '1px solid rgba(0, 0, 0, 0.06)',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 -2px 16px rgba(0, 0, 0, 0.3)'
        : '0 -2px 16px rgba(0, 0, 0, 0.08)',
  },

  // Card styling with theme-aware backgrounds
  todoSectionCard: {
    '& .ant-card-body': {
      backgroundColor: theme.componentBackground,
    },
    '& .ant-card-head': {
      backgroundColor: theme.componentBackground,
      borderBottom: `1px solid ${theme.borderColor}`,
      borderRadius: '8px 8px 0 0',
    },
    // Inner cards with different shade
    '& .ant-card-type-inner': {
      backgroundColor: theme.cardSubsectionBackground,
      border: `1px solid ${theme.borderColor}`,
      borderRadius: '6px',
    },
    '&.todo-evidence': {
      '&::before': {
        backgroundColor: 'var(--ant-color-success)',
        borderRadius: '8px 8px 0 0',
        content: '""',
        height: '3px',
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
      },
      borderTop: `1px solid ${theme.borderColor}`,
    },
    '&.todo-linked-profiles': {
      '&::before': {
        backgroundColor: 'var(--ant-color-purple)',
        borderRadius: '0 0 8px 8px',
        bottom: 0,
        content: '""',
        height: '3px',
        left: 0,
        position: 'absolute',
        right: 0,
      },
      border: `1px solid ${theme.borderColor}`,
    },
    '&.todo-time-tracking': {
      '&::before': {
        backgroundColor: 'var(--ant-color-primary)',
        borderRadius: '8px 0 0 8px',
        bottom: 0,
        content: '""',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '4px',
      },
      borderLeft: `1px solid ${theme.borderColor}`,
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
  },

  // Collapse styling with theme colors
  todoSectionCollapse: {
    '& .ant-collapse-item': {
      '& .ant-collapse-content': {
        backgroundColor: theme.cardSubsectionBackground,
        borderTop: `1px solid ${theme.borderColor}`,
      },
      '& .ant-collapse-header': {
        backgroundColor: theme.componentBackground,
        borderRadius: '8px',
      },
      '&:last-child': {
        borderRadius: '0 0 8px 8px',
      },
      backgroundColor: theme.componentBackground,
      border: 'none',
    },
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '8px',
    marginBottom: 0,
    overflow: 'hidden',
  },
}));

export default useStyles;
