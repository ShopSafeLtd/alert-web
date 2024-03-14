import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  page: {
    padding: 20,
  },
  settingCard: {
    padding: 15,
    cursor: 'pointer',
    maxWidth: 300,
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  settingIcon: {},
  settingP: {
    marginBottom: '0px !important',
    fontSize: 13,
  },
  settingTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  buttonRow: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  cardIcon: {
    borderRadius: 10,
    backgroundColor: theme.imageBackgroundColor,
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardRow: {
    marginBottom: 10,
  },
}));
export default useStyles;
