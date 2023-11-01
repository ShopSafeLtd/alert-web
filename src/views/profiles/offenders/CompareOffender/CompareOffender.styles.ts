import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
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
    width: 298,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    padding: '15px',
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
  gridImage: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  gridCheck: {
    marginLeft: 10,
  },
  gridName: {
    padding: '10px 20px',
  },
  gridCard: {
    cursor: 'pointer',
    '& > .react-resizable-handle::after': {
      borderRight: `3px solid ${theme.borderColor}`,
      borderBottom: `3px solid ${theme.borderColor}`,
      width: 10,
      height: 10,
      right: 5,
      bottom: 5,
    },
    '& > .react-resizable-handle': {
      background: 'transparent',
    },
  },
}));

export default useStyles;
