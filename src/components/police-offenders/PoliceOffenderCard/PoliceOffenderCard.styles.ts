import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((_theme: Theme) => ({
  cardContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: '10px 5px 5px 10px ',
  },
  compactCard: {
    display: 'flex',
    flexDirection: 'row',
    height: 230,
    margin: 0,
    overflow: 'hidden',
    padding: 0,
    width: '100%',
  },
  imageContainer: {
    height: 230,
    overflow: 'hidden',
    position: 'relative',
    width: 160,
  },
  tagRow: { marginTop: 5, overflowX: 'auto' },
}));

export default useStyles;
