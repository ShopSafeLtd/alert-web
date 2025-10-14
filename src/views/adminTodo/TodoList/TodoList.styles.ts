import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    backgroundColor: theme.componentBackground,
    fontSize: 16,
    marginLeft: 5,
    marginTop: 15,
  },
}));

export default useStyles;
