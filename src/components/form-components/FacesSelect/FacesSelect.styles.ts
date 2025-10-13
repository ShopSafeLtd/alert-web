import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  check: {
    background: '#FFF',
    borderRadius: '100%',
    cursor: 'pointer',
    height: 21,
    position: 'absolute',
    right: 12,
    top: 5,
    width: 21,
    zIndex: 10,
  },
  container: {
    position: 'relative',
  },
  image: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 150,
    overflow: 'hidden',
    width: 150,
  },
  row: { marginTop: 10 },
}));

export default useStyles;
