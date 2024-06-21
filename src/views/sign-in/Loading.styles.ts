import type { Theme } from '#/configs/ThemeConfig';
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
    alignContent: 'center',
    flexWrap: 'wrap',
  },
}));

export default useStyles;
