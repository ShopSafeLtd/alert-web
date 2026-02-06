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
      boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
    },
    alignItems: 'center',
    background: theme.componentBackground,
    border: `1.5px solid ${theme.borderColor}`,
    borderRadius: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    cursor: 'pointer',
    display: 'flex',
    gap: 16,
    padding: 20,
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  knownBeforeCardCheckmark: {
    alignItems: 'center',
    background: theme.primary,
    borderRadius: '50%',
    color: '#ffffff',
    display: 'flex',
    fontSize: 14,
    height: 28,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 28,
  },
  knownBeforeCardContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  knownBeforeCardDescription: {
    color: theme.secondaryText,
    fontSize: 14,
    lineHeight: '1.6',
  },
  knownBeforeCardDisabled: {
    '&:hover': {
      borderColor: theme.borderColor,
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    },
    background: theme.bodyBackground,
    borderColor: theme.borderColor,
    cursor: 'not-allowed',
    opacity: 0.7,
    pointerEvents: 'none',
  },
  knownBeforeCardIcon: {
    color: theme.primary,
    flexShrink: 0,
    fontSize: 36,
  },
  knownBeforeCardSelected: {
    background: `${theme.primary}08`,
    borderColor: theme.primary,
    borderWidth: 2.5,
    boxShadow: `0 0 0 4px ${theme.primary}15, 0 4px 12px rgba(0,0,0,0.12)`,
  },
  knownBeforeCardTitle: {
    color: theme.headerColor,
    fontSize: 16,
    fontWeight: 600,
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
