import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  cardHeader: {
    marginBottom: 10,
  },
  content: {
    background: theme.bodyBackground,
    borderRight: `1px solid ${theme.borderColor}`,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'auto',
    padding: 15,
    width: '100%',
  },
  details: {
    position: 'relative',
  },
  headerBar: {
    alignItems: 'center',
    display: 'flex',
    padding: '7px 0px 15px',
    width: '100%',
  },
  headerTitle: {
    marginBottom: '0px !important',
  },
  page: {
    display: 'flex',
    // height: 'calc(100vh - 150px)',
    flexWrap: 'nowrap',
    height: '100vh',
  },
  tag: {},
  updatesContainer: {
    // position: 'relative',
    height: '100%',
    overflow: 'auto',
  },
}));

export default useStyles;
