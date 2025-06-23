import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.componentBackground,
    borderLeft: `1px solid ${theme.borderColor}`,
    borderRight: `1px solid ${theme.borderColor}`,
    boxShadow:
      theme.colorScheme === 'dark' ? 'none' : '2px 0 8px rgba(0, 0, 0, 0.05)',
    height: '100vh',
    minWidth: 240,
    overflow: 'auto',
    padding: '24px 16px',
  },
  divider: {
    backgroundColor: theme.borderColor,
    height: 1,
    margin: '16px 0',
  },
  icon: {
    alignItems: 'center',
    color: theme.secondaryText,
    display: 'flex',
    fontSize: 16,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  item: {
    '&.active': {
      '& $icon': {
        color: theme.primary,
      },
      '& $text': {
        color: theme.primary,
        fontWeight: '600',
      },
      backgroundColor: `${theme.primary}15`,
      paddingLeft: 9,
    },
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : 'rgba(0, 0, 0, 0.04)',
      transform: 'translateX(2px)',
    },
    alignItems: 'center',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    gap: 12,
    marginBottom: 2,
    padding: '10px 12px',
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  menuIcon: {
    color: theme.primary,
    fontSize: 24,
  },
  menuTitle: {
    alignItems: 'center',
    color: theme.headerColor,
    display: 'flex',
    fontSize: 20,
    fontWeight: '700',
    gap: 10,
    marginBottom: '24px !important',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: theme.secondaryText,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: '0.5px',
    marginBottom: '12px !important',
    paddingLeft: 12,
    textTransform: 'uppercase',
  },
  text: {
    color: theme.colorScheme === 'dark' ? '#e1e4e8' : '#2c3e50',
    fontSize: 14,
    transition: 'color 0.2s ease',
  },
}));
export default useStyles;
