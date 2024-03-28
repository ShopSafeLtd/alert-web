import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  image: {
    height: 150,
    width: 150,
    borderRadius: 10,
    overflow: 'hidden',
    border: `1px solid ${theme.borderColor}`,
    cursor: 'pointer',
  },
  container: {
    position: 'relative',
  },
  check: {
    position: 'absolute',
    top: 5,
    right: 12,
    zIndex: 10,
    background: '#FFF',
    borderRadius: '100%',
    width: 21,
    height: 21,
    cursor: 'pointer',
  },
  row: { marginTop: 10 },
}));

export default useStyles;
