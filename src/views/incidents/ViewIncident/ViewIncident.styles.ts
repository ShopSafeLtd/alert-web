import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  approveBar: {
    backgroundColor: theme.bodyBackground,
    borderTop: `1px solid ${theme.borderColor}`,
    bottom: 0,
    left: 0,
    padding: '10px 15px 10px',
    position: 'absolute',
    right: 0,
    width: 'calc(100% - 1px)',
    zIndex: 10,
  },
  centerCell: {
    alignItems: 'center',
    display: 'flex',
  },
  checkBox: {
    color: theme.borderColor,
    position: 'absolute',
    right: 8,
    top: 3,
    zIndex: 100,
  },
  content: {
    height: '100vh',
    width: '100%',
  },
  desc: {
    width: '100%',
  },
  descIcon: {
    marginRight: 10,
  },
  detail: {
    overflow: 'auto',
    paddingBottom: '8px !important',
  },
  detailTag: { overflow: 'auto', paddingBottom: '5px !important' },
  details: {
    padding: '0px 15px 70px 8px',
    position: 'relative',
  },
  detailsContainer: {
    height: '100%',
  },
  detailsContent: {
    background: theme.bodyBackground,
    borderRight: `1px solid ${theme.borderColor}`,
    height: '100%',
    overflow: 'auto',
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
  image: {
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
    backgroundColor: theme.imageBackgroundColor,
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    width: 150,
  },
  images: {
    margin: '10px 0 15px',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },
  mapOverlay: {
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.3)',
      opacity: 1,
    },
    alignItems: 'center',
    bottom: 0,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    opacity: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: 'all 0.2s ease-in-out',
    zIndex: 3,
  },
  mapText: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 0,
    marginLeft: 10,
  },
  offenderRow: {
    cursor: 'pointer',
  },
  redButton: {
    color: theme.primaryLight,
  },
  rightSidebar: {
    flex: '0 0 auto',
    height: '100vh',
    position: 'sticky',
    top: 0,
  },
  selectCard: {
    position: 'relative',
  },
  tag: {
    marginBottom: 3,
  },
  tagLabel: { marginTop: 2 },
  updatesContainer: {
    height: '100%',
    position: 'relative',
  },
  viewIncident: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
}));
export default useStyles;
