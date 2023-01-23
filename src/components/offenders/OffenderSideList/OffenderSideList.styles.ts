import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  offenderSideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflowY: 'scroll',
    maxHeight: 'calc(100vh - 70px)',
    width: 320,
    borderRight: '1px solid rgb(237, 242, 249)',
    '&.current': {
      backgroundColor: '#fafafa',
    },
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
  },
  offenderItem: {
    width: '100%',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fafafa',
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
    fontSize: 16,
  },
});

export default useStyles;
