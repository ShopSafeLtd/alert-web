import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageHeader: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 0,
    marginTop: 10,
    position: 'relative',
  },
  pageActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    '& > *': {
      marginLeft: 10,
    },
    marginRight: 10,
  },
});
export default useStyles;
