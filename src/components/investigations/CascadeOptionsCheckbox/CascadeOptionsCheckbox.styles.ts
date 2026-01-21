import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  checkboxWrapper: {
    alignItems: 'center',
    display: 'flex',
    gap: 8,
  },
  container: {
    width: '100%',
  },
  tooltipIcon: {
    color: theme.secondaryText,
    cursor: 'help',
    fontSize: 14,
  },
}));

export default useStyles;
