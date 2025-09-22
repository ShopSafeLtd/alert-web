import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  groupSelect: {
    width: 200,
  },
  headerRow: {
    marginBottom: 20,
  },
  loadingContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },
  loadingOverlay: {
    alignItems: 'center',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(31, 31, 31, 0.95)'
        : 'rgba(255, 255, 255, 0.95)',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  loadingPage: {
    alignItems: 'center',
    display: 'flex',
  },
  loadingText: {
    color: theme.colorScheme === 'dark' ? '#cbd5e1' : '#475569',
    fontSize: 14,
    fontWeight: 500,
  },
  mapContainer: {
    height: '100vh',
    position: 'relative',
    width: '100%',
  },
  page: {},
  policeHover: {
    background: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    fontSize: 10,
    margin: 8,
    maxWidth: 300,
    padding: 4,
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 9,
  },
  title: {
    marginBottom: '0px !important',
  },
  titleContainer: {
    padding: '10px 20px',
  },
}));

export default useStyles;
