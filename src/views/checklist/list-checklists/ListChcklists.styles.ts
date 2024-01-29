import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  innerPage: {
    padding: 20,
    paddingTop: 0,
  },
  searchInput: {
    width: 400,
  },
  row: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  page: {
    height: '100vh',
    // paddingTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginRight: 0,
    paddingRight: 0,
    // overflow: 'hidden',
    '& .no-padding': {
      padding: 0,
    },
  },
});

export default useStyles;
