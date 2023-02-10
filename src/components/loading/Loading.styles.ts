import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  cover: {
    position: 'absolute',
    background: 'linear-gradient(to right, #cb2d3e, #ef473a)',
    height: '100vh',
    width: '100vw',
    zIndex: 1000,
    top: 0,
    left: 0,
  },
  position: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
  },
  loadingCard: {
    width: '400px',
    height: '170px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'white',
    borderRadius: '10px',
  },
  loadingLogo: {
    width: '250px',
    paddingRight: '20px',
    backgroundImage: 'url(/img/logo.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '48px',
  },
  loadingSpinner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
});

export default useStyles;
