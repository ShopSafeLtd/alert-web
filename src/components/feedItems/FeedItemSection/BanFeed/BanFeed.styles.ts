import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles((theme: Theme) => ({
  contentContainer: {},
  contentHeader: {
    paddingLeft: 15,
    paddingRight: 8,
    height: 30,
  },
  content: {
    padding: '8px 8px 5px 15px ',
    display: 'flex',
    flexDirection: 'column',
    cursor: 'pointer',
  },
  bottomRow: { marginTop: 'auto' },
  icon: { marginRight: 5, color: theme.primary },
}));

export default styles;
