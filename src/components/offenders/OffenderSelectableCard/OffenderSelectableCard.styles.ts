import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  card: {
    '&:hover': {
      borderColor: theme.primary,
      boxShadow:
        theme.colorScheme === 'dark'
          ? '0 8px 24px rgba(0, 0, 0, 0.4)'
          : '0 8px 24px rgba(0, 0, 0, 0.12)',
      transform: 'translateY(-2px)',
    },
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 16,
    cursor: 'pointer',
    display: 'flex',
    height: 220,
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    transition: 'all 0.2s ease',

    width: '100%',
  },

  cardContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 220,
    overflow: 'hidden',
    padding: '16px 20px',
  },

  cardHeader: {
    marginBottom: 8,
  },

  cardSelected: {
    borderColor: theme.primary,
    borderWidth: 2,
    boxShadow:
      theme.colorScheme === 'dark'
        ? `0 0 0 3px ${theme.primary}33`
        : `0 0 0 3px ${theme.primary}22`,
  },

  checkmark: {
    backgroundColor: theme.componentBackground,
    borderRadius: '50%',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    color: theme.primary,
    fontSize: 24,
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 10,
  },

  detailIcon: {
    color: theme.secondaryText,
    flexShrink: 0,
    fontSize: 13,
  },

  detailLabel: {
    color: theme.secondaryText,
    fontSize: 13,
    marginRight: 8,
  },

  detailRow: {
    '& svg': {
      color: theme.secondaryText,
      opacity: 0.7,
      width: 14,
    },
    alignItems: 'center',
    display: 'flex',
    gap: 8,
    marginBottom: 4,
  },

  detailText: {
    color: theme.headerColor,
    flex: 1,
    fontSize: 13,
    lineHeight: 1.4,
    opacity: 0.85,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },

  image: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    flexShrink: 0,
    height: 220,
    width: 160,
  },

  imageSkeleton: {
    '&.ant-skeleton-element .ant-skeleton-image': {
      '& .ant-skeleton-image-svg': {
        width: 50,
      },
      height: 220,
      width: 160,
    },
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    height: '220px !important',
    width: '160px !important',
  },

  infoSection: {
    flex: 1,
    marginTop: 10,
    overflow: 'hidden',
  },

  offenderName: {
    alignItems: 'baseline',
    color: theme.headerColor,
    display: 'flex',
    fontSize: 16,
    fontWeight: 600,
    gap: 8,
    lineHeight: 1.2,
    marginBottom: 0,
    overflow: 'hidden',
    width: '100%',
  },

  reference: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 400,
  },

  statItem: {
    flex: 1,
    textAlign: 'center',
  },

  statLabel: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 10,
    letterSpacing: '0.5px',
    marginBottom: 4,
    textTransform: 'uppercase',
  },

  statValue: {
    color: theme.headerColor,
    display: 'block',
    fontSize: 16,
    fontWeight: 600,
  },

  statsRow: {
    borderTop: `1px solid ${theme.borderColor}`,
    display: 'flex',
    gap: 20,
    marginTop: 'auto',
    paddingTop: 12,
  },
}));

export default useStyles;
