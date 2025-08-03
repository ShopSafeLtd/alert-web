import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  // Linked item cards
  linkedItemCard: {
    '&.ant-card': {
      '& .ant-card-body': {
        backgroundColor: theme.componentBackground,
      },
      '& .ant-card-head': {
        backgroundColor: theme.cardSubsectionBackground,
        borderBottom: `1px solid ${theme.borderColor}`,
      },
      '&:hover': {
        borderColor: 'var(--ant-color-primary-border-hover)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)',
      },
      backgroundColor: theme.componentBackground,
      border: `1px solid ${theme.borderColor}`,
      transition: 'all 0.3s',
    },
  },

  // Main card styling
  linkedProfilesCard: {
    '&.ant-card': {
      '& .ant-card-body': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.02)',
      },
      '& .ant-card-head': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.02)',
        borderBottom: 'none !important',
        borderRadius: '8px 8px 0 0',
      },
      '&.todo-linked-profiles': {
        '&::before': {
          backgroundColor: 'var(--ant-color-purple)',
          borderRadius: '0 0 8px 8px',
          bottom: 0,
          content: '""',
          height: '3px',
          left: 0,
          position: 'absolute',
          right: 0,
        },
        border: `1px solid ${theme.borderColor}`,
      },
      backgroundColor:
        theme.colorScheme === 'dark'
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.02)',
      border: `1px solid ${theme.borderColor}`,
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative',
    },
  },
}));

export default useStyles;
