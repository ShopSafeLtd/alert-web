import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  checkBox: {
    position: 'absolute',
    right: 10,
    top: 0,
    zIndex: 2,
  },
  clearRow: {
    marginTop: 20,
  },
  filter: {
    marginTop: 10,
  },
  filterSelect: {
    marginTop: 5,
    width: '100%',
  },
  filterTitle: {
    fontWeight: 600,
    marginBottom: 5,
  },
  filters: {
    height: 'min-content',
    paddingLeft: 20,
    position: 'sticky',
    top: 0,
  },
  offenders: {
    paddingRight: 10,
  },
  offendersContainerMultiple: {
    borderRight: `1px solid ${theme.borderColor}`,
    height: 'calc(100vh - 350px)',
    overflowY: 'scroll',
    paddingRight: 20,
  },
  offendersContainerSingle: {
    borderRight: `1px solid ${theme.borderColor}`,
    height: 'calc(100vh - 160px)',
    overflowY: 'scroll',
    paddingRight: 20,
  },
  searchBar: {
    marginBottom: 20,
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  selectedOffenders: {
    height: 150,
    overflowX: 'scroll',
  },
  selectedOffendersContainer: {
    borderRight: `1px solid ${theme.borderColor}`,
    paddingRight: 20,
  },
}));

export default useStyles;
