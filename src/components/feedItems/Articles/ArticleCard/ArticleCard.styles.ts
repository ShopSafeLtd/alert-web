import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    outline: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    minHeight: 'min-content',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
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
    minHeight: 'min-content',
    margin: '10px 10px 0px',
    flexGrow: 1,
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
  },
  descIcon: {
    marginRight: 10,
  },
}));

export default useStyles;
