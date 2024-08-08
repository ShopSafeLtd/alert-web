import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  cardBody: {
    backgroundColor: theme.componentBackground,
    padding: '15px 10px',
  },

  descIcon: {
    marginRight: 10,
  },
  descItem: { paddingBottom: 0 },
  descLabel: { fontWeight: 'bold' },
  mockupCard: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    height: 400,
    overflow: 'hidden',
    width: 300,
  },
  select: {
    width: 150,
  },
  toolbar: {
    backgroundColor: theme.bodyBackground,
    padding: 10,
  },
}));

export default useStyles;
