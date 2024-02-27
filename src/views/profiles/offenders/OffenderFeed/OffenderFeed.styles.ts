import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  selectTitle: {
    marginBottom: '5px !important',
  },
  select: {
    marginBottom: 20,
    width: '100%',
  },
  filtersTitle: {
    fontWeight: 600,
    marginBottom: '5px !important',
  },
  selectBox: {
    // border: `1px solid ${theme.borderColor}`,
    padding: '5px 10px ',
    borderRadius: 100,
    cursor: 'pointer',
    position: 'relative',
    height: 'auto',
  },
});

export default useStyles;
