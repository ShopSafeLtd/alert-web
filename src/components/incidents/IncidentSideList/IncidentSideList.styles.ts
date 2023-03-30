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
    borderLeft: `1px solid ${theme.borderColor}`,
    borderRight: `1px solid ${theme.borderColor}`,
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
