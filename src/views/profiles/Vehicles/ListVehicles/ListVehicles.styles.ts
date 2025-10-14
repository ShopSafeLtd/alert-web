import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  headerRow: {
    marginBottom: 10,
  },
  page: {
    padding: 20,
  },
  searchInput: {
    width: 400,
  },
  selectBox: {
    borderRadius: 100,
    cursor: 'pointer',
    // border: `1px solid ${theme.borderColor}`,
    padding: '5px 15px ',
    position: 'relative',
  },
});

export default useStyles;
