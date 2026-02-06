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
  knownBeforeCard: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      transform: 'translateY(-2px)',
    },
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 8,
    cursor: 'pointer',
    padding: 16,
    position: 'relative',
    transition: 'all 0.2s ease',
  },
  knownBeforeCardCheckmark: {
    color: theme.primary,
    fontSize: 20,
    position: 'absolute',
    right: 12,
    top: 12,
  },
  knownBeforeCardDescription: {
    color: theme.secondaryText,
    fontSize: 14,
    lineHeight: '1.5',
  },
  knownBeforeCardDisabled: {
    '&:hover': {
      boxShadow: 'none',
      transform: 'none',
    },
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  knownBeforeCardIcon: {
    color: theme.primary,
    fontSize: 32,
    marginBottom: 12,
  },
  knownBeforeCardSelected: {
    borderColor: theme.primary,
    borderWidth: 2,
    boxShadow: `0 0 0 3px ${theme.primary}20`,
  },
  knownBeforeCardTitle: {
    color: theme.headerColor,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 8,
  },
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
  stockRow: {
    borderBottom: `2px solid ${theme.borderColor}`,
    marginBottom: 20,
  },
}));

export default styles;
