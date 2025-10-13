import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  content: {
    padding: '8px 10px',
  },
  divider: {
    margin: 0,
  },
  infiniteScroll: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  itemContent: {
    padding: '10px 12px 5px',
  },
  name: {
    fontSize: 14,
  },
  offenderItem: {
    '&.current': {
      backgroundColor: theme.itemSelectedBackground,
    },
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
    backgroundColor: theme.componentBackground,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  sideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    maxWidth: 210,
    padding: 0,
    width: 210,
  },
  text: {
    fontSize: 13,
    marginBottom: '0 !important',
  },
}));

export default useStyles;
