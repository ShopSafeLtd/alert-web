import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    padding: 20,
  },
  headerRow: {
    marginBottom: 10,
  },
  searchInput: {
    width: 400,
  },
  selectBox: {
    // border: `1px solid ${theme.borderColor}`,
    padding: '5px 10px 5px 5px',
    borderRadius: 100,
    cursor: 'pointer',
    position: 'relative',
  },
});

export default useStyles;
