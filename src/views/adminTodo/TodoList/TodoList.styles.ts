import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  title: {
    marginLeft: 5,
    marginTop: 15,
    fontSize: 16,
    backgroundColor: theme.componentBackground,
  },
}));

export default useStyles;
