import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  container: {
    padding: '24px',
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '24px',
  },
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: '16px',
    marginTop: '16px',
  },
  titleIcon: {
    color: '#1890ff',
  },
});

export default useStyles;
