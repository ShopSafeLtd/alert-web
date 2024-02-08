import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles((theme: Theme) => ({
  selectBox: {
    border: `1px solid ${theme.borderColor}`,
    padding: 5,
    borderRadius: 100,
    cursor: 'pointer',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1,
  },
  selectIcon: {
    color: '#4d5b75',
    marginRight: 8,
  },
}));

export default styles;
