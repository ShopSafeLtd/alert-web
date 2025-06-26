import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  activeFiltersChip: {
    backgroundColor: theme.primary,
    borderRadius: '12px',
    color: 'white',
    fontSize: '11px',
    fontWeight: 500,
    marginLeft: '8px',
    padding: '2px 8px',
  },

  clearAllButton: {
    marginTop: '12px',
    width: '100%',
  },

  collapsed: {
    maxWidth: '160px',
    minWidth: '160px',
  },

  collapsedContent: {
    padding: '8px',
    textAlign: 'center',
  },

  collapsedTitle: {
    fontSize: '12px',
  },

  content: {
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      '&:hover': {
        background:
          theme.colorScheme === 'dark'
            ? 'rgba(255, 255, 255, 0.3)'
            : 'rgba(0, 0, 0, 0.3)',
      },
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(0, 0, 0, 0.2)',

      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&:before': {
      background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent)',
      borderRadius: '0 0 16px 16px',
      bottom: 0,
      content: '""',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      right: 0,
      top: 0,
    },
    background:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : 'rgba(255, 255, 255, 0.1)',
    borderRadius: '0 0 16px 16px',

    maxHeight: 'calc(80vh - 60px)',

    overflowY: 'auto',

    padding: '16px',

    position: 'relative',
  },

  controlButton: {
    '&:hover': {
      backgroundColor: theme.componentBackground,
      color: theme.headerColor,
    },
    background: 'none',
    border: 'none',
    borderRadius: '4px',
    color: theme.secondaryText,
    cursor: 'pointer',
    padding: '4px',

    transition: 'all 0.2s ease',
  },

  controls: {
    alignItems: 'center',
    display: 'flex',
    flexShrink: 0,
    gap: '8px',
  },

  dragHandle: {
    '&:before': {
      background:
        'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
      content: '""',
      height: '1px',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '&:hover': {
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(255, 255, 255, 0.4)',
    },
    alignItems: 'center',
    background:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(255, 255, 255, 0.3)',
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(255, 255, 255, 0.2)'
    }`,
    borderRadius: '16px 16px 0 0',
    cursor: 'move',
    display: 'flex',
    justifyContent: 'space-between',

    padding: '12px 16px',

    position: 'relative',
  },

  expandedIndicator: {
    backgroundColor: theme.primary,
    borderRadius: '8px',
    color: 'white',
    fontSize: '10px',
    fontWeight: 500,
    padding: '1px 6px',
  },

  filterGroup: {
    '&:last-child': {
      marginBottom: 0,
    },

    marginBottom: '12px',
  },

  filterSection: {
    '&:last-child': {
      marginBottom: 0,
    },

    marginBottom: '20px',
  },

  floatingPanel: {
    '&:hover': {
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      backdropFilter: 'blur(20px) saturate(180%)',
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(30, 35, 45, 0.75)'
          : 'rgba(255, 255, 255, 0.6)',
      border: `1px solid ${
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.2)'
          : 'rgba(255, 255, 255, 0.4)'
      }`,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 12px 40px rgba(0, 0, 0, 0.7), 0 1px 0 rgba(255, 255, 255, 0.15) inset, 0 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 12px 40px rgba(0, 0, 0, 0.15), 0 1px 0 rgba(255, 255, 255, 0.9) inset, 0 0 0 1px rgba(255, 255, 255, 0.7)',
      transform: 'translateY(-2px)',
    },
    // Ensure the glass effect works on different browsers
    '@supports (backdrop-filter: blur(1px))': {
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(30, 35, 45, 0.6)'
          : 'rgba(255, 255, 255, 0.4)',
    },
    '@supports not (backdrop-filter: blur(1px))': {
      background:
        theme.colorScheme === 'dark'
          ? 'rgba(30, 35, 45, 0.95)'
          : 'rgba(255, 255, 255, 0.95)',
    },
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    backdropFilter: 'blur(16px) saturate(180%)',
    background:
      theme.colorScheme === 'dark'
        ? 'rgba(30, 35, 45, 0.6)'
        : 'rgba(255, 255, 255, 0.4)',
    border: `1px solid ${
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.125)'
        : 'rgba(255, 255, 255, 0.3)'
    }`,
    borderRadius: '16px',
    boxShadow:
      theme.colorScheme === 'dark'
        ? '0 8px 32px rgba(0, 0, 0, 0.6), 0 1px 0 rgba(255, 255, 255, 0.1) inset, 0 0 0 1px rgba(255, 255, 255, 0.05)'
        : '0 8px 32px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.8) inset, 0 0 0 1px rgba(255, 255, 255, 0.5)',
    maxWidth: '400px',
    minWidth: '320px',
    position: 'absolute',

    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

    userSelect: 'none',

    zIndex: 1000,
  },

  gripIcon: {
    color: theme.secondaryText,
    fontSize: '16px',
    marginRight: '8px',
  },

  sectionTitle: {
    color: theme.secondaryText,
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    marginBottom: '8px',
    textTransform: 'uppercase',
  },

  switchLabel: {
    color: theme.headerColor,
    fontSize: '13px',
    margin: 0,
  },

  switchRow: {
    '&:last-child': {
      marginBottom: 0,
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',

    marginBottom: '8px',
  },

  title: {
    color: theme.headerColor,
    fontSize: '14px',
    fontWeight: 600,
    margin: 0,
    marginRight: '12px',
  },
}));

export default useStyles;
