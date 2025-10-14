import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  actionCell: {
    textAlign: 'center',
    width: 130,
  },
  imageCell: {
    padding: '0px !important',
    width: 100,
  },
  imageSkeleton: {
    height: 96,
    width: 96,
  },
  searchImage: {
    height: 96,
    width: 96,
  },
  searchImageContainer: {
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    display: 'flex',
    height: 96,
    justifyContent: 'center',
    width: 96,
  },
  searchPage: {
    height: '100vh',
    overflow: 'auto',
    padding: 20,
  },
  toolbar: {
    marginBottom: 10,
  },
});

export default useStyles;
