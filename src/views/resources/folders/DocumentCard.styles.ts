import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  btnRow: {
    borderTop: `1px solid ${theme.borderColor}`,
    height: 40,
    marginBottom: 0,
    overflow: 'hidden',
  },
  card: {
    // backgroundColor: 'white',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    overflow: 'hidden',
  },
  content: {
    height: 90,
    margin: 10,
  },
  expandBtn: {
    position: 'absolute',
    right: 8,
    top: 128,
    zIndex: 100,
  },

  folder: { height: 100 },
  image: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 150,
    width: '100%',
  },
  imageExpand: {
    '&:hover': {
      fontSize: '1.6em',
    },
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1.4em',
    transition: 'all 0.2s ease',
  },

  title: { fontSize: 14, fontWeight: 600, height: 45, marginBottom: 5 },
}));

export default useStyles;
