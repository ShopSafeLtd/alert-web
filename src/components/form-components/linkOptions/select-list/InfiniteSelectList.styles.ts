import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  itemContent: {
    padding: '10px 12px 5px',
  },
  sideList: {
    height: '100vh',
    maxHeight: '100vh',
    width: '100%',
    // maxWidth: 250,
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    padding: 0,
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
  infiniteScroll: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default useStyles;
