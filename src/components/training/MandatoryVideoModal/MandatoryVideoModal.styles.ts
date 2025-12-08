import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  completedIcon: {
    color: '#52c41a',
    fontSize: '16px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    height: '70vh',
  },
  content: {
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
    display: 'flex',
    flex: 1,
    gap: '24px',
    minHeight: 0,
  },
  continueButton: {
    width: '100%',
  },
  footer: {
    borderTop: `1px solid ${theme.borderColor}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    paddingTop: '16px',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
      cursor: 'pointer',
    },
    borderRadius: '8px',
    padding: '12px',
    transition: 'background-color 0.2s',
  },
  listItemActive: {
    backgroundColor: theme.itemSelectedBackground,
    borderLeft: `3px solid ${theme.primary}`,
  },
  mandatoryBadge: {
    marginLeft: '8px',
  },
  player: {
    '@media (max-width: 768px)': {
      minHeight: '250px',
    },
    flex: 1,
    minWidth: 0,
  },
  playerContainer: {
    backgroundColor: '#000',
    paddingTop: '56.25%',
    position: 'relative',
  },
  playerDescription: {
    color: theme.secondaryText,
    marginBottom: '0',
    marginTop: '8px',
  },
  playerTitle: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '0',
  },
  playerWrapper: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  progressBar: {
    marginTop: '8px',
  },
  videoActions: {
    display: 'flex',
    gap: '8px',
    marginTop: '12px',
  },
  videoInfo: {
    marginTop: '16px',
  },
  videoList: {
    '@media (max-width: 768px)': {
      borderLeft: 'none',
      borderTop: `1px solid ${theme.borderColor}`,
      flex: '1',
      paddingLeft: '0',
      paddingTop: '16px',
    },
    borderLeft: `1px solid ${theme.borderColor}`,
    flex: '0 0 320px',
    overflowY: 'auto',
    paddingLeft: '24px',
  },
  videoListHeader: {
    color: theme.secondaryText,
    fontSize: '12px',
    fontWeight: 600,
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  videoListItemContent: {
    alignItems: 'flex-start',
    display: 'flex',
    gap: '12px',
  },
  videoListItemIcon: {
    flexShrink: 0,
    marginTop: '4px',
  },
  videoListItemText: {
    flex: 1,
  },
  videoListItemTitle: {
    fontSize: '14px',
    fontWeight: 500,
    marginBottom: '4px',
  },
  videoTitle: {
    color: theme.secondaryText,
    fontSize: '12px',
  },
}));

export default useStyles;
