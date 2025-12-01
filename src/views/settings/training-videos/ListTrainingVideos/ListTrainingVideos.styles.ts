import type { Theme } from '#/configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    '& .ant-card-body': {
      padding: 0,
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    '&:hover': {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      borderColor: theme.primary,
      boxShadow:
        '0 12px 28px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-6px)',
    },
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
    cursor: 'pointer',
    height: '100%',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  cardActions: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    '& button': {
      flex: '1 1 auto',
      minWidth: '80px',
    },
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  cardContent: {
    padding: '20px',
  },
  cardDescription: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    color: theme.secondaryText,
    display: '-webkit-box',
    fontSize: '14px',
    margin: '0 0 12px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardMeta: {
    borderBottom: `1px solid ${theme.borderColor}`,
    color: theme.secondaryText,
    display: 'flex',
    fontSize: '12px',
    justifyContent: 'space-between',
    marginBottom: '12px',
    paddingBottom: '12px',
  },
  cardTitle: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    fontSize: '16px',
    fontWeight: 600,
    margin: '0 0 8px 0',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  container: {
    padding: '24px',
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px',
  },
  emptyState: {
    color: theme.secondaryText,
    padding: '60px 20px',
    textAlign: 'center',
  },
  grid: {
    marginTop: '16px',
  },
  header: {
    marginBottom: '24px',
  },
  placeholderIcon: {
    color: theme.secondaryText,
    fontSize: '48px',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  thumbnail: {
    height: '100%',
    left: 0,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  thumbnailContainer: {
    backgroundColor: theme.imageBackgroundColor,
    overflow: 'hidden',
    paddingTop: '56.25%', // 16:9 aspect ratio
    position: 'relative',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 600,
    margin: 0,
  },
  uploadButton: {
    marginBottom: '16px',
  },
}));

export default useStyles;
