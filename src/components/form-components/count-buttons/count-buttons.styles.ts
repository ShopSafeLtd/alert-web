import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  countCard: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px 12px',
    userSelect: 'none',
  },
  countCardButtonLeft: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    cursor: 'pointer',
    padding: '6px 8px 6px 8px',
    userSelect: 'none',
  },
  countCardButtonRight: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    cursor: 'pointer',
    padding: '6px 8px 6px 8px',
    userSelect: 'none',
  },
  countCardContainer: {
    alignItems: 'center',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 100,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
  },
  countCardContent: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '0px 5px',
  },
  countCardSelected: {
    '&:hover': {
      backgroundColor: theme.hoverBackground,
    },
    alignItems: 'center',
    border: `1px solid ${theme.primary}`,
    borderRadius: 100,
    color: theme.primary,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    padding: '6px 12px',
    userSelect: 'none',
  },
  countText: {},
  countTextSelected: {
    color: theme.primary,
  },
}));

export default useStyles;
