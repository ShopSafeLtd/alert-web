import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    display: 'flex',
    // height: 'calc(100vh - 150px)',
    flexWrap: 'nowrap',
    height: '100vh',
  },
  content: {
    background: theme.bodyBackground,
    overflow: 'auto',
    borderRight: `1px solid ${theme.borderColor}`,
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  headerBar: {
    width: '100%',
    padding: '7px 0px 15px',
    display: 'flex',
    alignItems: 'center',
  },

  details: {
    padding: '0px 15px 70px 8px',
    position: 'relative',
  },

  cardHeader: {
    marginBottom: 10,
  },
  updatesContainer: {
    // position: 'relative',
    height: '100%',
    overflow: 'auto',
  },
  tag: {
    marginBottom: 3,
  },
}));

export default useStyles;
