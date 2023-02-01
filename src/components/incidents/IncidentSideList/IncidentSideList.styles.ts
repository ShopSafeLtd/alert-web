import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  sideList: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 'calc(100vh - 70px)',
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
    backgroundColor: '#fff',

    '&:hover': {
      backgroundColor: '#fafafa',
    },
    '&.current': {
      backgroundColor: '#fafafa',
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
});

export default useStyles;
