import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  headerRow: {
    marginBottom: 10,
  },
  page: {
    height: '100vh',
    overflow: 'auto',
    padding: 20,
  },
  searchInput: {
    width: 400,
  },
});

export default useStyles;
