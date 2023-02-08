import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    padding: 20,
  },
  headerRow: {
    marginBottom: 20,
  },
  loadingPage: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginBottom: '0px !important',
  },
  groupSelect: {
    width: 200,
  },
});

export default useStyles;
