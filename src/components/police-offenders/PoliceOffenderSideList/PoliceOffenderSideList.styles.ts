import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  content: {
    padding: 10,
  },
  image: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 100,
    opacity: 0.8,
    width: 70,
  },
  imageSkeleton: {
    '&.ant-skeleton-element .ant-skeleton-image': {
      '& .ant-skeleton-image-svg': {
        width: 35,
      },
      height: 80,
      width: 80,
    },
    height: '100px !important',
    width: '70px !important',
  },
  name: {
    fontSize: 14,
  },
  sideList: {
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    maxWidth: 250,
    padding: 0,
    width: 250,
  },
});

export default useStyles;
