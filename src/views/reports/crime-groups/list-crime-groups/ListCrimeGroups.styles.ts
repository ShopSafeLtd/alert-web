import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    padding: 20,
    height: '100vh',
    overflow: 'auto',
  },
  headerRow: {
    marginBottom: 10,
  },
  searchInput: {
    width: 400,
  },
});

export default useStyles;
