import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  clearRow: {
    marginBottom: 20,
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
    borderLeft: `1px solid ${theme.borderColor}`,
    paddingLeft: 20,
  },
  list: {
    paddingBottom: 20,
    paddingRight: 10,
  },
  searchBar: {
    marginBottom: 20,
  },
}));

export default useStyles;
