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
  itemContent: {
    padding: '10px 12px 5px',
  },
  sideList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    maxHeight: '100vh',
    width: 250,
    maxWidth: 250,

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
  infiniteScroll: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default useStyles;
