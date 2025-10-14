import { createUseStyles } from 'react-jss';

import type { Theme } from '../../../configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  '@media print': {
    offenderSideList: 'display: none !important;',
  },
  borderLeft: {
    background: theme.bodyBackground,
    borderLeft: `1px solid ${theme.borderColor}`,

    height: '100vh',
    overflow: 'auto',
    padding: '0 5px',

    paddingLeft: 10,
  },
  content: {
    padding: 10,
  },
  divider: {
    margin: 0,
  },
  name: {
    fontSize: 14,
    marginBottom: '0px !important',
  },
  pageView: {
    padding: 15,
    paddingBottom: 0,
  },
  prefixIcon: {
    marginRight: 10,
  },
  stats: {
    margin: 10,
  },
}));

export default useStyles;
