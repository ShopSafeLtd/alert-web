import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  // Dropdown menu styles
  '@global': {
    '.activity-context-menu': {
      '& .ant-dropdown-menu': {
        borderRadius: '8px !important',
        overflow: 'hidden',
        padding: '4px',
      },
      '& .ant-dropdown-menu-item': {
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? 'rgba(255, 255, 255, 0.08)'
              : 'rgba(0, 0, 0, 0.04)',
        },
        borderRadius: '4px',
        margin: '2px 0',
      },
      '& .ant-dropdown-menu-item-danger': {
        '&:hover': {
          backgroundColor: 'rgba(255, 77, 79, 0.15)',
        },
      },
    },
  },

  // Activities styles
  activitiesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  activityAssignees: {
    alignItems: 'center',
    display: 'flex',
    gap: 12,
    marginTop: 8,
  },

  activityCard: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.04)' : '#f5f5f5',
      borderColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-1px)',
    },
    backgroundColor:
      theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : '#fafafa',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },

  activityDescription: {
    color: theme.secondaryText,
    fontSize: 13,
    lineHeight: 1.5,
    marginBottom: '0 !important',
    marginTop: 4,
  },

  activityDetailLabel: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 11,
    marginBottom: 2,
  },

  activityDetailValue: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
  },

  activityLabel: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 500,
  },

  activityName: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
  },

  activityReference: {
    color: theme.secondaryText,
    fontSize: 12,
    marginLeft: 8,
  },

  activityStatus: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
  },

  borderColor: theme.borderColor,

  // History styles
  historyActivityLink: {
    '&:hover': {
      textDecoration: 'underline',
    },
    color: theme.primary,
    cursor: 'pointer',
    fontSize: 12,
  },

  sidebarFooter: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.bodyBackground : '#fafafa',
    borderTop: `1px solid ${theme.borderColor}`,
    padding: 16,
  },
}));

export default useStyles;
