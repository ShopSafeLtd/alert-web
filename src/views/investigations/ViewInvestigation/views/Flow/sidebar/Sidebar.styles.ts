import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    borderColor: theme.borderColor,
  },
}));

export default useStyles;
