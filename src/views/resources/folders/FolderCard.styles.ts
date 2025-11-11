import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow: `0 2px 8px ${theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      cursor: 'pointer',
    },
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  },
  content: {
    height: 90,
    margin: 10,
  },
  deleteButton: {
    '&:disabled': {
      '& svg': {
        color: `${theme.colorScheme === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'} !important`,
        opacity: '1 !important',
      },
      cursor: 'not-allowed !important',
      opacity: '1 !important',
    },
    height: '100%',
  },
  folderIcon: {
    color: theme.colorScheme === 'dark' ? '#ffffff' : '#666666',
    opacity: 0.8,
  },
  iconContainer: {
    alignItems: 'center',
    backgroundColor: theme.imageBackgroundColor,
    display: 'flex',
    height: 150,
    justifyContent: 'center',
    width: '100%',
  },
  statIcon: {
    color:
      theme.colorScheme === 'dark'
        ? 'rgba(255, 255, 255, 0.45)'
        : 'rgba(0, 0, 0, 0.45)',
    fontSize: 18,
    marginBottom: 4,
  },
  statItem: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '6px 12px',
  },
  statValue: {
    color: theme.colorScheme === 'dark' ? '#ffffff' : '#000000',
    fontSize: 16,
    fontWeight: 600,
  },
  statsRow: {
    alignItems: 'center',
    borderTop: `1px solid ${theme.borderColor}`,
    height: 60,
    marginBottom: 0,
    overflow: 'hidden',
  },
  title: {
    fontSize: 16,
    fontWeight: 600,
    height: 45,
    marginBottom: 5,
  },
}));

export default useStyles;
