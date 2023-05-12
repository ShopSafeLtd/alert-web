import type { Theme } from 'configs/ThemeConfig';
import { createUseStyles } from 'react-jss';

const useStyled = createUseStyles((theme: Theme) => ({
  images: {
    width: '100%',
    padding: '0px 10px',
    margin: '10px 0 20px',
    transition: 'all 0.3s ease-in-out',
    overflowY: 'hidden',
    overflowX: 'auto',
  },
  image: {
    height: 160,
    width: 150,
    backgroundColor: theme.imageBackgroundColor,
    cursor: 'pointer',
    borderRadius: 10,
    border: `2px solid ${theme.borderColor}`,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
  },
  explainText: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: '5px !important',
  },
  tableContainer: {
    marginBottom: 30,
  },
  descIcon: {
    marginRight: 10,
  },
}));

export default useStyled;
