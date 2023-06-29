import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  image: {
    height: 100,
    width: 70,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    opacity: 0.8,
  },
  imageSkeleton: {
    height: '100px !important',
    width: '70px !important',
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
  reference: {
    fontSize: 12,
  },
  detail: {
    fontSize: 10,
    marginBottom: '2px !important',
  },
});

export default useStyles;
