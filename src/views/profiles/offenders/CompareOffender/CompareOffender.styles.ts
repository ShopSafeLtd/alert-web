import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme: Theme) => ({
  addContainer: {
    alignItems: 'center',
    display: 'flex',
    padding: 20,
  },
  card: {
    width: 300,
  },
  cardTitle: {
    margin: '0px !important',
  },
  field: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    height: 56,
    padding: '15px 20px',
  },
  firstCard: {
    marginTop: 41,
    minWidth: 141,
  },
  gridCard: {
    '& > .react-resizable-handle': {
      background: 'transparent',
    },
    '& > .react-resizable-handle::after': {
      borderBottom: `3px solid ${theme.borderColor}`,
      borderRight: `3px solid ${theme.borderColor}`,
      bottom: 5,
      height: 10,
      right: 5,
      width: 10,
    },
    cursor: 'pointer',
  },
  gridCheck: {
    marginLeft: 10,
  },
  gridImage: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  gridName: {
    padding: '10px 20px',
  },
  headerRow: {
    height: 36,
    marginBottom: 5,
  },
  image: {
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: 250,
    width: 298,
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
  imagePlaceholder: {
    height: 250,
  },
  page: {
    padding: 20,
  },
  text: {
    flex: 1,
  },
  titleField: {
    alignItems: 'center',
    display: 'flex',
    height: 56,
    padding: '15px',
    textAlign: 'right',
    width: '100%',
  },
}));

export default useStyles;
