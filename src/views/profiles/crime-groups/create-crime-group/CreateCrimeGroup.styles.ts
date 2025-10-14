import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  addCol: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  colContent: {
    padding: '15px 20px',
  },
  deleteButton: {
    margin: 5,
  },
  field: {
    padding: '10px 20px',
  },
  headerRow: {
    paddingBottom: 20,
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 250,
    width: '100%',
  },
  imageContainer: {
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    height: 250,
    justifyContent: 'center',
    overflow: 'hidden',
    width: '100%',
  },
  offenderCard: {
    cursor: 'pointer',
  },
  offenderCol: {
    margin: 0,
    width: 300,
  },
  offenderContent: {
    padding: '10px 15px',
    width: 240,
  },
  offenderDetail: {
    fontSize: 13,
  },
  offenderImage: {
    backgroundColor: 'rgba(190, 190, 190, 0.2)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    height: 104,
    width: 100,
  },
  offenderName: {
    fontSize: 14,
    fontWeight: 500,
  },
  page: {
    padding: 20,
  },
  title: {
    marginBottom: '0px !important',
    padding: '10px 20px 10px',
  },
});

export default useStyles;
