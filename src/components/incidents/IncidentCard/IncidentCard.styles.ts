import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  alertId: {
    marginBottom: 8,
    marginTop: -5,
  },
  bottomRow: { marginTop: 'auto' },

  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 5px 5px 12px ',
  },
  cardControl: {
    color: '#fff',
    cursor: 'pointer',
    padding: '0 5px',
    transition: 'all 0.2s ease',
  },

  cardControls: {
    left: 0,
    position: 'absolute',
    right: 0,
    top: 65,
    zIndex: 2,
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 10,
  },
  compactCard: {
    display: 'flex',
    flexDirection: 'row',
    height: 150,
    margin: 0,
    overflow: 'hidden',
    padding: 0,
    width: '100%',
  },

  icon: { color: theme.primary, marginRight: 5 },

  image: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 150,
    width: 150,
  },

  imageContainer: {
    height: 150,
    overflow: 'hidden',
    position: 'relative',
    width: 150,
  },
  imageExpand: {
    bottom: 0,
    color: '#fff',
    cursor: 'pointer',
    padding: 5,
    position: 'absolute',
    right: 0,
    transition: 'all 0.2s ease',
    zIndex: 100,
  },
  menuButton: {
    borderBottomLeftRadius: 10,
    borderRadius: 0,
    height: 35,
    margin: 0,
    marginRight: -6,
    marginTop: -25,
    padding: 0,
    width: 35,
    zIndex: 2,
  },
}));
export default useStyles;
