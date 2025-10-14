import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  '@media print': {
    sideList: 'display: none !important;',
  },
  infiniteScroll: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
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
    color: 'rgb(222, 68, 54)',
    marginRight: 8,
  },
  sideList: {
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    maxWidth: 250,

    padding: 0,
    width: 250,
  },
}));

export default useStyles;
