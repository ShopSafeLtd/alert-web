import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  cover: {
    background: theme.gradientBackground,
    height: '100vh',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100vw',
    zIndex: 1000,
  },
  loadingCard: {
    alignItems: 'center',
    background: theme.componentBackground,
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    height: '170px',
    justifyContent: 'center',
    width: '400px',
  },
  loadingLogo: {
    backgroundImage: theme.logo,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '48px',
    paddingRight: '20px',
    width: '250px',
  },
  loadingSpinner: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 30,
  },
  position: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
}));

export default useStyles;
