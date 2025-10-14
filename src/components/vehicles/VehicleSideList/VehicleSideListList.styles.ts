import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  content: {
    padding: 10,
  },
  detail: {
    fontSize: 10,
    marginBottom: '2px !important',
  },
  divider: {
    margin: 0,
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
  reference: {
    fontSize: 12,
  },
});

export default useStyles;
