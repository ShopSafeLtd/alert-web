import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  editing: {
    alignItems: 'center',
    backdropFilter: 'blur(20px)',
    display: 'flex',

    height: '100%',
    left: 0,
    padding: 10,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 5,
  },
  image: {
    height: 'inherit',
    objectFit: 'cover',
    padding: '0px',
    position: 'relative',
    width: 'inherit',
    zIndex: 4,
  },
  incidentListNode: {
    backgroundColor: theme.componentBackground,
    border: '1px solid #000',
    borderRadius: '15px',
    boxSizing: 'border-box',
    height: 'min-content',
    width: 'max-content',
  },
  node: {
    backgroundColor: theme.componentBackground,
    border: '1px solid #000',
    borderRadius: '15px',
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
  },
  nodeContainer: {
    height: '100%',
    padding: 15,
    width: '100%',
  },
  nodeContainerList: {
    height: '100%',
    overflow: 'hidden',
    padding: 10,
    width: '100%',
  },
}));
export default useStyles;
