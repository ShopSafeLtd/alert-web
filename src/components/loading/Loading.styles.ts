import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  cover: {
    position: 'absolute',
    background: theme.gradientBackground,
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
    background: theme.componentBackground,
    borderRadius: '10px',
  },
  loadingLogo: {
    width: '250px',
    paddingRight: '20px',
    backgroundImage: theme.logo,
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
}));

export default useStyles;
