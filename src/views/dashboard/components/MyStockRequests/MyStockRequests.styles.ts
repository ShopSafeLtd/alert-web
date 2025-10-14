import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  contentRow: {
    backgroundColor: theme.componentBackground,
    padding: '10px 20px',
  },
  header: { padding: '10px 25px' },
  highlightedRow: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? 'rgba(250, 173, 20, 0.15) !important'
        : 'rgba(250, 173, 20, 0.1) !important',
    padding: '10px 20px',
  },
  title: { fontSize: 16, marginTop: 8 },
}));

export default useStyles;
