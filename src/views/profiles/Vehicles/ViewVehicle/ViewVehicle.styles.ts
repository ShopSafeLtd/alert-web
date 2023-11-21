import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    padding: 20,
  },
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

  detailsHeader: {
    paddingRight: 20,
  },
  updatesContainer: {
    position: 'relative',
    height: '100%',
  },
  content: {
    background: theme.bodyBackground,
    overflow: 'auto',
    borderRight: `1px solid ${theme.borderColor}`,
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  details: {
    padding: '0px 15px 70px 8px',
    position: 'relative',
  },
  detail: {
    paddingBottom: '8px !important',
    overflow: 'auto',
  },
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
  icon: { marginRight: 5 },
}));
export default useStyles;
