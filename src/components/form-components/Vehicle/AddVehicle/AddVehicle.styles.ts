import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  searchPage: {
    padding: 20,
  },
  toolbar: {
    marginBottom: 10,
  },
  searchImage: {
    height: 96,
  },
  searchImageContainer: {
    height: 96,
    width: 96,
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    display: 'flex',
    justifyContent: 'center',
  },
  imageSkeleton: {
    width: 96,
    height: 96,
  },
  imageCell: {
    padding: '0px !important',
    width: 100,
  },
  actionCell: {
    width: 130,
    textAlign: 'center',
  },
});

export default useStyles;
