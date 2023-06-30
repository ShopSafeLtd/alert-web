import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  node: {
    width: '100%',
    height: '100%',
    borderRadius: '15px',
    border: '1px solid #000',
    backgroundColor: theme.componentBackground,
    boxSizing: 'border-box',
  },
  nodeContainer: {
    padding: 15,
    height: '100%',
    width: '100%',
  },
  nodeContainerList: {
    padding: 10,
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  editing: {
    backdropFilter: 'blur(20px)',
    zIndex: 5,
    position: 'absolute',

    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    top: 0,
    left: 0,
    padding: 10,
  },
  incidentListNode: {
    width: 'max-content',
    height: 'min-content',
    borderRadius: '15px',
    border: '1px solid #000',
    backgroundColor: theme.componentBackground,
    boxSizing: 'border-box',
  },
  image: {
    objectFit: 'cover',
    width: 'inherit',
    height: 'inherit',
    zIndex: 4,
    position: 'relative',
    padding: '0px',
  },
}));
export default useStyles;
