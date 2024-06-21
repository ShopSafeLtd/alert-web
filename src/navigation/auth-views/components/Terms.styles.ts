import type { Theme } from '#/configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  background: {
    background: theme.gradientBackground,
    height: '100vh',
    width: '100vw',
    zIndex: 1000,
  },
  cover: {
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  page: {
    width: '100%',
    padding: '0px 0px 60px',
    overflow: 'hidden',
    height: '100%',
    '@media (min-width: 1024px)': {
      padding: '0px',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    margin: '12px 0 12px 12px',
  },
  headerText: {
    margin: '0',
    padding: '0',
  },
  container: {
    margin: '24px 0',
    width: '60%',
    borderRadius: '8px',
  },
  termsText: {
    padding: '1rem',
    paddingTop: '0',
    overflow: 'auto',
    fontSize: '12px',
  },
  termsContainer: {
    height: 'calc(100vh - 64px - 48px - 48px)',
    padding: '0 24px 24px 24px',
    overflow: 'auto',
  },
  termSubHeader: {
    fontWeight: 600,
  },
}));

export default useStyles;
