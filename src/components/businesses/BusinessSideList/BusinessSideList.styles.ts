import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  offenderItem: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: theme.componentBackground,
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
    '&.current': {
      backgroundColor: theme.itemSelectedBackground,
    },
  },
  content: {
    padding: '8px 10px',
  },
  divider: {
    margin: 0,
  },
  name: {
    fontSize: 14,
  },
  text: {
    fontSize: 13,
    marginBottom: '0 !important',
  },
  infiniteScroll: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    width: 210,
    maxWidth: 210,
    padding: 0,
  },
  itemContent: {
    padding: '10px 12px 5px',
  },
}));

export default useStyles;
