import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  centerCell: {
    alignItems: 'center',
    display: 'flex',
  },
  content: {
    height: 'calc(100vh - 60px)',
    marginTop: '5px',
    width: '100%',
  },
  desc: {
    marginBottom: 30,
    width: '100%',
  },
  descIcon: {
    marginRight: 10,
  },
  detail: {
    overflow: 'auto',
    paddingBottom: '8px !important',
  },
  details: {
    padding: '10px 15px 70px 8px',
    position: 'relative',
  },
  detailsContent: {
    background: theme.bodyBackground,
    borderRight: `1px solid ${theme.borderColor}`,
    height: '100%',
    overflow: 'auto',
    padding: '0 5px',
    position: 'relative',
  },
  detailsHeader: {
    paddingRight: 20,
  },
  headerBar: {
    alignItems: 'center',
    display: 'flex',
    padding: '7px 0px 3px',
    width: '100%',
  },
  headerTitle: {
    marginBottom: '0px !important',
  },
  icon: { marginRight: 5 },
  image: {
    '&:hover': {
      '@media only screen and (min-height: 800px)': {
        height: 240,
        width: 240,
      },
      height: 170,
      width: 170,
    },
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 230,
    },
    backgroundColor: theme.imageBackgroundColor,
    borderRadius: 5,
    cursor: 'pointer',
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    width: 160,
  },
  images: {
    '@media only screen and (min-height: 800px)': {
      height: 250,
    },
    height: 180,
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },
  intelToggleButton: {
    alignItems: 'center',
    backgroundColor: theme.imageBackgroundColor,
    border: `1px solid ${theme.borderColor}`,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: -35,
    overflow: 'hidden',
    position: 'absolute',
    top: 'calc(50% - 60px)',
    width: 35,
    zIndex: 500,
  },
  intelToggleButtonBadge: {
    backgroundColor: theme.primary,
    borderColor: theme.borderColor,
    borderRadius: 100,
    fontSize: 10,
    fontWeight: '600',
    padding: '2px 4px',
    position: 'absolute',
    right: 2,
    top: 6,
  },
  intelToggleButtonBadgeRead: {
    backgroundColor: theme.componentBackground,
    borderColor: theme.borderColor,
    borderRadius: 100,
    fontSize: 10,
    fontWeight: '600',
    padding: '2px 4px',
    position: 'absolute',
    right: 2,
    top: 6,
  },
  intelToggleButtonSection: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    borderBottom: `1px solid ${theme.borderColor}`,
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    position: 'relative',
    width: '100%',
  },
  offenderRow: {
    cursor: 'pointer',
  },
  page: {
    padding: 20,
  },
  toolBtn: { borderLeft: 'none', borderRadius: 0, padding: '8.5px .9rem' },

  updatesContainer: {
    height: '100%',
    position: 'relative',
  },
}));
export default useStyles;
