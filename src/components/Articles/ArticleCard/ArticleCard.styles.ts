import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 460,
    margin: '5px 5px 10px 5px',
    marginBottom: 10,
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    // height: 220,
    margin: '20px 20px 0px',
  },
  control: {
    color: '#fff',
    cursor: ' pointer',
    padding: '15px',
    transition: 'all 0.2s ease',
  },
  controls: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 135,
    width: '100%',
    zIndex: 2,
  },
  descIcon: {
    marginRight: 10,
  },
  details: { height: 150 },
  image: {
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 250,
    width: '100%',
  },
  imageExpand: {
    '&:hover': {
      fontSize: '1.8em',
    },
    color: '#fff',
    cursor: ' pointer',
    fontSize: '1.6em',
    padding: '15px',
    position: 'absolute',
    right: 0,
    top: '200px',
    transition: 'all 0.2s ease',
  },
  menuButton: {
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 8,
    position: 'absolute',
    right: 9,
    top: 5,
    width: 45,
    zIndex: 100,
  },

  skeletonImage: {
    height: '280px !important',
    marginBottom: 10,
    width: '100% !important',
  },
  status: {
    fontSize: '1em',
    height: '2em',
    left: 10,
    position: 'absolute',
    top: 5,
    transition: 'all 0.2s ease',
  },

  tag: {
    background: 'gba(255, 255, 255, 1)',
    borderColor: 'rgb(222, 68, 54)',
    color: 'rgb(222, 68, 54)',
    fontSize: '500',
  },
  tagRow: {
    overflowX: 'auto',
  },
  tags: {
    left: 20,
    position: 'absolute',
    top: 15,
    width: '100%',
    zIndex: 1,
  },
}));

export default useStyles;
