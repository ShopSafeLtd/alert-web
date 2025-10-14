import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  innerPage: {
    padding: 20,
    paddingTop: 0,
  },
  page: {
    // overflow: 'hidden',
    '& .no-padding': {
      padding: 0,
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    marginRight: 0,
    paddingRight: 0,
    // paddingTop: 10,
    width: '100%',
  },
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  searchInput: {
    width: 400,
  },
});

export default useStyles;
