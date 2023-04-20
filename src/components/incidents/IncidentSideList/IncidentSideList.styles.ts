import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  sideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    width: 250,
    maxWidth: 250,
    overflowY: 'scroll',

    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    padding: 10,
  },
  item: {
    width: '100%',
    marginBottom: 8,
    backgroundColor: theme.componentBackground,
    borderRadius: 10,

    '&:hover': {
      backgroundColor: theme.itemHoverBackground,
    },
    '&.current': {
      backgroundColor: theme.itemSelectedBackground,
    },
  },
  itemImage: {},
  itemImageSkeleton: {},
  itemContent: {
    padding: '15px 15px 5px',
  },
  itemDivider: {
    margin: 0,
  },
  itemDesc: {
    fontSize: 12,
    marginBottom: '5px !important',
  },
  itemDetail: {
    fontSize: 12,
    marginBottom: '2px !important',
  },
  itemIcon: {
    marginRight: 8,
    color: 'rgb(222, 68, 54)',
  },
}));

export default useStyles;
