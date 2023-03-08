import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
  cardOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
  },
  card: {
    marginBottom: 10,
    position: 'relative',
  },
});

export default styles;
