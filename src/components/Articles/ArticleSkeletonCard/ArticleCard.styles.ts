import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    marginBottom: 5,
    overflow: 'hidden',
  },
  skeletonImage: {
    marginBottom: 10,
    // height: '180px !important',
    width: '100% !important',
  },
}));

export default useStyles;
