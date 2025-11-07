import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  menuButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 45,
    zIndex: 100,
  },
}));

export default useStyles;
