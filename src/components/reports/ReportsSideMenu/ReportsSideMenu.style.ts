import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.componentBackground,
    borderLeft: `1px solid ${theme.borderColor}`,
    borderRight: `1px solid ${theme.borderColor}`,
    height: '100vh',
    minWidth: 182,
    overflow: 'auto',
    paddingBottom: 10,
    paddingTop: 10,
  },
  item: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
  },
  menuSubTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: '8px !important',
    paddingTop: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: '5px !important',
    paddingLeft: 15,
    paddingRight: 15,
  },
  section: {
    marginBottom: 15,
  },
  selectedItem: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    backgroundColor: theme.itemSelectedBackground,
    borderLeft: `2px solid ${theme.primary}`,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 3,
  },
  subMenu: {
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  text: {},
  title: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 10,
  },
}));
export default useStyles;
