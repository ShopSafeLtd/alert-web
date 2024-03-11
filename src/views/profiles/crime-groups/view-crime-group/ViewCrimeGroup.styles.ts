import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    padding: 20,
  },
  headerBar: {
    width: '100%',
    padding: '7px 0px 3px',
    display: 'flex',
    alignItems: 'center',
  },
  headerTitle: {
    marginBottom: '0px !important',
  },
  centerCell: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: 'calc(100vh - 60px)',
    marginTop: '5px',
  },
  detailsHeader: {
    paddingRight: 20,
  },
  updatesContainer: {
    position: 'relative',
    height: '100%',
  },
  detailsContent: {
    background: theme.bodyBackground,
    height: '100%',
    overflow: 'auto',
    borderRight: `1px solid ${theme.borderColor}`,
    padding: '0 5px',
    position: 'relative',
  },
  details: {
    padding: '10px 15px 70px 8px',
    position: 'relative',
  },
  detail: {
    paddingBottom: '8px !important',
    overflow: 'auto',
  },
  images: {
    width: '100%',
    height: 180,
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    overflowY: 'hidden',
    overflowX: 'auto',
    '@media only screen and (min-height: 800px)': {
      height: 250,
    },
  },
  image: {
    height: 160,
    width: 160,
    backgroundColor: theme.imageBackgroundColor,
    cursor: 'pointer',
    borderRadius: 5,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      height: 170,
      width: 170,
      '@media only screen and (min-height: 800px)': {
        height: 240,
        width: 240,
      },
    },
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 230,
    },
  },
  descIcon: {
    marginRight: 10,
  },
  desc: {
    marginBottom: 30,
    width: '100%',
  },
  offenderRow: {
    cursor: 'pointer',
  },
  intelToggleButton: {
    position: 'absolute',
    top: 'calc(50% - 60px)',
    left: -35,
    width: 35,
    backgroundColor: theme.imageBackgroundColor,
    zIndex: 500,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    border: `1px solid ${theme.borderColor}`,
  },
  intelToggleButtonSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    width: '100%',
    borderBottom: `1px solid ${theme.borderColor}`,
    position: 'relative',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  intelToggleButtonBadge: {
    backgroundColor: theme.primary,
    borderColor: theme.borderColor,
    position: 'absolute',
    top: 6,
    right: 2,
    borderRadius: 100,
    padding: '2px 4px',
    fontSize: 10,
    fontWeight: '600',
  },
  intelToggleButtonBadgeRead: {
    backgroundColor: theme.componentBackground,
    borderColor: theme.borderColor,
    position: 'absolute',
    top: 6,
    right: 2,
    borderRadius: 100,
    padding: '2px 4px',
    fontSize: 10,
    fontWeight: '600',
  },
}));
export default useStyles;
