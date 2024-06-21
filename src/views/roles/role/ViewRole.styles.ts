import { createUseStyles } from 'react-jss';
import type { Theme } from '../../../configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  '@media print': {
    offenderSideList: 'display: none !important;',
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
  borderLeft: {
    borderLeft: `1px solid ${theme.borderColor}`,
    paddingLeft: 10,

    background: theme.bodyBackground,
    height: '100vh',
    overflow: 'auto',

    padding: '0 5px',
  },
  prefixIcon: {
    marginRight: 10,
  },
  stats: {
    margin: 10,
  },
}));

export default useStyles;
