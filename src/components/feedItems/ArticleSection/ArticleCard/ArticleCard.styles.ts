import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    // minHeight: 300,
    height: 390,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
    alignItems: 'stretch',
  },
  skeletonImage: {
    height: '150px !important',
    width: '100% !important',
    marginBottom: 10,
  },
}));

export default useStyles;
