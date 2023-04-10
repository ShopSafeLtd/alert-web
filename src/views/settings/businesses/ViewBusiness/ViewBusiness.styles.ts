import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    display: 'flex',
    // height: 'calc(100vh - 150px)',
    flexWrap: 'nowrap',
    height: '100vh',
  },
  content: {
    width: '100%',
    height: '100vh',
  },
  details: {
    padding: '0 10px 10px',
    height: 'calc(100vh - 85px)',
  },
  detailCol: { height: '100%', overflow: 'auto' },

  cardHeader: {
    marginBottom: 10,
  },
});

export default useStyles;
