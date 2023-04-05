import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  loadingPage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '@media print': {
    page: `overflowY: unset !important; height: unset !important;`,
    actionBar: `display: none !important;`,
    dateRow: `clear: both; page-break-after: always;`,
  },
  page: {
    width: '100%',
    height: '100vh',
    padding: 20,
    overflowY: 'auto',
  },
  imageCol: {
    marginRight: 20,
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    width: '100%',
    height: 270,
    display: 'flex',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  dateRow: {},
  image: {
    height: 270,
    width: '100%',
  },
  imageSkeleton: {
    height: '270px !important',
    width: '100% !important',
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
  buttonIcon: {
    marginRight: 10,
  },
  prefixIcon: {
    marginRight: 10,
  },
});

export default useStyles;
