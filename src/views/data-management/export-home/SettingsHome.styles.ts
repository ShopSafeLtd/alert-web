import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  buttonRow: {
    marginTop: 10,
  },
  cardIcon: {
    alignItems: 'center',
    backgroundColor: theme.imageBackgroundColor,
    borderRadius: 10,
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  cardRow: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  page: {
    padding: 20,
  },
  settingCard: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    cursor: 'pointer',
    maxWidth: 300,
    padding: 15,
  },
  settingIcon: {},
  settingP: {
    fontSize: 13,
    marginBottom: '0px !important',
  },
  settingTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
}));
export default useStyles;
