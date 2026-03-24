import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyled = createUseStyles((theme: Theme) => ({
  actionRow: {
    display: 'flex',
    gap: 8,
    justifyContent: 'flex-end',
    marginTop: 12,
  },

  card: {
    backgroundColor: theme.componentBackground,
    border: `1px solid ${theme.borderColor}`,
    borderRadius: 16,
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

  detailIcon: {
    color: theme.secondaryText,
    flexShrink: 0,
    fontSize: 13,
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
    marginBottom: 8,
    overflow: 'hidden',
    width: '100%',
  },

  reference: {
    color: theme.secondaryText,
    fontSize: 12,
    fontWeight: 400,
  },

  sectionCount: {
    backgroundColor: `${theme.primary}1a`,
    borderRadius: 10,
    color: theme.primary,
    fontSize: 11,
    fontWeight: 600,
    padding: '1px 6px',
  },

  sectionHeading: {
    alignItems: 'center',
    color: theme.secondaryText,
    display: 'flex',
    fontSize: 13,
    fontWeight: 600,
    gap: 8,
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },

  sharedSection: {
    borderLeft: `3px solid ${theme.borderColor}`,
    marginTop: 12,
    paddingLeft: 16,
  },
}));

export default useStyled;
