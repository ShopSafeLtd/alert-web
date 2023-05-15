import { createUseStyles } from 'react-jss';
import type { Theme } from '../../../../../configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    padding: 20,
  },
  updatesContainer: {
    position: 'relative',
    height: '100%',
    borderLeft: `1px solid ${theme.borderColor}`,
  },
  headerBar: {
    width: '100%',
    borderBottom: `1px solid ${theme.borderColor}`,
    padding: '7px 20px',
    display: 'flex',
    alignItems: 'center',
    height: 60,
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
    height: 'calc(100vh - 65px)',
  },
  detailsHeader: {
    paddingRight: 20,
  },
  detailsContainer: {
    padding: 15,
    paddingBottom: 0,
    height: '100%',
    overflow: 'auto',
  },
  table: {
    marginTop: 10,
  },
  detailsContent: {
    background: theme.bodyBackground,
    height: '100%',
    overflow: 'auto',
    borderRight: `1px solid ${theme.borderColor}`,
  },
  details: {
    padding: '15px 20px',
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
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: theme.imageBackgroundColor,
    cursor: 'pointer',
    borderRadius: 5,
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
}));

export default useStyles;
