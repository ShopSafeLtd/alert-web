import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  head: { marginBottom: 15, marginTop: 15 },
  read: { marginLeft: 2 },
  unread: {
    color: 'rgb(222, 68, 54)',
  },
  unreadItem: {
    backgroundColor: theme.itemHoverBackground,
    cursor: 'pointer',
    paddingRight: 20,
    paddingLeft: 20,
    '&:hover': {
      backgroundColor: theme.imageBackgroundColor,
    },
  },
  list: {},
  item: {
    cursor: 'pointer',
    paddingRight: 20,
    paddingLeft: 20,
    '&:hover': {
      backgroundColor: theme.imageBackgroundColor,
    },
  },
  date: {
    fontWeight: 'normal',
    fontSize: 12,
    textAlign: 'right',
    width: '100%',
  },
  title: {
    fontWeight: 'strong',
    width: '100%',
  },
}));

export default useStyles;
