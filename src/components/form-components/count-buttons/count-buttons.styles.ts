import { createUseStyles } from 'react-jss';
import type { Theme } from 'configs/ThemeConfig';

const useStyles = createUseStyles((theme: Theme) => ({
  countCard: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 12px',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  countCardSelected: {
    border: `1px solid ${theme.primary}`,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 12px',
    cursor: 'pointer',
    userSelect: 'none',
    color: theme.primary,
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  countCardContainer: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  countCardContent: {
    cursor: 'pointer',
    padding: '0px 5px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
  },
  countCardButtonRight: {
    padding: '6px 8px 6px 8px',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    userSelect: 'none',
    cursor: 'pointer',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  countCardButtonLeft: {
    padding: '6px 8px 6px 8px',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    cursor: 'pointer',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100,
  },
  countText: {},
  countTextSelected: {
    color: theme.primary,
  },
}));

export default useStyles;
