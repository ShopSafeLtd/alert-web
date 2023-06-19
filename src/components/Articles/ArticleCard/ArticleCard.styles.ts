import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
    margin: '5px 5px 10px 5px',
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
  },
  imageExpand: {
    position: 'absolute',
    right: 0,
    top: '230px',
    color: '#fff',
    padding: '15px',
    cursor: ' pointer',
    fontSize: '1.6em',
    transition: 'all 0.2s ease',
    '&:hover': {
      fontSize: '1.8em',
    },
  },
  tags: {
    position: 'absolute',
    top: 15,
    left: 20,
    zIndex: 1,
    width: '100%',
  },
  tag: {
    background: 'gba(255, 255, 255, 1)',
    borderColor: 'rgb(222, 68, 54)',
    color: 'rgb(222, 68, 54)',
    fontSize: '500',
  },
  controls: {
    position: 'absolute',
    top: 135,
    left: 0,
    right: 0,
    zIndex: 2,
    width: '100%',
  },
  control: {
    color: '#fff',
    padding: '15px',
    cursor: ' pointer',
    transition: 'all 0.2s ease',
  },
  menuButton: {
    position: 'absolute',
    top: 0,
    right: 9,
    zIndex: 1,
    width: 45,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
  },

  content: {
    display: 'flex',
    flexDirection: 'column',
    height: 200,
    margin: '10px 20px 0px',
  },
  details: { flex: 1 },
  skeletonImage: {
    height: '280px !important',
    width: '100% !important',
    marginBottom: 10,
  },
  tagRow: {
    overflowX: 'auto',
  },
  descIcon: {
    marginRight: 10,
  },
}));

export default useStyles;
