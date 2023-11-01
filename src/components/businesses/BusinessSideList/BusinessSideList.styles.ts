import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  offenderSideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflowY: 'scroll',
    maxHeight: '100vh',
    width: 290,
    borderLeft: `1px solid ${theme.borderColor}`,
    borderRight: `1px solid ${theme.borderColor}`,
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
  },
  offenderItem: {
    width: '100%',
    backgroundColor: theme.componentBackground,
    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
    '&.current': {
      backgroundColor: theme.itemSelectedBackground,
    },
  },
  content: {
    padding: '10px 15px',
  },
  divider: {
    margin: 0,
  },
  name: {
    fontSize: 14,
  },
  text: {
    fontSize: 13,
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
    width: 250,
    maxWidth: 250,

    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    padding: 0,
  },
  itemContent: {
    padding: '10px 12px 5px',
  },
}));

export default useStyles;
