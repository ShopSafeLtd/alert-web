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

  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },

  descIcon: {
    marginRight: 10,
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

  explainText: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: '5px !important',
  },

  image: {
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
    backgroundColor: theme.imageBackgroundColor,
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    width: 150,
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

  images: {
    margin: '10px 0 20px',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },

  infoSection: {
    flex: 1,
    marginTop: 10,
    overflow: 'hidden',
  },

  offenderImage: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    flexShrink: 0,
    height: 220,
    width: 160,
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

  offendersSection: {
    marginBottom: 30,
    marginTop: 16,
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
}));

export default useStyled;
