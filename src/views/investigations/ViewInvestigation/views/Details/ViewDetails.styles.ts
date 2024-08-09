import { createUseStyles } from 'react-jss';

import type { Theme } from '../../../../../configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  centerCell: {
    alignItems: 'center',
    display: 'flex',
  },
  content: {
    height: '100%',
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
    padding: '15px 20px',
  },
  detailsContainer: {
    height: '100%',
    overflow: 'auto',
    padding: 15,
    paddingBottom: 0,
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
    borderBottom: `1px solid ${theme.borderColor}`,
    display: 'flex',
    height: 60,
    padding: '7px 20px',
    width: '100%',
  },
  headerTitle: {
    marginBottom: '0px !important',
  },
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
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: 5,
    cursor: 'pointer',
    height: 160,
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
  page: {
    padding: 20,
  },
  table: {
    marginTop: 10,
  },
  updatesContainer: {
    borderLeft: `1px solid ${theme.borderColor}`,
    height: '100%',
    position: 'relative',
  },
}));

export default useStyles;
