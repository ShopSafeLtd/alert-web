import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  viewIncident: {
    height: 'calc(100vh - 70px)',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headerBar: {
    width: '100%',
    borderBottom: '1px solid rgb(237, 242, 249)',
    backgroundColor: '#FFF',
    padding: '7px 20px',
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
    height: 'calc(100vh - 123px)',
  },
  detailsHeader: {
    paddingRight: 20,
  },
  updatesContainer: {
    position: 'relative',
    height: '100%',
  },
  detailsContent: {
    background: '#FFF',
    height: '100%',
    overflow: 'auto',
    borderRight: '1px solid rgb(237, 242, 249)',
  },
  details: {
    padding: '15px 20px',
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
    backgroundColor: '#ECEFF1',
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
  },
  offenderRow: {
    cursor: 'pointer',
  },
});

export default useStyles;
