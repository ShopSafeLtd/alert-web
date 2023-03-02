import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  offenderSideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 70px)',
    width: 290,
    borderRight: '1px solid rgb(237, 242, 249)',
    '&.current': {
      backgroundColor: '#fafafa',
    },
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
  },
  offenderItem: {
    width: '100%',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fafafa',
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
});

export default useStyles;
