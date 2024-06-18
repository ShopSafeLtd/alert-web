import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRight: `1px solid ${theme.borderColor}`,
    borderLeft: `1px solid ${theme.borderColor}`,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: theme.componentBackground,
    minWidth: 182,
  },
  section: {
    marginBottom: 15,
  },
  item: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  selectedItem: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 5,
    backgroundColor: theme.itemSelectedBackground,
    borderLeft: `2px solid ${theme.primary}`,
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  text: {},
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: '5px !important',
    paddingLeft: 15,
    paddingRight: 15,
  },
  title: {
    marginBottom: 10,
    fontSize: 13,
    fontWeight: '600',
  },
  menuSubTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: '8px !important',
    paddingTop: 8,
  },
  subMenu: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
  },
}));
export default useStyles;
