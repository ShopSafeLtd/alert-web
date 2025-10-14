import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  pageActions: {
    '& > *': {
      marginLeft: 10,
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  pageHeader: {
    marginTop: 10,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
  },
});
export default useStyles;
