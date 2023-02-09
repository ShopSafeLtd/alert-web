import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    padding: 20,
  },
  offenderCard: {
    cursor: 'pointer',
  },
  offenderImage: {
    height: 104,
    width: 100,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  offenderContent: {
    padding: '10px 15px',
    width: 240,
  },
  offenderName: {
    fontWeight: 500,
    fontSize: 14,
  },
  offenderDetail: {
    fontSize: 13,
  },
  addCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  offenderCol: {
    margin: 0,
    width: 300,
  },
  colContent: {
    padding: '15px 20px',
  },
  imageContainer: {
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    height: 250,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 250,
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  title: {
    padding: '10px 20px 10px',
    marginBottom: '0px !important',
  },
  field: {
    padding: '10px 20px',
  },
  headerRow: {
    paddingBottom: 20,
  },
  deleteButton: {
    margin: 5,
  },
});

export default useStyles;
