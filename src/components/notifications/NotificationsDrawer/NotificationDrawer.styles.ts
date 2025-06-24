import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : 'rgba(0, 0, 0, 0.02)',
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-2px)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 12,
    cursor: 'pointer',
    padding: 16,
    transition: 'all 0.2s ease',
  },
  cardWrapper: {
    marginBottom: 0,
  },
  date: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  description: {
    color:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.65)'
        : theme.secondaryText,
    display: 'block',
    fontSize: 13,
    lineHeight: 1.5,
  },
  head: {
    marginBottom: 20,
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconWrapper: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(0, 0, 0, 0.04)',
    borderRadius: '50%',
    display: 'flex',
    flexShrink: 0,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  notificationsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxHeight: 'calc(100vh - 200px)',
    overflowY: 'auto',
    padding: '0 20px',
  },
  read: {
    color: theme.secondaryText,
    marginLeft: 2,
  },
  title: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 4,
    width: '100%',
  },
  unread: {
    color: theme.primary,
  },
  unreadCard: {
    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.itemHoverBackground
          : 'rgba(0, 0, 0, 0.02)',
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-2px)',
    },
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.02)'
        : theme.componentBackground,
    border: `1px solid ${theme.primary}`,
    borderRadius: 12,
    cursor: 'pointer',
    padding: 16,
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  unreadIconWrapper: {
    backgroundColor: `${theme.primary}15`,
  },
}));

export default useStyles;
