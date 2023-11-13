import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  filters: {
    borderLeft: `1px solid ${theme.borderColor}`,
    paddingLeft: 20,
  },
  filterTitle: {
    fontWeight: 600,
    marginBottom: 5,
  },
  offenders: {
    paddingRight: 10,
    paddingBottom: 20,
  },
  searchBar: {
    marginBottom: 20,
  },
  filter: {
    marginTop: 10,
  },
  filterSelect: {
    width: '100%',
    marginTop: 5,
  },
  clearRow: {
    marginTop: 20,
  },
  card: {
    position: 'relative',
  },
  checkBox: {
    position: 'absolute',
    top: 0,
    right: 10,
    zIndex: 2,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default useStyles;
