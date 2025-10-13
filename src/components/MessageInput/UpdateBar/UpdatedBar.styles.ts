import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  icon: {
    borderColor: theme.borderColor,
    marginRight: 10,
  },
}));

export default useStyles;
