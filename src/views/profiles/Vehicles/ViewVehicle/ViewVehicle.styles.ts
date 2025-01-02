import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  centerCell: {
    alignItems: 'center',
    display: 'flex',
  },
  content: {
    background: theme.bodyBackground,
    borderRight: `1px solid ${theme.borderColor}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto',
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
    padding: '0px 15px 70px 8px',
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
  viewIncident: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100%',
  },
}));
export default useStyles;
