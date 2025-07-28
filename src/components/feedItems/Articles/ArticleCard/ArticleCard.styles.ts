import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    '&:hover': {
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      outlineColor: theme.primary,
    },
    backgroundColor: theme.componentBackground,
    borderRadius: 10,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    margin: 10,
    minHeight: 'min-content',
    outline: `1px solid ${theme.borderColor}`,
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, outline-color 0.3s ease',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    margin: '10px 10px 0px',
    minHeight: 'min-content',
  },
  descIcon: {
    marginRight: 10,
  },
  details: { flex: 1 },
  imageExpand: {
    '&:hover': {
      fontSize: '1.8em',
      top: '246px',
    },
    color: '#fff',
    cursor: ' pointer',
    fontSize: '1.6em',
    padding: '15px',
    position: 'absolute',
    right: 0,
    top: '248px',
    transition: 'all 0.2s ease',
  },
  skeletonImage: {
    height: '150px !important',
    marginBottom: 10,
    width: '100% !important',
  },
  tagRow: {
    overflowX: 'auto',
    paddingBottom: 5,
  },
}));

export default useStyles;
