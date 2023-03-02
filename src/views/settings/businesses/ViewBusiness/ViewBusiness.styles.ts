import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    display: 'flex',
    height: 'calc(100vh - 150px)',
    flexWrap: 'nowrap',
  },
  content: {
    width: '100%',
  },
  details: {
    padding: '0 10px 10px',
  },
  recent: {
    height: 'calc(100% - 20px)',
  },
  cardHeader: {
    marginBottom: 10,
  },
});

export default useStyles;
