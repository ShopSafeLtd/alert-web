import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  // Main sidebar container
  sidebar: {
    backgroundColor: theme.componentBackground,
    borderLeft: `1px solid ${theme.borderColor}`,
    boxShadow:
      theme.colorScheme === 'dark'
        ? '-4px 0 12px rgba(0, 0, 0, 0.3)'
        : '-4px 0 12px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    position: 'relative',
    transition: 'width 0.3s ease',
  },

  // Expanded content
  sidebarContent: {
    backgroundColor: theme.componentBackground,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    padding: 0,
    width: 420,
  },

  // Collapsed menu
  sidebarMenu: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.bodyBackground : '#f5f5f5',
    borderRight: `1px solid ${theme.borderColor}`,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    height: '100%',
    overflowY: 'auto',
    padding: '12px 8px',
    width: 60,
  },

  sidebarMenuBadge: {
    backgroundColor: theme.primary,
    borderRadius: 10,
    color: '#fff',
    fontSize: 10,
    fontWeight: 600,
    minWidth: 18,
    padding: '1px 4px',
    position: 'absolute',
    right: 2,
    textAlign: 'center',
    top: 2,
  },

  sidebarMenuDivider: {
    backgroundColor: theme.borderColor,
    height: 1,
    margin: '8px 0',
    width: '100%',
  },

  sidebarMenuIcon: {
    fontSize: 18,
  },

  sidebarMenuItem: {
    '&:hover': {
      '& svg': {
        color: theme.primary,
      },
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
    },
    alignItems: 'center',
    borderRadius: 8,
    color: theme.secondaryText,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    padding: '6px 4px',
    position: 'relative',
    transition: 'all 0.2s ease',
    width: '100%',
  },

  sidebarMenuItemActive: {
    '& svg': {
      color: theme.primary,
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(24, 144, 255, 0.25)'
          : 'rgba(24, 144, 255, 0.12)',
    },
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(24, 144, 255, 0.15)'
        : 'rgba(24, 144, 255, 0.08)',
    color: theme.primary,
  },

  sidebarMenuLabel: {
    fontSize: 9,
    fontWeight: 500,
    lineHeight: 1,
    textAlign: 'center',
  },

  // Toggle button
  sidebarToggle: {
    '& svg': {
      color: theme.secondaryText,
      fontSize: 16,
      transition: 'color 0.2s ease',
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.04)',
      borderColor: theme.primary,
    },
    '&:hover svg': {
      color: theme.primary,
    },
    alignItems: 'center',
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '8px 0 0 8px',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '-2px 0 8px rgba(0, 0, 0, 0.3)'
        : '-2px 0 8px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    display: 'flex',
    height: 32,
    justifyContent: 'center',
    left: -32,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    transition: 'all 0.2s ease',
    width: 32,
    zIndex: 1000,
  },
}));

export default useStyles;
