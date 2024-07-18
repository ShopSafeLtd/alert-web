import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  filtersTitle: {
    fontWeight: 600,
    marginBottom: '5px !important',
  },
  row: {
    cursor: 'pointer',
  },
  select: {
    marginBottom: 20,
    width: '100%',
  },
  selectBox: {
    borderRadius: 100,
    cursor: 'pointer',
    height: 'auto',
    // border: `1px solid ${theme.borderColor}`,
    padding: '5px 10px ',
    position: 'relative',
  },
  selectTitle: {
    marginBottom: '5px !important',
  },
});

export default useStyles;
