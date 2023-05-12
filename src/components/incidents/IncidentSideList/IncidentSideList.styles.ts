import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  itemContent: {
    padding: '10px 12px 5px',
  },
  itemDesc: {
    fontSize: 12,
    marginBottom: '5px !important',
  },
  itemDetail: {
    fontSize: 12,
    marginBottom: '2px !important',
  },
  itemIcon: {
    marginRight: 8,
    color: 'rgb(222, 68, 54)',
  },
}));

export default useStyles;
