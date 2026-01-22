import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  alertId: {
    marginTop: -10,
  },
  bottomContainer: { height: 85, marginTop: 10 },
  bottomRow: { marginTop: 6 },
  cardContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '10px 5px 5px 10px ',
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
  cardIcon: {
    color: theme.secondaryText,
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
  descriptionRow: {
    marginBottom: 6,
  },
  icon: { color: theme.secondaryText },
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
    width: 120,
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
    marginTop: -12,
    minWidth: 35,
    padding: 0,
    zIndex: 100,
  },
  priorityBadge: {
    marginRight: 4,
  },
  schemesIndicator: {
    marginTop: 4,
  },
  tagRow: { marginTop: 5, overflowX: 'auto' },
}));

export default useStyles;
