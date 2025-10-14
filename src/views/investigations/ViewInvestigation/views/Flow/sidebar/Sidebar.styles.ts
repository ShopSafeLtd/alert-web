import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    borderColor: theme.borderColor,
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default useStyles;
