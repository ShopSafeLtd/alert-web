import type { Theme } from 'configs/ThemeConfig';

import { createUseStyles } from 'react-jss';

const useStyled = createUseStyles((theme: Theme) => ({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  descIcon: {
    marginRight: 10,
  },
  explainText: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: '5px !important',
  },
  image: {
    '@media only screen and (min-height: 800px)': {
      height: 230,
      width: 170,
    },
    backgroundColor: theme.imageBackgroundColor,
    border: `2px solid ${theme.borderColor}`,
    borderRadius: 10,
    cursor: 'pointer',
    height: 160,
    overflow: 'hidden',
    transition: 'all 0.3s ease-in-out',
    width: 150,
  },
  images: {
    margin: '10px 0 20px',
    overflowX: 'auto',
    overflowY: 'hidden',
    padding: '0px 10px',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
  },
  tableContainer: {
    marginBottom: 30,
  },
}));

export default useStyled;
