import { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  '@media print': {
    offenderSideList: `display: none !important;`,
  },
  offenderSideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
    maxHeight: '100vh',
    width: 290,
    borderRight: `1px solid ${theme.borderColor}`,
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
  },
  offenderItem: {
    width: '100%',
    backgroundColor: theme.componentBackground,
    '&:hover': {
      backgroundColor: theme.itemSelectedBackground,
    },
    '&.current': {
      backgroundColor: theme.itemSelectedBackground,
    },
  },
  image: {
    height: 80,
    width: 80,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.8,
  },
  imageSkeleton: {
    height: 80,
    width: 80,
    '&.ant-skeleton-element .ant-skeleton-image': {
      height: 80,
      width: 80,
      '& .ant-skeleton-image-svg': {
        width: 35,
      },
    },
  },
  content: {
    padding: 10,
  },
  divider: {
    margin: 0,
  },
  name: {
    fontSize: 14,
  },
  lastOffence: {
    fontSize: 10,
  },
}));

export default useStyles;
