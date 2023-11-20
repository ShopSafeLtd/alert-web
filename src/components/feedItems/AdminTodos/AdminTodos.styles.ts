import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  title: { marginTop: 8, fontSize: 16 },
  header: { padding: '10px 25px' },
  contentRow: {
    padding: '10px 20px',
    backgroundColor: theme.componentBackground,
  },
}));

export default useStyles;
