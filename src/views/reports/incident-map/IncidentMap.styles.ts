import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    padding: 20,
  },
  headerRow: {
    marginBottom: 20,
  },
  loadingPage: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    marginBottom: '0px !important',
  },
  groupSelect: {
    width: 200,
  },
  policeHover: {
    position: 'absolute',
    margin: 8,
    padding: 4,
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    maxWidth: 300,
    fontSize: 10,
    zIndex: 9,
    pointerEvents: 'none',
  },
  mapContainer: {
    position: 'relative',
  },
});

export default useStyles;
