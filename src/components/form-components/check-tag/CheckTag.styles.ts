import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const styles = createUseStyles((theme: Theme) => ({
  overlay: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  selectBox: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    cursor: 'pointer',
    padding: 5,
    paddingRight: 8,
    position: 'relative',
  },
  selectIcon: {
    color: '#4d5b75',
    marginRight: 8,
  },
}));

export default styles;
