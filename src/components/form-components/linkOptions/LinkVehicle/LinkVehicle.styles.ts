import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  list: {
    paddingRight: 10,
    paddingBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
  },
  filters: {
    borderLeft: `1px solid ${theme.borderColor}`,
    paddingLeft: 20,
  },
  filterTitle: {
    fontWeight: 600,
    marginBottom: 5,
  },
  filter: {
    marginTop: 10,
  },
  filterSelect: {
    width: '100%',
    marginTop: 5,
  },
  clearRow: {
    marginTop: 30,
  },
}));

export default useStyles;
