import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const styles = createUseStyles((theme: Theme) => ({
  bottomRow: { marginTop: 'auto' },
  content: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    padding: '8px 8px 5px 15px ',
  },

  contentContainer: {
    // width: '100%',
  },
  contentHeader: {
    backgroundColor: theme.borderColor,
    height: 30,
    paddingLeft: 15,
    paddingRight: 8,
  },
  icon: { color: theme.primary, marginRight: 5 },
}));

export default styles;
