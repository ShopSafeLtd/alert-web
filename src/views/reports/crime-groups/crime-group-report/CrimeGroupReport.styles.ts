import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '@media print': {
    actionBar: 'display: none !important;',
    dateRow: 'clear: both; page-break-after: always;',
    page: 'overflowY: unset !important; height: unset !important;',
  },
  actionBar: {
    marginBottom: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  dateRow: {},
  descItem: {
    paddingBottom: '5px !important',
  },
  descriptions: {
    maxWidth: 400,
  },
  detailsBody: {
    padding: 15,
  },
  image: {
    height: 270,
    width: '100%',
  },
  imageCol: {
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    display: 'flex',
    height: 270,
    justifyContent: 'center',
    marginRight: 20,
    width: '100%',
  },
  imageSkeleton: {
    height: '270px !important',
    width: '100% !important',
  },
  incidentSummary: {
    marginTop: 30,
  },
  loadingPage: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
  page: {
    height: '100vh',
    overflowY: 'auto',
    padding: 20,
    width: '100%',
  },
  prefixIcon: {
    marginRight: 10,
  },
  title: {
    marginBottom: '0px !important',
  },
});

export default useStyles;
