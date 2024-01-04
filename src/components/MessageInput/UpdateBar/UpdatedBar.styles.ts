import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  icon: {
    marginRight: 10,
    borderColor: theme.borderColor,
  },
}));

export default useStyles;
