import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles(() => ({
  card: {
    '&:hover': {
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      transform: 'translateY(-2px)',
    },
    borderRadius: 12,
    height: '100%',
    transition: 'all 0.3s ease',
  },
  cardBody: {
    padding: '24px',
  },
  content: {
    width: '100%',
  },
  description: {
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'center',
    borderRadius: 12,
    display: 'flex',
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  title: {
    marginBottom: 8,
  },
}));

export default useStyles;
