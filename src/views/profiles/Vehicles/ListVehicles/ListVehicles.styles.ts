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
    padding: '5px 15px ',
    borderRadius: 100,
    cursor: 'pointer',
    position: 'relative',
  },
});

export default useStyles;
