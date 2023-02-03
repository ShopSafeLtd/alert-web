import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  loadingPage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  page: {
    width: '100%',
    height: 'calc(100vh - 70px)',
    padding: 20,
    overflowY: 'auto',
  },
  imageCol: {
    marginRight: 20,
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    width: '100%',
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    height: 250,
  },
  imageSkeleton: {
    height: 250,
    width: 250,
  },
  descItem: {
    paddingBottom: '5px !important',
  },
  descriptions: {
    maxWidth: 400,
  },
  incidentSummary: {
    marginTop: 30,
  },
  title: {
    marginBottom: '0px !important',
  },
  detailsBody: {
    padding: 15,
  },
  actionBar: {
    marginBottom: 10,
  },
});

export default useStyles;
