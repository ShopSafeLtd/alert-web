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
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '20px',
  },
  cardDescription: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    color: theme.secondaryText,
    display: '-webkit-box',
    fontSize: '14px',
    lineHeight: '1.5',
    margin: 0,
    minHeight: '42px', // Ensures consistent height for 2 lines
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  cardMeta: {
    alignItems: 'center',
    borderTop: `1px solid ${theme.borderColor}`,
    color: theme.secondaryText,
    display: 'flex',
    fontSize: '12px',
    justifyContent: 'space-between',
    paddingTop: '4px',
  },
  cardTitle: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    display: '-webkit-box',
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '1.4',
    margin: 0,
    minHeight: '44px', // Ensures consistent height for 2 lines
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  completedBadge: {
    backgroundColor: 'rgba(82, 196, 26, 0.9)',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 600,
    padding: '4px 8px',
    position: 'absolute',
    right: '8px',
    top: '8px',
  },
  container: {
    padding: '24px',
  },
  divider: {
    borderTop: `1px solid ${theme.borderColor}`,
    margin: '24px 0',
  },
  filterBar: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '8px',
    marginBottom: '24px',
    padding: '16px',
  },
  filterRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
  },
  filterSelect: {
    minWidth: '180px',
  },
  grid: {
    marginTop: '16px',
  },
  loadingContainer: {
    padding: '60px 0',
    textAlign: 'center',
  },
  placeholderIcon: {
    color: theme.secondaryText,
    fontSize: '48px',
    left: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  searchInput: {
    flex: '1 1 300px',
    minWidth: '200px',
  },
  sectionDescription: {
    color: theme.secondaryText,
    fontSize: '14px',
    margin: 0,
  },
  sectionHeader: {
    '&:first-child': {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      marginTop: 0,
    },
    marginBottom: '24px',
    marginTop: '32px',
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: 600,
    margin: '0 0 8px 0',
  },
  sortSelect: {
    minWidth: '150px',
  },
  tagRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: 'auto', // Push tags to bottom
  },
  thumbnail: {
    height: '100%',
    left: 0,
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    transition: 'transform 0.3s ease',
    width: '100%',
  },
  thumbnailContainer: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    '&::after': {
      background: 'rgba(0, 0, 0, 0)',
      bottom: 0,
      content: '""',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      transition: 'background 0.3s ease',
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    '&:hover::after': {
      background: 'rgba(0, 0, 0, 0.05)',
    },
    backgroundColor: theme.imageBackgroundColor,
    overflow: 'hidden',
    paddingTop: '56.25%', // 16:9 aspect ratio
    position: 'relative',
    width: '100%',
  },
}));

export default useStyles;
