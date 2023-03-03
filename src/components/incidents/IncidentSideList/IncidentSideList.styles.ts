import { createUseStyles } from 'react-jss';
import { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  sideList: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    width: 250,
    maxWidth: 250,
    borderRight: '1px solid rgb(237, 242, 249)',
    overflowY: 'scroll',

    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
  },
  item: {
    width: '100%',
    backgroundColor: theme.componentBackground,

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
    marginBottom: 10,
  },
  itemDetail: {
    fontSize: 12,
    marginBottom: 0,
  },
  itemIcon: {
    marginRight: 8,
    color: 'rgb(222, 68, 54)',
  },
}));

export default useStyles;
