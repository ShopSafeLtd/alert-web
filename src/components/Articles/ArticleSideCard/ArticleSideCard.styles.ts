import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  cardRow: {
    height: '100%',
    minHeight: 120,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 120,
    padding: '10px 15px',
  },
  description: {
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    color: theme.secondaryText,
    display: '-webkit-box',
    fontSize: 13,
    height: '2.8em',
    lineHeight: '1.4em',
    marginBottom: 8,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  detail: {
    color: theme.secondaryText,
    display: 'block',
    fontSize: 11,
    lineHeight: 1.3,
    marginBottom: 2,
  },
  icon: {
    fontSize: 10,
    marginRight: 4,
  },
  image: {
    '& img': {
      height: '100%',
      objectFit: 'cover',
      width: '100%',
    },
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '10px 0 0 10px',
    height: '100%',
    minHeight: 120,
    overflow: 'hidden',
    width: 80,
  },
  imageSkeleton: {
    '&.ant-skeleton-element .ant-skeleton-image': {
      '& .ant-skeleton-image-svg': {
        width: 40,
      },
      height: '100%',
      minHeight: 120,
      width: 80,
    },
    borderRadius: '10px 0 0 10px',
    height: '100% !important',
    minHeight: '120px !important',
    width: '80px !important',
  },
  meta: {
    marginTop: 'auto',
  },
  priorityIcon: {
    color: theme.primary,
    marginRight: 5,
  },
  title: {
    display: 'block',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.3,
    marginBottom: 6,
  },
}));

export default useStyles;
