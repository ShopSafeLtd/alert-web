import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  page: {
    padding: 20,
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
  firstCard: {
    marginTop: 41,
    minWidth: 141,
  },
  imagePlaceholder: {
    height: 250,
  },
  field: {
    padding: '15px 20px',
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
  },
  titleField: {
    textAlign: 'right',
    width: '100%',
    padding: '15px 20px',
    height: 56,
    alignItems: 'center',
    display: 'flex',
  },
  text: {
    flex: 1,
  },
  card: {
    width: 300,
  },
  headerRow: {
    marginBottom: 5,
    height: 36,
  },
  cardTitle: {
    margin: '0px !important',
  },
  addContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: 20,
  },
});

export default useStyles;
