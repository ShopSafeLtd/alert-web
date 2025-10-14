import type { Theme } from '#/configs/ThemeConfig';

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
  position: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexWrap: 'wrap',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
}));

export default useStyles;
