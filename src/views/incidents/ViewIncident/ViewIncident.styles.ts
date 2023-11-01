import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  viewIncident: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    height: '100vh',
  },
  redButton: {
    color: theme.primaryLight,
  },
  detailsHeader: {
    paddingRight: 20,
  },
  updatesContainer: {
    position: 'relative',
    height: '100%',
  },
  detailsContainer: {
    height: '100%',
  },
  detailsContent: {
    background: theme.bodyBackground,
    height: '100%',
    overflow: 'auto',
    borderRight: `1px solid ${theme.borderColor}`,
  },
  details: {
    padding: '0px 15px 70px 8px',
    position: 'relative',
  },
  detail: {
    paddingBottom: '8px !important',
    overflow: 'auto',
  },
  detailTag: { paddingBottom: '5px !important', overflow: 'auto' },
  images: {
    width: '100%',
    padding: '0px 10px',
    margin: '10px 0 15px',
    transition: 'all 0.3s ease-in-out',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  image: {
    height: 160,
    width: 150,
    backgroundColor: theme.imageBackgroundColor,
    cursor: 'pointer',
    borderRadius: 10,
    border: `2px solid ${theme.borderColor}`,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
  },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'all 0.2s ease-in-out',
    opacity: 0,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.3)',
      opacity: 1,
    },
  },
  mapText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 0,
  },
  descIcon: {
    marginRight: 10,
  },
  desc: {
    width: '100%',
  },
  offenderRow: {
    cursor: 'pointer',
  },
  tagLabel: { marginTop: 2 },
  tag: {
    marginBottom: 3,
  },
  approveBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.bodyBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    width: 'calc(100% - 1px)',
    padding: '10px 15px 10px',
    zIndex: 10,
  },
}));
export default useStyles;
