import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  content: {
    padding: 10,
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
  infiniteScroll: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
  },
  itemContent: {
    padding: '10px 12px 5px',
  },
  sideList: {
    // maxWidth: 250,
    '& .ant-pagination': {
      margin: '15px 0',
      textAlign: 'center',
    },
    height: '100vh',
    maxHeight: '100vh',
    padding: 0,
    width: '100%',
  },
});

export default useStyles;
