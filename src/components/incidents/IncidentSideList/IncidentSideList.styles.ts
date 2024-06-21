import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  itemContent: {
    padding: '10px 12px 5px',
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
  '@media print': {
    sideList: 'display: none !important;',
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
}));

export default useStyles;
