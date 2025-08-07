import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@global': {
    '.incident-detail-card-clickable': {
      '&:hover': {
        borderColor: 'var(--ant-color-primary) !important',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.12) !important',
      },
      cursor: 'pointer',
    },
  },
});

export default useStyles;
