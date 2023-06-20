import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles((theme: Theme) => ({
  cardOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
  },
  card: {
    marginBottom: 10,
    position: 'relative',
  },
  selectBox: {
    border: `1px solid ${theme.borderColor}`,
    padding: '5px 15px ',
    borderRadius: 100,
    cursor: 'pointer',
  },
  selectIcon: {
    color: '#4d5b75',
    marginRight: 8,
  },
  clearButton: { alignItems: 'center' },
}));

export default styles;
