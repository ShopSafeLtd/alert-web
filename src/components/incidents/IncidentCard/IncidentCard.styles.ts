import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  compactCard: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    height: 150,
    width: '100%',
  },
  cardOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
  },

  imageContainer: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: 150,
    height: 150,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  cardControls: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 65,
    zIndex: 2,
  },
  cardControl: {
    color: '#fff',
    cursor: 'pointer',
    padding: '0 5px',
    transition: 'all 0.2s ease',
  },
  cardContent: {
    padding: '8px 5px 5px 12px ',
    display: 'flex',
    flexDirection: 'column',
  },

  menuButton: {
    margin: 0,
    padding: 0,
    width: 35,
    height: 35,
    marginTop: -25,
    marginRight: -6,
    zIndex: 2,
    borderRadius: 0,
    borderBottomLeftRadius: 10,
  },

  imageExpand: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    color: '#fff',
    cursor: 'pointer',
    padding: 5,
    transition: 'all 0.2s ease',
    zIndex: 100,
  },

  alertId: {
    marginTop: -5,
    marginBottom: 8,
  },
  icon: { marginRight: 5, color: theme.primary },
  bottomRow: { marginTop: 'auto' },
}));
export default useStyles;
