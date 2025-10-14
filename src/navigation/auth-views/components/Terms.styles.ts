import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  background: {
    background: theme.gradientBackground,
    height: '100vh',
    width: '100vw',
    zIndex: 1000,
  },
  container: {
    borderRadius: '8px',
    margin: '24px 0',
    width: '60%',
  },
  cover: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    margin: '12px 0 12px 12px',
    padding: '12px',
  },
  headerText: {
    margin: '0',
    padding: '0',
  },
  page: {
    '@media (min-width: 1024px)': {
      padding: '0px',
    },
    height: '100%',
    overflow: 'hidden',
    padding: '0px 0px 60px',
    width: '100%',
  },
  termSubHeader: {
    fontWeight: 600,
  },
  termsContainer: {
    height: 'calc(100vh - 64px - 48px - 48px)',
    overflow: 'auto',
    padding: '0 24px 24px 24px',
  },
  termsText: {
    fontSize: '12px',
    overflow: 'auto',
    padding: '1rem',
    paddingTop: '0',
  },
}));

export default useStyles;
