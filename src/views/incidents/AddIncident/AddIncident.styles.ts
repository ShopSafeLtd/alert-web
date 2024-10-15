import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const styles = createUseStyles((theme: Theme) => ({
  card: {
    marginBottom: 10,
    position: 'relative',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 10,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  cctvCard: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 10,
  },
  clearButton: { alignItems: 'center' },
  selectBox: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    cursor: 'pointer',
    padding: '5px 15px ',
  },
  selectIcon: {
    color: '#4d5b75',
    marginRight: 8,
  },
}));

export default styles;
