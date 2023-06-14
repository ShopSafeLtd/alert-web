import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    marginBottom: 5,
  },
  imageExpand: {
    position: 'absolute',
    right: 0,
    top: '248px',
    color: '#fff',
    padding: '15px',
    cursor: ' pointer',
    fontSize: '1.6em',
    transition: 'all 0.2s ease',
    '&:hover': {
      fontSize: '1.8em',
      top: '246px',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: 185,
    margin: '10px 20px 0px',
  },
  details: { flex: 1 },
  skeletonImage: {
    height: '150px !important',
    width: '100% !important',
    marginBottom: 10,
  },
  tagRow: {
    overflowX: 'auto',
    paddingBottom: 5,
    marginLeft: -10,
    marginRight: -15,
  },
  descIcon: {
    marginRight: 10,
  },
}));

export default useStyles;
